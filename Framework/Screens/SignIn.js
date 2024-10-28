import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Theme } from '../Components/Theme'

export function SignIn() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: Theme.fonts.text500, fontSize: 30 }}>SignIn</Text>
    </View>
  )
}

const styles = StyleSheet.create({});