import { Button, Overlay } from 'react-native-elements';
import { Picker, StyleSheet, Text, View } from 'react-native';

import DateTimePicker from '../../../../../Components/DatetimePicker';
import React from 'react';

function OptionModal({ isVisible, setIsVisile, schedule, setSchedule, currentDate }) {
  const onDoThisForWholeWeek = () => {
    
  }

  return (
    <Overlay
      width='auto'
      height='auto'
      isVisible={isVisible}
      overlayStyle={s.modal}
      onBackdropPress={() => setIsVisile(false)}
    >
      <View style={{ width: '100%' }}>
        <Text>Options</Text>
        <Button
          title='Do this for whole week'
          buttonStyle={{ width: '100%' }}
          onPress={() => {}}
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
    width: '80%',
    paddingVertical: 10,
  },
});

export default OptionModal;
