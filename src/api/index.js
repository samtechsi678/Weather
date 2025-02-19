import {View, Text, Alert} from 'react-native';
import React from 'react';
import axios from 'axios';

export const GetWeather = async place => {
  const apiKey = '3a10cd8b6fe64adba7365530242609';
  const city = place;
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`,
    );
    return response;
  } catch (error) {
    // Log detailed error info
    if (error.response) {
      // Server responded with a status outside the 2xx range
      Alert.alert(
        'Error',
        `Server Error: ${error.response.status} - ${error.response.data.error.message}`,
      );
    } else if (error.request) {
      // No response received
      Alert.alert(
        'Network Error',
        'No response received. Check your internet connection.',
      );
    } else {
      // Something else happened
      Alert.alert('Request Failed', error.message);
    }
  }
};
