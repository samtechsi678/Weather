import {Alert, Linking, PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
export const GetCurrentLocation = async handleCurrentLocation => {
  try {
    // Request location permission
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'App Location Permission',
        message: 'This App needs access to your location',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        position => {
          handleCurrentLocation(position);
        },
        error => {
          if (error.code === 2) {
            Alert.alert(
              'GPS Disabled',
              'Turn on location services to get your current location.',
              [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Open Settings', onPress: () => Linking.openSettings()},
              ],
            );
          } else {
            Alert.alert('Location Error', error.message);
          }
        },
        {
          enableHighAccuracy: true, // High accuracy mode for better location data
          timeout: 15000, // Wait 15 seconds for a response
          maximumAge: 10000, // Accept location updates up to 10 seconds old
        },
      );
    } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
      console.warn('❌ Permission denied');
      Alert.alert(
        'Location Permission',
        'Permission is required to access location.',
      );
    } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      console.warn('⛔ Permission permanently denied');
      Alert.alert(
        'Permission Required',
        'You have permanently denied location permission. Enable it in settings.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Open Settings', onPress: () => Linking.openSettings()},
        ],
      );
    }
  } catch (err) {
    console.warn('⚠️ Error requesting location permission:', err);
  }
};
