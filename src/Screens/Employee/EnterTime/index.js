import { Alert, StyleSheet, Text, View } from 'react-native';
import {
  EmpScheduleRegistrationContext,
  EmployeeContext,
} from '../../../Contexts';
import React, { useContext, useEffect, useState } from 'react';
import { ScheduleHelper, getCurrentWeekDates } from '../../../Common/utils';
import {
  getEmpScheduleRegistration,
  updateEmpScheduleRegistration,
} from '../../../Services/empScheduleRegistrationService';

import Button from '../../../Components/Button';
import DailySchedule from './DailySchedule';
import LoadingModal from '../../../Components/LoadingModal';
import OptionModal from './Modals/OptionModal/OptionModal';
import Swiper from 'react-native-swiper';
import { useIsFocused } from '@react-navigation/native';

export default function EnterTimesheet({ navigation }) {
  const [currentWeekDates, setCurrentWeekDates] = useState(
    getCurrentWeekDates(),
  );
  const emp = useContext(EmployeeContext);
  const [scheduleHelper, setScheduleHelper] = useState(
    new ScheduleHelper(currentWeekDates),
  );
  const [schedule, setSchedule] = useState([]);
  const [optionModalVisibility, setOptionModalVisibility] = useState(false);
  const focused = useIsFocused();
  const [selectedDate, setSelectedDate] = useState(currentWeekDates[0]);
  const [isUpdate, setIsUpdate] = useState();
  const [loadingModal, setLoadingModal] = useState({
    isLoading: false,
    message: 'Loading',
  });

  console.log('Selected date' + selectedDate);

  const _onCreateOrEdit = () => {
    setLoadingModal({ isLoading: true, message: 'Submitting schedule...' });
    let oldData = scheduleHelper.data;
    let newScheduleEntries = schedule.filter(
      (entry) => entry.IsSubmitted === true,
    );
    console.log();
    updateEmpScheduleRegistration(oldData, newScheduleEntries)
      .then((res) => {
        setLoadingModal({ ...loadingModal, isLoading: false });
        console.log(JSON.stringify(res));
        Alert.alert('INFO', 'Update successful');
      })
      .catch((err) => {
        setLoadingModal({ ...loadingModal, isLoading: false });

        Alert.alert('ERROR', 'Error submitting data!');
      });
  };

  useEffect(() => {
    if (focused) {
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
    }
  }, [focused]);

  return (
    <EmpScheduleRegistrationContext.Provider
      value={{
        schedule,
        setSchedule,
        currentWeekDates,
        scheduleHelper,
        selectedDate,
      }}
    >
      <View style={s.container}>
        <OptionModal
          isVisible={optionModalVisibility}
          setIsVisile={setOptionModalVisibility}
        />
        <LoadingModal
          message={loadingModal.message}
          isVisible={loadingModal.isLoading}
        />
        <View style={s.row}>
          <Text style={s.minorHeader}>{'TimeSheet'}</Text>
          {/* <Button
            icon={{ name: 'recycle', size: 10 }}
            buttonStyle={{ marginLeft: 10, marginBottom: 10 }}
          /> */}
        </View>
        <View style={s.row}>
          <Button
            title='Options '
            icon={{ name: 'cog', size: 10 }}
            buttonStyle={{ marginLeft: 10 }}
            onPress={() => setOptionModalVisibility(true)}
            style={{ color: 'red' }}
          />
          <Text>{currentWeekDates[0] + ' to ' + currentWeekDates[6]}</Text>
          <Button
            title='Create '
            icon={{ name: 'plus', size: 10 }}
            onPress={_onCreateOrEdit}
          />
        </View>
        <View style={s.wrapper}>
          <Swiper
            showsButtons={true}
            showsPagination={false}
            loop={false}
            containerStyle={s.swiper}
            onIndexChanged={(index) => setSelectedDate(currentWeekDates[index])}
          >
            {currentWeekDates.map((date, index) => (
              <DailySchedule
                key={index}
                date={date}
                entries={schedule.slice(index * 8, (index + 1) * 8)}
                id={index}
              />
            ))}
          </Swiper>
        </View>
      </View>
    </EmpScheduleRegistrationContext.Provider>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    paddingTop: 10,
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
  wrapper: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  swiper: {
    borderRadius: 10,
  },
});
