import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Carousel from 'react-native-snap-carousel';
import { theme } from '../../Constants/style';
import { useEffect } from 'react';

function CalendarStrip({ seletedIndex }) {
  const mock = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  const carouselRef = useRef(null);
  const _renderItem = ({ item, index }) => (
    <View style={s.calendarItem}>
      <Text style={{ color: 'white' }}>{item.id}</Text>
    </View>
  );

  useEffect(() => {
    carouselRef.current.snapToItem();
  });

  return (
    <Carousel
      ref={carouselRef}
      data={mock}
      renderItem={_renderItem}
      sliderWidth={300}
      itemWidth={50}
    />
  );
}

export default function ScheduleTopControl({ navigation }) {
  return (
    <View style={s.container}>
      <View style={s.buttonGroup}></View>
      <View style={s.calendarStripContainer}>
        <CalendarStrip />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    backgroundColor: 'red',
    flexDirection: 'row',
  },
  buttonGroup: {
    width: 100,
    height: '100%',
    backgroundColor: 'white',
  },
  calendarStrip: {
    height: 100,
    width: '100%',
  },
  calendarStripContainer: {
    flex: 1,
    width: 100,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  calendarItem: {
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.colors.white,
    backgroundColor: theme.colors.blue,
  },
});
