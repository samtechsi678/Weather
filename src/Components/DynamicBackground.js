import {View, Text} from 'react-native';
import React from 'react';

const DynamicBackground = code => {
  if (code === 1000) {
    return {
      mainColor: '#FFD700',
      secondaryColor: '#FFE147',
      condition: 'Sunny & Clear',
    };
  }
  if (code >= 1003 && code <= 1030)
    return {
      mainColor: '#778899',
      secondaryColor: '#B0C4DE',
      condition: 'Cloudy',
    };
  if (code >= 1031 && code <= 1171)
    return {
      mainColor: '#C0C0C0',
      secondaryColor: '#DCDCDC',
      condition: 'Mist',
    };
  if (code >= 1172 && code <= 1201)
    return {
      mainColor: '#B0E0E6',
      secondaryColor: '#4682B4',
      condition: 'Rainy',
    };
  if (code === 1087 || code === 1273 || code === 1276)
    return {
      mainColor: '#87CEEB',
      secondaryColor: '#D3D3D3',
      condition: 'Snow',
    };
  return 'Unknown';
};

export default DynamicBackground;
