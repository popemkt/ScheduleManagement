import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

const ScheduleInput = ({ aa }) => {
  return (
    <View style={s.slide}>
      <Text style={s.text}>aaaaa</Text>
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
});

export default ScheduleInput;
