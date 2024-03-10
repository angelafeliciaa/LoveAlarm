import React from 'react';
import { View, Text } from 'react-native';

const MatchingScreen = ({ route }) => {
  const { name, description } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Matching Screen</Text>
      <Text>Name: {name}</Text>
      <Text>Description: {description}</Text>
    </View>
  );
};

export default MatchingScreen;