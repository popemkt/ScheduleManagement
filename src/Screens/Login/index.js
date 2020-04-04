import {
  Alert,
  Dimensions,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TextInput from '../../Components/TextInput';
import { login } from '../../Services/commonServices';

const BG_IMAGE = require('../../Assets/background.jpg');

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassord] = useState('');
  const [marginTop, setMarginTop] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onKeyboardShow = () => {
    setMarginTop(-100);
  };

  const onKeyboardHide = () => {
    setMarginTop(0);
  };

  const onSubmit = () => {
    setIsLoading(true);
    let validation = [];
    if (username === '') validation.push('Username');
    if (password === '') validation.push('Password');
    if (validation.length > 0) {
      Alert.alert(
        'Validation error',
        `${validation.join(', ')} must not be empty!`,
      );
      setIsLoading(false);
    } else {
      login(username, password)
        .then(response => {
          let data = response[0];
          console.log(JSON.stringify(data));

          setIsLoading(false);
          switch (data.RoleId) {
            case 1:
              navigation.navigate('Admin', { data });
              break;
            case 2:
              navigation.navigate('Employee', { data });
              console.log('emp');
              break;
            case 3:
              navigation.navigate('User', { data });
              break;
            default:
              Alert.alert('Error with server response');
              console.log(JSON.stringify(response));
              break;
          }
        })
        .catch(err => {
          Alert.alert('Login failed', err.Message);
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    const keyboardShow = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardShow,
    );
    const keyboardHide = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardHide,
    );

    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, []);

  return (
    <View
      style={{
        ...s.container,
        marginTop: marginTop,
        backgroundColor: 'pink',
      }}
    >
      <ImageBackground source={BG_IMAGE} style={s.bgImage}>
        <Icon name='snowflake' size={40} color='rgba(111, 202, 186, 1)' />
        <View style={s.row}>
          <Text
            style={{
              ...s.header,
              color: '#63c5da',
              backgroundColor: 'white',
              paddingHorizontal: 5,
              borderRadius: 4,
            }}
          >
            COLD
          </Text>
          <Text style={s.header}>Schedules</Text>
        </View>

        <View style={s.formContainer}>
          <TextInput
            placeholder='Enter username'
            label='USERNAME'
            autoCapitalize='none'
            value={username}
            icon={{ name: 'user', size: 30 }}
            onChangeText={text => setUsername(text)}
            inputStyle={{ fontSize: 22, paddingLeft: 10 }}
            labelStyle={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}
            color='white'
          />
          <TextInput
            placeholder='Enter password'
            secureTextEntry
            icon={{ name: 'lock', size: 30 }}
            label='PASSWORD'
            textContentType='password'
            value={password}
            inputStyle={{ fontSize: 22, paddingLeft: 10 }}
            onChangeText={text => setPassord(text)}
            labelStyle={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}
          />
          <Button
            title='Log in'
            loading={false}
            icon={{
              name: 'home',
              type: 'font-awesome',
              size: 23,
              color: 'white',
            }}
            loadingProps={{ size: 'small', color: 'white' }}
            buttonStyle={{
              backgroundColor: 'rgba(111, 202, 186, 1)',
              borderRadius: 5,
            }}
            titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
            containerStyle={{ marginVertical: 20, width: 230 }}
            onPress={onSubmit}
            loading={isLoading}
            disabled={isLoading}
            loadingStyle={{ height: 30 }}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  header: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
    fontSize: 40,
  },
  formContainer: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 60,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT + 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
