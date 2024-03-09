import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';

const Home = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleButtonPress = () => {
    // You can use the 'name' and 'description' values as needed
    // For example, you can pass them to the next screen using navigation.navigate('OtherScreen', { name, description });
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={["#86F1F9", "#FDD0ED"]}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 0.1, y: 1}}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Love Alarm</Text>
        <LottieView
          source={require("./assets/heartAnime.json")}
          autoPlay
          loop
          style={styles.animation}
        />

        {/* Text Input for Name */}
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          placeholderTextColor="#fff"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        {/* Text Input for Short Description */}
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
    fontSize: 40,
    fontWeight: 'bold',
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
    color: 'white',
    fontSize: 18,
  },
  animation: {
    width: 200,
    height: 200,
  },
  input: {
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
