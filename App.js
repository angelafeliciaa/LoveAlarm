import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native'; // Import LottieView

// Define the Home component
const Home = ({ navigation }) => {
  // Sample function to handle button press
  const handleButtonPress = () => {
    // Navigate to another screen or perform any desired action
    // For example, you can use navigation.navigate('OtherScreen');
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
        {/* Include the LottieView component */}
        <LottieView
          source={require("./assets/heartAnimation.json")} // Provide the correct path
          autoPlay
          loop
          style={styles.animation}
        />
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Start Matching</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

// Define styles using StyleSheet
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
    color: 'white', // Set text color to white for better visibility
  },
  button: {
    backgroundColor: '#F87B92',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  animation: {
    width: 200, // Set the width and height as needed
    height: 200,
  },
});

// Export the Home component
export default Home;
