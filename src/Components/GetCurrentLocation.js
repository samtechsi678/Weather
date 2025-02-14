import {View, Text} from 'react-native';
import React from 'react';
import Geolocation from '@react-native-community/geolocation';

export const GetCurrentLocation = handleCurrentLocation => {
  Geolocation.getCurrentPosition(position => {
    handleCurrentLocation(position);
  }),
    error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error));
};
