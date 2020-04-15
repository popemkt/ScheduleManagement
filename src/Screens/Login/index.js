import { AccessToken, LoginButton, LoginManager } from 'react-native-fbsdk';
import {
  Alert,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import React, { useContext, useState } from 'react';
import { firebaseLogin, login } from '../../Services/commonServices';
import { getAuthHeadersConfig, setAuthToken } from '../../Common/config';

import AuthContext from '../../Contexts/AuthContext';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import roleConstant from './constant';
import screenConstant from '../constant';
import messaging from "@react-native-firebase/messaging";
const BG_IMAGE = require('../../Assets/background.jpg');

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export function logOut() {
  try {
    //google
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
    //facebook
    LoginManager.signOut();
  } catch (err) {
    console.log(JSON.stringify(err));
  }
}

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassord] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);

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
        .then((response) => {
          let data = response.data.Data;
          setAuthToken(data.Token);
          console.log('Headers: ' + JSON.stringify(getAuthHeadersConfig()));
          setIsLoading(false);
          switch (data.RoleId) {
            case 1:
              navigation.navigate('Employee', data);
              break;
            case 2:
              navigation.navigate('Employee', data);
              console.log('emp');
              break;
            case 3:
              navigation.navigate('Employee', data);
              break;
            default:
              navigation.navigate('Employee', data);
              break;
          }
        })
        .catch((err) => {
          Alert.alert('Login failed', err.Message);
          console.log(err);
          setIsLoading(false);
        });
    }
  };
  async function _loginGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      const { accessToken, idToken } = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      console.log('CREDENTIAL' + JSON.stringify(credential));
      const firebaseResult = await auth().signInWithCredential(credential);
      const firebaseToken = await firebaseResult.user.getIdToken(true);
      console.log(firebaseToken);
      _login(firebaseToken);
    } catch (error) {
      if (error.code == statusCodes.SIGN_IN_CANCELLED) {
        console.log('Sign in action cancelled');
      } else if (error.code == statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play service not available');
      } else {
        console.log(JSON.stringify(error));
      }
    }
  }

  async function _loginFacebook() {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        throw 'Facebook sign in action cancelled';
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw 'Something went wrong when obtaining access token';
      }
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      const firebaseResult = await auth().signInWithCredential(
        facebookCredential,
      );
      const firebaseToken = await firebaseResult.user.getIdToken(true);
      console.log('FIREBASE TOKEN: ' + firebaseToken);
      _login(firebaseToken);
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }

  function _login(token) {
    // authContext.setLoadingVisible(true);
    firebaseLogin(
      token,
      (response) => {
        const data = response.data.Data;
        subscribeFCMTopic('test');
        setAuthToken(data.Token);
        switch (data.RoleId) {
          case roleConstant.ROLE_NAME.Employee:
            navigation.navigate(screenConstant.SCREENS.employee, data);
            break;
          case roleConstant.ROLE_NAME.Manager:
            navigation.navigate(screenConstant.SCREENS.employee, data);
            break;
          case roleConstant.ROLE_NAME.Admin:
            navigation.navigate(screenConstant.SCREENS.employee, data);
            break;
          default:
            navigation.navigate(screenConstant.SCREENS.employee, data);
            break;
        }
      },
      (err) => {
        console.log("Something's wrong");
        console.log(JSON.stringify(err));
      },
    );
  }
  function subscribeFCMTopic(topic){
    messaging().subscribeToTopic(topic);
  }
  return (
    <KeyboardAvoidingView
      style={{
        ...s.container,
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
          {/* <TextInput
            placeholder='Enter username'
            label='USERNAME'
            autoCapitalize='none'
            value={username}
            icon={{ name: 'user', size: 30 }}
            onChangeText={(text) => setUsername(text)}
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
            onChangeText={(text) => setPassord(text)}
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
          /> */}
          <GoogleSigninButton
            style={{ width: 207, height: 56 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={_loginGoogle}
          />
          <Button
            icon={<Icon name='facebook' size={50} color='white' />}
            title=' Login with Facebook'
            buttonStyle={{ width: 200, height: 48 }}
            onPress={_loginFacebook}
          />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
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
