 import Button from '../Button';
import React from 'react';

function DrawerButton({ navigation }) {
  return (
    <Button
      onPress={() => navigation.openDrawer()}
      title=''
      color='#00cc00'
      icon={{ name: 'hamburger', size: 18 }}
      buttonStyle={{ marginLeft: 10, height: 30 }}
    />
  );
}

export default DrawerButton;
