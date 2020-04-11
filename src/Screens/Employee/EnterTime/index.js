import {
  EmpScheduleRegistrationContext,
  EmployeeContext,
} from '../../../Contexts';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../../../Components/Button';
import OptionModal from './Modals/OptionModal/OptionModal';
import ScheduleInput from './ScheduleInput';
import Swiper from 'react-native-swiper';
import { getCurrentWeekDates } from '../../../Common/utils';
import { useIsFocused } from '@react-navigation/native';

export default function EnterTimesheet({ navigation }) {
  const employee = useContext(EmployeeContext);
  const currentWeekDates = getCurrentWeekDates();
  const [schedule, setSchedule] = useState([]);
  const [editedSchedule, setEditedSchedule] = useState([]);
  const [optionModalVisibility, setOptionModalVisibility] = useState(false);
  const focused = useIsFocused();

  useEffect(() => {
    // if (focused)
    //   getAllTasks(employee.Id)
    //     .then((res) => {
    //       setSchedule(res.data.Data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    console.log(schedule);
  }, [focused, schedule]);

  return (
    <View style={s.container}>
      <OptionModal
        isVisible={optionModalVisibility}
        setIsVisile={setOptionModalVisibility}
      />
      <View style={s.row}>
        <Text style={s.minorHeader}>{'Tasks'}</Text>
        <Button
          icon={{ name: 'recycle', size: 10 }}
          buttonStyle={{ marginLeft: 10, marginBottom: 10 }}
          onPress={() => {
            setSchedule([]);
          }}
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
          onPress={() => navigation.navigate('CreateTask')}
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
              <ScheduleInput key={index} date={date} />
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
