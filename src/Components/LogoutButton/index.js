import Button from '../Button';
import React from 'react';

function LogoutButton({ navigation }) {
  return (
    <Button
      onPress={() => navigation.popToTop()}
      icon={{ name: 'share-square', size: 18 }}
      buttonStyle={{ marginRight: 10, height: 30 }}
    />
  );
}

export default LogoutButton;
