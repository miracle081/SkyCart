import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import { Button, Switch } from 'react-native-paper';
import { Theme } from '../Components/Theme';
import { Formik } from 'formik';
import * as yup from "yup"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Firebase/settings';
import { AppContext } from '../Components/globalVariables';
import { doc, setDoc } from 'firebase/firestore';

const validation = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required(),
  firstname: yup.string().min(2).max(20).required(),
  lastname: yup.string().min(2).max(20).required(),
  username: yup.string().min(6).max(15).required(),
})

export function SignUp({ navigation }) {
  const { setUserUID, setPreloader } = useContext(AppContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>

        <Formik
          initialValues={{ firstname: "", lastname: "", email: "", username: "", password: "" }}
          onSubmit={(value) => {
            setPreloader(true)
            createUserWithEmailAndPassword(auth, value.email, value.password).then((data) => {
              const { uid } = data.user;

              setDoc(doc(db, "users", uid), {
                firstname: value.firstname,
                lastname: value.lastname,
                email: value.email,
                username: value.username,
                userUID: uid,
                image: null,
                phone: "",
                role: "user",
              }).then((data) => {
                setPreloader(false)
                setUserUID(uid)
                navigation.replace("HomeScreen")
              }).catch(e => {
                setPreloader(false)
                console.log(e)
              })
            }).catch(e => {
              setPreloader(false)
              console.log(e)
            })
          }}
          validationSchema={validation}
        >
          {(prop) => {
            return (
              <View style={{ flex: 1, justifyContent: "center", }}>
                <Text style={{ fontSize: 35, textAlign: "center", fontFamily: Theme.fonts.text600 }}>Create Account</Text>
                <View style={styles.label}>
                  <Text style={{ fontFamily: Theme.fonts.text500 }}>First Name</Text>
                  <TextInput
                    // placeholder='Enter  Full Name'
                    placeholderTextColor={"gray"}
                    style={styles.input}
                    onChangeText={prop.handleChange('firstname')}
                    onBlur={prop.handleBlur("firstname")}
                    value={prop.values.firstname}
                  />
                  <Text style={{ fontSize: 13, color: Theme.colors.red, fontFamily: Theme.fonts.text400 }}>{prop.touched.firstname && prop.errors.firstname}</Text>

                </View>
                <View style={styles.label}>
                  <Text style={{ fontFamily: Theme.fonts.text500 }}>Last Name</Text>
                  <TextInput
                    // placeholder='Enter  Full Name'
                    placeholderTextColor={"gray"}
                    style={styles.input}
                    onChangeText={prop.handleChange('lastname')}
                    onBlur={prop.handleBlur("lastname")}
                    value={prop.values.lastname}
                  />
                  <Text style={{ fontSize: 13, color: Theme.colors.red, fontFamily: Theme.fonts.text400 }}>{prop.touched.lastname && prop.errors.lastname}</Text>

                </View>
                <View style={styles.label}>
                  <Text style={{ fontFamily: Theme.fonts.text500 }}>E-mail</Text>
                  <TextInput
                    // placeholder='Enter E-mail'
                    placeholderTextColor={"gray"}
                    style={styles.input}
                    onChangeText={prop.handleChange('email')}
                    onBlur={prop.handleBlur("email")}
                    value={prop.values.email}
                  />
                  <Text style={{ fontSize: 13, color: Theme.colors.red, fontFamily: Theme.fonts.text400 }}>{prop.touched.email && prop.errors.email}</Text>


                </View>

                <View style={[styles.label, {}]}>
                  <Text style={{ fontFamily: Theme.fonts.text500 }}>Username</Text>
                  <TextInput
                    // placeholder='Enter Username'
                    placeholderTextColor={"gray"}
                    style={styles.input}
                    onChangeText={prop.handleChange('username')}
                    onBlur={prop.handleBlur("username")}
                    value={prop.values.username}
                  />
                  <Text style={{ fontSize: 13, color: Theme.colors.red, fontFamily: Theme.fonts.text400 }}>{prop.touched.username && prop.errors.username}</Text>

                </View>

                <View style={styles.label}>
                  <Text style={{ fontFamily: Theme.fonts.text500 }}>Password</Text>
                  <TextInput
                    // placeholder='Enter Password'
                    // placeholderTextColor={"gray"}
                    style={styles.input}
                    onChangeText={prop.handleChange('password')}
                    onBlur={prop.handleBlur("password")}
                    value={prop.values.password}
                  />
                  <Text style={{ fontSize: 13, color: Theme.colors.red, fontFamily: Theme.fonts.text400 }}>{prop.touched.password && prop.errors.password}</Text>

                </View>
                <Button mode='contained-tonal' style={{ marginVertical: 10 }} onPress={prop.handleSubmit} buttonColor={Theme.colors.primary + 30}  > Sign Up</Button>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ fontSize: 15, marginVertical: 30, fontFamily: Theme.fonts.text300 }}>Im already a user</Text>
                  <Button mode='text' onPress={() => { navigation.navigate("Login") }}>Log In</Button>
                </View>
              </View>
            )
          }}
        </Formik>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#ffffff00",
  },
  input: {
    borderColor: Theme.colors.primary,
    borderWidth: 1,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 30,
    fontSize: 17,
  },

  label: {
    marginBottom: 10,
  }
})