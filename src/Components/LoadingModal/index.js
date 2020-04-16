import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Overlay } from 'react-native-elements';
import React from 'react';
import { theme } from '../../Constants/style';

function LoadingModal({ isVisible = false, message = 'Please wait...' }) {
  return (
    <Overlay
      width='auto'
      height='auto'
      visible={isVisible}
      overlayStyle={s.modal}
    >
      <View style={s.content}>
        <ActivityIndicator size={100} color={theme.colors.blue} />
        <Text style={s.message}>{message}</Text>
      </View>
    </Overlay>
  );
}

const s = StyleSheet.create({
  modal: {
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    width: '60%',
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

export default LoadingModal;
