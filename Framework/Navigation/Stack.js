import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Intro } from "../Screens/Intro";
import { SignUp } from "../Screens/SignUp";
import { SignIn } from "../Screens/SignIn";
import { HomeScreen } from "../Screens/HomeScreen";
import { Profile } from "../Screens/Profile";
import { Products } from "../Screens/Products";
import { EditProfile } from "../Screens/EditProfile";
import { Cart } from "../Screens/Cart";
import { Theme } from "../Components/Theme";


const Stack = createNativeStackNavigator();

export function StackNavigator() {

    return (
        <NavigationContainer>
            {/* <ExpoStatusBar animated style={"dark"} backgroundColor={Theme.colors.bg} /> */}
            <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: true, headerTintColor: Theme.colors.light.text1, }}>
                <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
                <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: true, title: "" }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ title: "" }} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                <Stack.Screen name="Products" component={Products} options={{ title: "" }} />
                <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: "Update Profile" }} />
                <Stack.Screen name="Cart" component={Cart} options={{ title: "Email Verification" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}