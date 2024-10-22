import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { HomeScreen } from './Framework/Screen/HomeScreen';
import { Intro } from './Framework/Screen/Intro';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Intro />
    </View>
  );
}
