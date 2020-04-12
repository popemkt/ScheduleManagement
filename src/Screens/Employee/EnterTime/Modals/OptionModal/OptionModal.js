import { Button, Overlay } from 'react-native-elements';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { EmpScheduleRegistrationContext } from '../../../../../Contexts';

function OptionModal({ isVisible, setIsVisile }) {
  const { schedule, setSchedule, selectedDate } = useContext(
    EmpScheduleRegistrationContext,
  );

  const onDoThisForWholeWeek = () => {
    let selectedDateEntries = schedule.filter(entry => entry.Date === selectedDate);
    console.log('selected entries' + JSON.stringify(selectedDate));
    setSchedule(
      schedule.map((entry, index) => {
        let selectedDateEntry = selectedDateEntries[index % 8];
        let realSelectedDateStatus = selectedDateEntry.Id
          ? selectedDateEntry.Active
          : selectedDateEntry.IsSubmitted;
        entry.Id
          ? (entry.Active = realSelectedDateStatus)
          : (entry.IsSubmitted = realSelectedDateStatus);
        return entry;
      }),
    );
    setIsVisile(false);
  };

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
          onPress={() => onDoThisForWholeWeek()}
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
