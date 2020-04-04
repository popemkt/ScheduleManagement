import Button from '../Button';
import React from 'react';

function LogoutButton({ navigation }) {
  return (
    <Button
      onPress={() => navigation.popToTop()}
      title='Logout '
      icon={{ name: 'arrow-right', size: 10 }}
      buttonStyle={{ marginRight: 10, height: 30 }}
    />
  );
}

export default LogoutButton;
