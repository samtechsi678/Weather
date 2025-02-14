import {View, Text, Pressable, TextInput, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {GetWeather} from './src/api';
import {SafeAreaView} from 'react-native';
import {tw} from './src/Style';
import MainScreen from './src/Components/MainScreen';
import {GetCurrentLocation} from './src/Components/GetCurrentLocation';
import DynamicBackground from './src/Components/DynamicBackground';
import {StatusBar} from 'react-native';
if (__DEV__) {
  require('./ReactotronConfig');
}
const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState({
    mainColor: '#ffffff',
    secondaryColor: '#000000',
    condition: 'Rainy',
  });
  const handleCurrentLocation = position => {
    const location = `${position.coords.latitude},${position.coords.longitude}`;
    currentWeatherLocation(location);
  };
  useEffect(() => {
    GetCurrentLocation(handleCurrentLocation);
  }, []);
  const currentWeatherLocation = async location => {
    setLoading(true);
    const result = await GetWeather(location);
    setWeather(result);
    setLoading(false);
    const backgroundColor = DynamicBackground(
      result.data.current.condition.code,
    );
    setBackgroundColor(backgroundColor);
  };
  const fetchData = async () => {
    setIsInputVisible(true);
    if (isInputVisible) {
      if (city !== '') {
        setLoading(true);
        setBackgroundColor(null);
        const result = await GetWeather(city);
        setWeather(result);
        setLoading(false);
        setCity('');
        setIsInputVisible(false);
        const backgroundColor = DynamicBackground(
          result.data.current.condition.code,
        );
        setBackgroundColor(backgroundColor);
      } else {
        return null;
      }
    }
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-[${backgroundColor?.mainColor}]`}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView style={tw`px-4`}>
        <View
          style={tw`flex-row gap-2 mt-2 px-3 items-center justify-center self-end py-1 ${
            isInputVisible ? `border rounded-lg` : null
          } `}>
          {isInputVisible ? (
            <TextInput
              placeholder="Search here..."
              value={city}
              style={tw`flex-1 max-w-[85%]  rounded-lg px-2 text-base`}
              onChangeText={e => setCity(e)}
              autoCorrect
              returnKeyType="done"
              onSubmitEditing={fetchData}
            />
          ) : null}
          <Pressable onPress={fetchData}>
            <Icon name="search" size={40} />
          </Pressable>
        </View>
        <View></View>
        <View>
          {loading ? (
            <View style={tw`flex-1 items-center justify-center`}>
              <LottieView
                source={{
                  uri: 'https://lottie.host/1c0108d8-4ba1-4c1e-bdd0-debd2fa9edbb/n5PupGqrq0.lottie',
                }}
                autoPlay
                loop
                style={{width: 200, height: 200}}
              />
            </View>
          ) : weather ? (
            <MainScreen
              weatherData={weather}
              backgroundColor={backgroundColor}
            />
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
