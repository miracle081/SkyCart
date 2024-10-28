import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import { AppBotton } from '../Components/AppBotton'

export function Intro({ navigation }) {
  return (
    <ImageBackground source={require("../../assets/intro.jpg")} style={styles.bg}>
      <View style={styles.container}>
        <AppBotton onPress={() => navigation.navigate("SignIn")}>Get Started</AppBotton>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    paddingBottom: 40
  }
})