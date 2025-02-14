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
    Alert.alert('Wrong Location', 'Enter correct location name');
    return null;
  }
};
