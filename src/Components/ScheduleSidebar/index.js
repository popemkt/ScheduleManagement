import { StyleSheet, View } from 'react-native';

import { Button } from 'react-native-elements';
import React from 'react';
import { theme } from '../../Constants/style';

function SidebarHourSlot({ title, onPress }) {
  return (
    <View style={s.sidebarHourSlot}>
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

export default function ScheduleSidebar({ navigation }) {
  return (
    <View style={s.scheduleSidebar}>
      <SidebarHourSlot title='8h' />
      <SidebarHourSlot title='9h' />
      <SidebarHourSlot title='10h' />
      <SidebarHourSlot title='11h' />
      <View style={s.separator} />
      <SidebarHourSlot title='13h' />
      <SidebarHourSlot title='14h' />
      <SidebarHourSlot title='15h' />
      <SidebarHourSlot title='16h' />
    </View>
  );
}

const s = StyleSheet.create({
  scheduleSidebar: {
    width: 100,
    height: '100%',
    borderTopColor: theme.colors.white,
    borderTopWidth: 2,
  },
  sidebarHourSlot: {
    flex: 2,
    height: 100,
    backgroundColor: theme.colors.white,
    borderBottomColor: theme.colors.borderGrey,
    borderBottomWidth: 1,
  },
  separator: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderBottomColor: theme.colors.borderGrey,
    borderBottomWidth: 1,
  },
  hourSlotButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
  },
  hourSlotTitle: {
    fontSize: 20,
    color: theme.colors.grey,
  },
});
