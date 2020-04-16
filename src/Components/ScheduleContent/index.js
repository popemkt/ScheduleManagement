import React, { memo, useContext, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from 'react-native-elements';
import { EmpScheduleViewContext } from '../../Contexts';
import Swiper from 'react-native-swiper';
import { theme } from '../../Constants/style';
import { useEffect } from 'react';
import { useState } from 'react';

function HourSlot({ title, onPress }) {
  return (
    <View style={s.hourSlot}>
      <Button
        title={title}
        onPress={() => onPress && onPress()}
        style={s.touchOpacity}
        containerStyle={s.hourSlotButton}
        buttonStyle={s.hourSlotButton}
        titleStyle={s.hourSlotTitle}
      />
    </View>
  );
}

const ScheduleContent = memo(({ selectedDate }) => {
  const { calendarSwiperRef, currentWeekDates, setSelectedDate } = useContext(
    EmpScheduleViewContext,
  );
  const [index, setIndex] = useState(0);

  console.log('SELECTED DATE ' + selectedDate);

  useEffect(() => {
    let currentIndex = currentWeekDates.indexOf(selectedDate);
    if (currentIndex !== index) {
      calendarSwiperRef.current.scrollBy(currentIndex - index);
    }
  }, [selectedDate]);

  return (
    <View style={s.scheduleContent}>
      <Swiper
        scrollEnabled={false}
        onMomentumScrollEnd={(e, state, context) => {
          setIndex(state.index);
          setSelectedDate(currentWeekDates[state.index]);
        }}
        loop={false}
        showsPagination={false}
        ref={calendarSwiperRef}
      >
        <View style={s.swiper}>
          <HourSlot title='8h' />
          <HourSlot title='9h' />
          <HourSlot title='10h' />
          <HourSlot title='11h' />
          <View style={s.separator} />
          <HourSlot title='13h' />
          <HourSlot title='14h' />
          <HourSlot title='15h' />
          <HourSlot title='16h' />
        </View>
        <View style={s.swiper}>
          <HourSlot title='8h' />
          <HourSlot title='9h' />
          <HourSlot title='10h' />
          <HourSlot title='11h' />
          <View style={s.separator} />
          <HourSlot title='13h' />
          <HourSlot title='14h' />
          <HourSlot title='15h' />
          <HourSlot title='16h' />
        </View>
        <View style={s.swiper}>
          <HourSlot
            title='8h'
            onPress={() => calendarSwiperRef.current.scrollBy(-1)}
          />
          <HourSlot title='9h' />
          <HourSlot title='10h' />
          <HourSlot title='11h' />
          <View style={s.separator} />
          <HourSlot title='13h' />
          <HourSlot title='14h' />
          <HourSlot title='15h' />
          <HourSlot title='16h' />
        </View>
        <View style={s.swiper}>
          <HourSlot
            title='8h'
            onPress={() => calendarSwiperRef.current.scrollBy(-1)}
          />
          <HourSlot title='9h' />
          <HourSlot title='10h' />
          <HourSlot title='11h' />
          <View style={s.separator} />
          <HourSlot title='13h' />
          <HourSlot title='14h' />
          <HourSlot title='15h' />
          <HourSlot title='16h' />
        </View>
        <View style={s.swiper}>
          <HourSlot
            title='8h'
            onPress={() => calendarSwiperRef.current.scrollBy(-1)}
          />
          <HourSlot title='9h' />
          <HourSlot title='10h' />
          <HourSlot title='11h' />
          <View style={s.separator} />
          <HourSlot title='13h' />
          <HourSlot title='14h' />
          <HourSlot title='15h' />
          <HourSlot title='16h' />
        </View>
        <View style={s.swiper}>
          <HourSlot
            title='8h'
            onPress={() => calendarSwiperRef.current.scrollBy(-1)}
          />
          <HourSlot title='9h' />
          <HourSlot title='10h' />
          <HourSlot title='11h' />
          <View style={s.separator} />
          <HourSlot title='13h' />
          <HourSlot title='14h' />
          <HourSlot title='15h' />
          <HourSlot title='16h' />
        </View>
        <View style={s.swiper}>
          <HourSlot
            title='8h'
            onPress={() => calendarSwiperRef.current.scrollBy(-1)}
          />
          <HourSlot title='9h' />
          <HourSlot title='10h' />
          <HourSlot title='11h' />
          <View style={s.separator} />
          <HourSlot title='13h' />
          <HourSlot title='14h' />
          <HourSlot title='15h' />
          <HourSlot title='16h' />
        </View>
      </Swiper>
    </View>
  );
});

const s = StyleSheet.create({
  scheduleContent: {
    flex: 1,
    borderTopColor: theme.colors.borderGreyBold,
    borderTopWidth: 2,
    borderLeftColor: theme.colors.borderGreyBold,
    borderLeftWidth: 2,
  },
  hourSlot: {
    flex: 2,
    height: 100,
    backgroundColor: 'white',
    borderBottomColor: theme.colors.borderGrey,
    borderBottomWidth: 1,
  },
  separator: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomColor: theme.colors.borderGrey,
    borderBottomWidth: 1,
  },
  hourSlotButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  hourSlotTitle: {
    fontSize: 20,
    color: theme.colors.grey,
  },
  swiper: {
    flex: 1,
  },
});

export default ScheduleContent;
