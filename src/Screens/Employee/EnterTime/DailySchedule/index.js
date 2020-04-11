import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { dateToWeekday, hourSlotToString } from '../../../../Common/utils';

import EmployeeContext from '../../../../Contexts/EmployeeContext';

const HourSlotPicker = React.memo(({ entry, entry: { IsSubmitted } }) => {
  const [selected, setSelected] = useState(Boolean(entry.Id));
  useEffect(() => {
    console.log('First time of: ' + JSON.stringify(entry));
  }, [selected]);
  console.log(JSON.stringify(entry));
  return (
    <View style={s.row}>
      <Text>{hourSlotToString(entry.HourSlot)}</Text>
      <TouchableOpacity
        style={{ ...s.chooser, backgroundColor: selected ? 'red' : 'white' }}
        onPress={() => {
          setSelected(!selected);
          if (!selected) {
            entry.IsSubmitted = true;
          } else {
            entry.IsSubmitted = false;
          }
        }}
      />
    </View>
  );
});

const DailySchedule = React.memo(({ date, entries }) => {
  return (
    <View style={s.slide}>
      <Text style={s.dayTitle}>{date && dateToWeekday(date)}</Text>
      {entries.map((entry, index) => (
        <React.Fragment key={index}>
          {index === 0 || index === 4 ? (
            <Text>{index === 0 ? 'Morning Shift' : 'Afternoon Shift'}</Text>
          ) : null}
          <HourSlotPicker entry={entry} />
        </React.Fragment>
      ))}
    </View>
  );
});

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

export default DailySchedule;
