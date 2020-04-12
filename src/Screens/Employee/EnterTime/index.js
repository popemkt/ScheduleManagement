import {
  EmpScheduleRegistrationContext,
  EmployeeContext,
} from '../../../Contexts';
import React, { useContext, useEffect, useState } from 'react';
import { ScheduleHelper, getCurrentWeekDates } from '../../../Common/utils';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../../../Components/Button';
import DailySchedule from './DailySchedule';
import OptionModal from './Modals/OptionModal/OptionModal';
import Swiper from 'react-native-swiper';
import { getEmpScheduleRegistration } from '../../../Services/empScheduleRegistrationService';
import { useIsFocused } from '@react-navigation/native';

export default function EnterTimesheet({ navigation }) {
  const [currentWeekDates, setCurrentWeekDates] = useState(
    getCurrentWeekDates(),
  );
  const [scheduleHelper, setScheduleHelper] = useState(
    new ScheduleHelper(currentWeekDates),
  );
  const employee = useContext(EmployeeContext);
  const [schedule, setSchedule] = useState([]);
  const [optionModalVisibility, setOptionModalVisibility] = useState(false);
  const focused = useIsFocused();
  const [rerender, setRerender] = useState(true);
  const [counter, setCounter] = useState(0);

  console.log('re-run EnterTimesheet');

  useEffect(() => {
    let initSchedule = scheduleHelper.initEmpScheduleRegistration();
    getEmpScheduleRegistration(employee.Id).then(res => {
      scheduleHelper.preprocessFetchResult(res);
      setSchedule(initSchedule);
      setCounter(counter + 1);
    })
    console.log(
      'index: ' +
        scheduleHelper.getArrayLocationFromDateAndHourSlot({
          HourSlot: 16,
          Date: '2020-04-12',
        }),
    );
  }, []);

  useEffect(() => {
    if (!focused) setSchedule([]);
    console.log(counter);
    if (focused && counter > 1) {
      getEmpScheduleRegistration(employee.Id)
        .then((res) => {
          let initSchedule = scheduleHelper.initEmpScheduleRegistration();
          scheduleHelper.preprocessFetchResult(res);
          setSchedule(initSchedule);
          console.log('reset schedule');
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setCounter(counter + 1);
  }, [focused]);

  return (
    <View style={s.container}>
      <OptionModal
        isVisible={optionModalVisibility}
        setIsVisile={setOptionModalVisibility}
      />
      <View style={s.row}>
        <Text style={s.minorHeader}>{'TimeSheet'}</Text>
        <Button
          icon={{ name: 'recycle', size: 10 }}
          buttonStyle={{ marginLeft: 10, marginBottom: 10 }}
          // onPress={() => {
          //   setSchedule([]);
          // }}
        />
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
          onPress={() => console.log(JSON.stringify(schedule.filter(entry => entry.IsSubmitted)))}
        />
      </View>
      <View style={s.wrapper}>
        <EmpScheduleRegistrationContext.Provider
          value={{
            schedule: schedule,
            setSchedule: setSchedule,
            currentWeekDates: currentWeekDates,
          }}
        >
          <Swiper
            showsButtons={true}
            showsPagination={false}
            loop={false}
            containerStyle={{ borderRadius: 10 }}
          >
            {currentWeekDates.map((date, index) => (
              <DailySchedule
                key={index}
                date={date}
                entries={schedule.slice(index * 8, (index + 1) * 8)}
              />
            ))}
          </Swiper>
        </EmpScheduleRegistrationContext.Provider>
      </View>
    </View>
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
});
