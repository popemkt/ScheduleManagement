import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { Calendar } from 'react-native-calendars';
import { EmpScheduleViewContext } from '../../Contexts';
import { Overlay } from 'react-native-elements';
import { theme } from '../../Constants/style';

function CalendarModal({ isVisible = false, setModal }) {
  const { currentWeekDates, selectedDate, setSelectedDate } = useContext(
    EmpScheduleViewContext,
  );
  const currentDates = {};
  currentWeekDates.forEach((date, index) => {
    let style =
      date == selectedDate
        ? theme.schedule.dateSelected
        : theme.schedule.datemarker;
    console.log('DATE' + selectedDate + '-' + date);
    currentDates[date] = style;
  });

  console.log(JSON.stringify(currentDates));
  return (
    <Overlay
      width='auto'
      height='auto'
      visible={isVisible}
      overlayStyle={s.modal}
      onBackdropPress={() =>
        setModal((prevModal) => {
          return { ...prevModal, isVisible: false };
        })
      }
    >
      <View style={s.content}>
        <Calendar
          current={selectedDate}
          markingType={'period'}
          markedDates={currentDates}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
        />
      </View>
    </Overlay>
  );
}

const s = StyleSheet.create({
  modal: {
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  content: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  message: {
    fontSize: 20,
  },
});

export default CalendarModal;
