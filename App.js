import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from './Framework/Screen/HomeScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
}
