import Button from '../Button';
import React from 'react';
import { logOut } from '../../Screens/Login';

function LogoutButton({ navigation }) {
  return (
    <Button
      onPress={() => {
        logOut();
        navigation.popToTop();
      }}
      icon={{ name: 'share-square', size: 18 }}
      buttonStyle={{ marginRight: 10, height: 30 }}
    />
  );
}

export default LogoutButton;
