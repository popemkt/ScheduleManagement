import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { dateToWeekday, hourSlotToString } from '../../../../Common/utils';

import { EmpScheduleRegistrationContext } from '../../../../Contexts';
import EmployeeContext from '../../../../Contexts/EmployeeContext';

const HourSlotPicker = ({ date, hourSlot }) => {
  const [selected, setSelected] = useState(false);
  const { schedule, setSchedule } = useContext(EmpScheduleRegistrationContext);
  const emp = useContext(EmployeeContext);
  return (
    <View style={s.row}>
      <Text>{hourSlotToString(hourSlot)}</Text>
      <TouchableOpacity
        style={{ ...s.chooser, backgroundColor: selected ? 'red' : 'white' }}
        onPress={() => {
          setSelected(!selected);
          if (!selected) {
            setSchedule([
              ...schedule,
              {
                Date: date,
                HourSlot: hourSlot,
                EmpId: emp.EmpId,
                Active: true,
              },
            ]);
          } else {
            setSchedule(
              schedule.filter((item) => {
                console.log(JSON.stringify(item) + hourSlot + date);
                if (item.HourSlot !== hourSlot || item.Date !== date) return item;
              }),
            );
          }
        }}
      />
    </View>
  );
};

const ScheduleInput = ({ date }) => {
  return (
    <View style={s.slide}>
      <Text style={s.dayTitle}>{date && dateToWeekday(date)}</Text>
      <Text>Morning Shift</Text>
      <HourSlotPicker hourSlot={8} date={date} />
      <HourSlotPicker hourSlot={9} date={date} />
      <HourSlotPicker hourSlot={10} date={date} />
      <HourSlotPicker hourSlot={11} date={date} />
      <Text>Afternoon Shift</Text>
      <HourSlotPicker hourSlot={13} date={date} />
      <HourSlotPicker hourSlot={14} date={date} />
      <HourSlotPicker hourSlot={15} date={date} />
      <HourSlotPicker hourSlot={16} date={date} />
    </View>
  );
};

const s = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  chooser: { borderWidth: 1, width: 200, height: 50, backgroundColor: 'white' },
});

export default ScheduleInput;
