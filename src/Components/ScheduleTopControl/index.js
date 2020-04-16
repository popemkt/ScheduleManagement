import React, { useContext, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from 'react-native-elements';
import CalendarModal from '../../Components/CalendarModal';
import Carousel from 'react-native-snap-carousel';
import { EmpScheduleViewContext } from '../../Contexts';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../../Constants/style';
import { useEffect } from 'react';
import { useState } from 'react';

function CalendarStrip({ selectedDate }) {
  const { calendarStripRef, currentWeekDates, setSelectedDate } = useContext(
    EmpScheduleViewContext,
  );

  useEffect(() => {
    let currentIndex = currentWeekDates.indexOf(selectedDate);
    console.log(currentIndex);
    calendarStripRef.current.snapToItem(currentIndex);
  }, [selectedDate]);

  const _renderItem = ({ item, index }) => (
    <View style={s.calendarItem}>
      <Text>{_indexToDay(index)}</Text>
      <View
        style={{
          ...s.calendarBall,
          backgroundColor: index === 6 ? theme.colors.red : theme.colors.blue,
        }}
      >
        <Text style={{ color: 'white' }}>{item}</Text>
      </View>
    </View>
  );

  useEffect(() => {});

  return (
    <Carousel
      enableMomentum
      onSnapToItem={(index) => setSelectedDate(currentWeekDates[index])}
      ref={calendarStripRef}
      data={currentWeekDates.map((date) => date.substring(8, 10))}
      renderItem={_renderItem}
      sliderWidth={300}
      itemWidth={60}
    />
  );
}

export default function ScheduleTopControl({ navigation }) {
  const [calendarModal, setCalendarModal] = useState({ isVisible: false });
  const { selectedDate } = useContext(EmpScheduleViewContext);

  return (
    <View style={s.container}>
      <CalendarModal
        isVisible={calendarModal.isVisible}
        setModal={setCalendarModal}
      />
      <View style={s.buttonGroup}>
        <Button
          icon={<Icon name='calendar' size={15} color='white' />}
          onPress={() =>
            setCalendarModal({
              ...calendarModal,
              isVisible: !calendarModal.isVisible,
            })
          }
        />
      </View>
      <View style={s.calendarStripContainer}>
        <CalendarStrip selectedDate={selectedDate} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
  },
  buttonGroup: {
    width: 100,
    height: '100%',
    backgroundColor: theme.colors.white,
  },
  calendarStrip: {
    height: 100,
    width: '100%',
  },
  calendarStripContainer: {
    flex: 1,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: 50,
    overflow: 'hidden',
  },
  calendarBall: {
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.colors.white,
    backgroundColor: theme.colors.blue,
  },
  calendarItem: {
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.colors.white,
  },
});

const _indexToDay = (index) => {
  switch (index) {
    case 6:
      return 'S';
    case 0:
      return 'M';
    case 1:
      return 'T';
    case 2:
      return 'W';
    case 3:
      return 'T';
    case 4:
      return 'F';
    case 5:
      return 'S';
    default:
      return 'N';
  }
};
