import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const Home = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  // const [status, requestPermission] = Location.useBackgroundPermissions();

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
  
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
      } else {
        getLocation();
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };
  


  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

      // Uncomment the following line if you want to get the location using the Google Geolocation API
      // getGoogleGeolocation(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };


  const handleButtonPress = async () => {
    try {
      if (!location) {
        console.error('Location data not available');
        return;
      }

      const response = await fetch('http://128.189.210.153:3001/api/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          latitude: location.latitude,
          longitude: location.longitude,
        }),
      });

      // console.log(req);
      if (response.ok) {
        console.log('User data saved successfully');
        navigation.navigate('MatchingScreen', {name, description});
      } else {
        console.error('Failed to save user data');
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={["#86F1F9", "#FDD0ED"]}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Love Alarm</Text>
        <LottieView
          source={require("./assets/heartAnime.json")}
          autoPlay
          loop
          style={styles.animation}
        />

        <TextInput
          style={styles.input}
          placeholder="Your Name"
          placeholderTextColor="#fff"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          style={[styles.input, { marginTop: 10 }]}
          placeholder="Short Description"
          placeholderTextColor="#fff"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Start Matching</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient> );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30, // Adjusted font size
    fontFamily: 'Gill Sans',
    marginBottom: 20,
    color: 'white',
  },
  button: {
    backgroundColor: '#F87B92',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    fontFamily: 'Gill Sans',
    color: 'white',
    fontSize: 18,
  },
  animation: {
    width: 250, // Adjusted animation size
    height: 250, // Adjusted animation size
  },
  input: {
    fontFamily: 'Gill Sans',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: 'white',
    paddingHorizontal: 10,
    width: '80%',
    marginTop: 10,
  },
});

export default Home;

