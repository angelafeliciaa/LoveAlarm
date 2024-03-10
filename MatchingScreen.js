import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';

const MatchingScreen = ({ route }) => {
  const { name: initialName, description: initialDescription } = route.params;
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);

  const handleButtonPress = () => {
    // Handle button press logic here if needed
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
        <View style={styles.animationContainer}>
          <LottieView
            source={require("./assets/whiteCircle.json")}
            autoPlay
            loop
            style={styles.animation}
          />
          <LottieView
            source={require("./assets/heart.json")}
            autoPlay
            loop
            style={styles.heartanimation}
          />
           <LottieView
            source={require("./assets/heart.json")}
            autoPlay
            loop
            style={styles.heartanimation2}
          />
        </View>
        

      </View>
      <View style={styles.textContainer}>
          <Text style={styles.text}>Someone likes you</Text>
          <Text style={styles.text}>within a 10-meter radius</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>2</Text>
        </View>
    </LinearGradient>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Gill Sans',
    fontSize: 30,
    marginBottom: -80,
    color: 'white',
  },
  animationContainer: {
    position: 'relative',
    width: 400,
    height: 400,
    marginTop: 50,
    marginBottom: 50,
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  heartanimation: {
    position: 'absolute',
    top: 200,
    left: 200,
    width: '15%',
    height: '20%',
  },
  heartanimation2: {
    position: 'absolute',
    top: 100,
    left: 130,
    width: '15%',
    height: '20%',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    
  },
  
  number: {
    fontSize: 40, // Adjusted font size
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 100,
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: '70%',
    left: '32%',
    transform: [{ translateX: -20 }, { translateY: -20 }], // Center the text
  },
});

export default MatchingScreen;