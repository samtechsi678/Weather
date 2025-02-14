import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {tw} from '../Style';
import dayjs from 'dayjs';
import IconOne from 'react-native-vector-icons/MaterialCommunityIcons';
import IconHumidity from 'react-native-vector-icons/Entypo';
import IconUV from 'react-native-vector-icons/MaterialIcons';
import IconPressure from 'react-native-vector-icons/Octicons';
import WeatherIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const MainScreen = ({weatherData, backgroundColor}) => {
  const location = weatherData?.data.location;
  const data = weatherData?.data.current;
  const DynamicIcon = code => {
    if (code === 1000) {
      return <WeatherIcon name="weather-sunny" size={145} />;
    }
    if (code >= 1003 && code <= 1030)
      return <WeatherIcon name="weather-partly-cloudy" size={145} />;
    if (code >= 1031 && code <= 1171)
      return <WeatherIcon name="weather-fog" size={145} />;
    if (code >= 1172 && code <= 1201)
      return <WeatherIcon name="weather-rainy" size={145} />;
    if (code === 1087 || code === 1273 || code === 1276)
      return <WeatherIcon name="weather-snowy" size={145} />;
    return 'Unknown';
  };
  const getUVvalue = uv => {
    if (uv >= 0 && uv < 2) {
      return 'Low';
    } else if (uv >= 2 && uv < 5) {
      return 'Moderate';
    } else if (uv >= 5 && uv < 7) {
      return 'High';
    } else if (uv >= 7 && uv < 10) {
      return 'Very High';
    } else if (uv >= 10) {
      return 'Extreme';
    }
  };
  return (
    <View style={tw``}>
      <Text style={tw`text-4xl text-black text-center font-extrabold mt-8`}>
        {location?.name}
      </Text>
      <Text style={tw`text-xl text-black font-semibold mt-6`}>About today</Text>
      <Text style={tw`text-xl text-black font-normal mt-5 ml-3`}>
        {dayjs(location?.localtime).format('dddd, DD MMM')}
      </Text>
      <View style={tw`flex-row gap-3 justify-center items-center mt-2`}>
        <Text style={tw`text-6xl text-black font-medium`}>
          {data?.temp_c}°C
        </Text>
        <View>{DynamicIcon(data?.condition?.code)}</View>
      </View>

      {/* Card section */}
      <View style={tw`gap-3 mt-10`}>
        <View style={tw`flex-row justify-center gap-3 `}>
          <View
            style={[
              tw`w-[45%] items-center py-6 px-2 rounded-3xl bg-[${backgroundColor?.secondaryColor}]`,
              styles.shadow,
            ]}>
            <Text style={tw`text-base text-black font-semibold self-start`}>
              Humidity
            </Text>
            <Text style={tw`text-base text-black font-semibold self-start`}>
              {data?.humidity}
            </Text>
            <IconHumidity name="drop" size={50} style={tw`self-end mr-5`} />
          </View>
          <View
            style={[
              tw`w-[45%] items-center bg-white py-6 px-2 rounded-3xl bg-[${backgroundColor.secondaryColor}]`,
              styles.shadow,
            ]}>
            <Text style={tw`text-base text-black font-semibold self-start`}>
              UV
            </Text>
            <Text style={tw`text-base text-black font-semibold self-start`}>
              {getUVvalue(data?.uv)}
            </Text>
            <IconUV name="waves" size={50} style={tw`self-end mr-5`} />
          </View>
        </View>
        <View style={tw`flex-row justify-center gap-3 `}>
          <View
            style={[
              tw`w-[45%] items-center bg-white py-6 px-2 rounded-3xl bg-[${backgroundColor.secondaryColor}]`,
              styles.shadow,
            ]}>
            <Text style={tw`text-base text-black font-semibold self-start`}>
              Wind
            </Text>
            <Text style={tw`text-base text-black font-semibold self-start`}>
              {data?.wind_kph} kph
            </Text>
            <IconOne name="weather-windy" size={50} style={tw`self-end mr-5`} />
          </View>
          <View
            style={[
              tw`w-[45%] items-center bg-white py-6 px-2 rounded-3xl bg-[${backgroundColor.secondaryColor}] `,
              styles.shadow,
            ]}>
            <Text style={tw`text-base text-black font-semibold self-start`}>
              Pressure
            </Text>
            <Text style={tw`text-base text-black font-semibold self-start`}>
              {data?.pressure_mb}
            </Text>
            <IconPressure name="meter" size={50} style={tw`self-end mr-5`} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
  },
});
export default MainScreen;
