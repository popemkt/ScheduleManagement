import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { GoogleSignin } from 'react-native-google-signin';

function configureGoogleSignin(){
    GoogleSignin.configure({
        webClientId: '753498206014-9tg1h7ogubpmus38047i58kdufasitjc.apps.googleusercontent.com'
    })
}
configureGoogleSignin();
AppRegistry.registerComponent(appName, () => App);
