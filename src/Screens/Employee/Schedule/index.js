import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ScheduleHelper,
  addDays,
  getCurrentWeekDates,
} from '../../../Common/utils';

import { EmpScheduleViewContext } from '../../../Contexts';
import LoadingModal from '../../../Components/LoadingModal';
import ScheduleContent from '../../../Components/ScheduleContent';
import ScheduleSidebar from '../../../Components/ScheduleSidebar';
import ScheduleTopControl from '../../../Components/ScheduleTopControl';
import { getEmpScheduleRegistration } from '../../../Services/empScheduleRegistrationService';
import { useIsFocused } from '@react-navigation/native';

export default function Schedule({ navigation }) {
  const calendarStripRef = useRef(null);
  const calendarSwiperRef = useRef(null);
  const [currentWeekDates, setCurrentWeekDates] = useState(
    getCurrentWeekDates(),
  );
  const [scheduleHelper, setScheduleHelper] = useState(
    new ScheduleHelper(currentWeekDates),
  );
  const [schedule, setSchedule] = useState([]);
  const [optionModalVisibility, setOptionModalVisibility] = useState(false);
  const focused = useIsFocused();
  const [selectedDate, setSelectedDate] = useState(currentWeekDates[0]);
  const [loadingModal, setLoadingModal] = useState({
    isLoading: false,
    message: 'Fetching server data...',
  });

  const _fetchData = () => {
    setLoadingModal({ isLoading: true, message: 'Fetching data...' });
    getEmpScheduleRegistration(
      1,
      currentWeekDates[0],
      currentWeekDates[currentWeekDates.length - 1],
    )
      .then((res) => {
        let resultEntries = res.data.Data.Details;
        console.log(JSON.stringify(resultEntries));
        let initSchedule = scheduleHelper.initEmpScheduleRegistration(
          res.data.Data,
        );
        scheduleHelper.preprocessFetchResult(resultEntries);
        setSchedule(initSchedule);
        setLoadingModal({ ...loadingModal, isLoading: false });
        console.log('reset schedule');
      })
      .catch((err) => {
        setLoadingModal({ ...loadingModal, isLoading: false });
        Alert.alert('Error', 'Error fetching server data!');
      });
  };

  useEffect(() => {
    if (focused) {
      _fetchData();
    }
  }, [focused]);

  return (
    <View style={s.container}>
      <LoadingModal
        isVisible={loadingModal.isLoading}
        message={loadingModal.message}
      />
      <EmpScheduleViewContext.Provider
        value={{
          calendarSwiperRef,
          calendarStripRef,
          currentWeekDates,
          setCurrentWeekDates,
          schedule,
          setSchedule,
          selectedDate,
          setSelectedDate,
          loadingModal,
          setLoadingModal,
        }}
      >
        <ScheduleTopControl selectedDate={selectedDate} />
        <View style={s.schedule}>
          <ScheduleSidebar />
          <ScheduleContent selectedDate={selectedDate} />
        </View>
      </EmpScheduleViewContext.Provider>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  header: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10,
    fontSize: 40,
    marginLeft: 10,
  },
  listItem: {
    width: '100%',
  },
  minorHeader: {
    fontSize: 20,
    marginLeft: 10,
  },
  row: {
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightTitleStyle: {
    fontWeight: 'bold',
  },
  schedule: {
    flex: 1,
    flexDirection: 'row',
  },
  scheduleSidebar: {
    width: 100,
    height: '100%',
    borderRightColor: 'grey',
    borderRightWidth: 2,
  },
  scheduleContent: {
    flex: 1,
    backgroundColor: 'white',
  },
  hourSlot: {
    flex: 2,
    height: 100,
    backgroundColor: 'white',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  separator: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  touchOpacity: {
    width: '100%',
    height: '100%',
  },
});
