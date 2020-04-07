import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { dateToWeekday, hourSlotToString } from '../../../../Common/utils';

const Row = ({ setSchedule, date, hourSlot }) => {
  const [selected, setSelected] = useState(false);
  return (
    <View style={s.row}>
      <Text>{hourSlotToString(hourSlot)}</Text>
      <TouchableOpacity
        style={{ ...s.chooser, backgroundColor: selected ? 'red' : 'white' }}
        onPress={() => {
          // onPress || onPress();
          setSelected(!selected);
        }}
      />
    </View>
  );
};

const ScheduleInput = ({ date, setSchedule }) => {
  return (
    <View style={s.slide}>
      <Text style={s.dayTitle}>{date && dateToWeekday(date)}</Text>
      <Text>Morning Shift</Text>
      <Row hourSlot={8} />
      <Row hourSlot={9} />
      <Row hourSlot={10} />
      <Row hourSlot={11} />
      <Text>Afternoon Shift</Text>
      <Row hourSlot={13} />
      <Row hourSlot={14} />
      <Row hourSlot={15} />
      <Row hourSlot={16} />
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
