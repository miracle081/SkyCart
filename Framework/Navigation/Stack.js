import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Intro } from "../Screens/Intro";
import { HomeScreen } from "../Screens/HomeScreen";
import { Profile } from "../Screens/Profile";
import { Login } from "../Screens/Login";
import { Signup } from "../Screens/Signup";
import { ForgotPassword } from "../Screens/ForgotPassword";
import { Pay } from "../Screens/Pay";
import { EditProfile } from "../Screens/EditProfile";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ChangePassword } from "../Screens/ChangePassword";
import { Help } from "../Screens/Help";
import { AccountVerification } from "../Screens/AccountVerification";
import { SignupStep2 } from "../Screens/SignupStep2";
import { EmailVerification } from "../Screens/EmailVerification";
import { useContext } from "react";
import { AppContext } from "../../global/globalVariables";
import { Theme } from "../Components/Theme";
import { Web } from "../Screens/Web";
import { SocialCommunity } from "../Screens/SocialCommunity";
import { DeleteAccount } from "../Screens/DeleteAccount";
import { LoginVerify } from "../Screens/LogInVerify";

const Stack = createNativeStackNavigator();

export function StackNavigator() {
    const { mode } = useContext(AppContext);

    return (
        <NavigationContainer>
            {/* <ExpoStatusBar animated style={"dark"} backgroundColor={Theme.colors.bg} /> */}
            <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: true, headerTintColor: Theme.colors.text1, }}>
                <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: true, title: "this", navigationBarHidden: true }} />
                <Stack.Screen name="Signup" component={Signup} options={{ title: "" }} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                <Stack.Screen name="EmailVerification" component={EmailVerification} options={{ title: "" }} />
                <Stack.Screen name="LoginVerify" component={LoginVerify} options={{ title: "Email Verification" }} />
                <Stack.Screen name="SignupStep2" component={SignupStep2} options={{ title: "Bio Data" }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: "Forgot Password" }} />
                <Stack.Screen name="Pay" component={Pay} options={{ headerShown: false }} />
                <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: "Update Profile" }} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ title: "Change Password" }} />
                <Stack.Screen name="Help" component={Help} options={{ title: "Help & Support" }} />
                <Stack.Screen name="AccountVerification" component={AccountVerification} options={{ title: "Account Verification" }} />
                <Stack.Screen name="Web" component={Web} options={{ title: "" }} />
                <Stack.Screen name="SocialCommunity" component={SocialCommunity} options={{ title: "Social Community" }} />
                <Stack.Screen name="DeleteAccount" component={DeleteAccount} options={{ title: "Delete Account" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}