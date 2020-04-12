import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { dateToWeekday, hourSlotToString } from '../../../../Common/utils';

import { EmpScheduleRegistrationContext } from '../../../../Contexts';

const checkEqual = (prev, next) => prev.selected === next.selected;

const HourSlotPicker = React.memo(({ entry, selected, id }) => {
  const { schedule, setSchedule, scheduleHelper } = useContext(
    EmpScheduleRegistrationContext,
  );
  
  console.log('Every rerender: ' + JSON.stringify(entry.Id));

  return (
    <View style={s.row}>
      <Text>{hourSlotToString(entry.HourSlot)}</Text>
      <TouchableOpacity
        style={{ ...s.chooser, backgroundColor: selected ? 'red' : 'white' }}
        onPress={() => {
          setSchedule(
            schedule.map((entry, index) => {
              if (id === index) {
                if (entry.Id) {
                  entry.Active = !selected;
                } else {
                  entry.IsSubmitted = !selected;
                }
              }
              return entry;
            }),
          );
        }}
      />
    </View>
  );
}, checkEqual);

const DailySchedule = React.memo(({ date, entries, id }) => {
  return (
    <View style={s.slide}>
      <Text style={s.dayTitle}>{date && dateToWeekday(date)}</Text>
      {entries.map((entry, index) => (
        <React.Fragment key={index}>
          {index === 0 || index === 4 ? (
            <Text>{index === 0 ? 'Morning Shift' : 'Afternoon Shift'}</Text>
          ) : null}
          <HourSlotPicker
            entry={entry}
            selected={entry.Id ? entry.Active : entry.IsSubmitted}
            id={id * 8 + index}
          />
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
