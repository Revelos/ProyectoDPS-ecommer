import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
//colors
import { Colors, StyledContainer } from './../components/styles';
const { darkLight, brand, primary, tertiary, secondary } = Colors;
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Perfil from './../screens/Welcome';
import Productos from '../screens/Productos';
import Home from '../screens/Home';
import Logout from './../screens/Logout';
import Producto from './../screens/Producto';
import FormCompra from './../screens/FormCompra';
// credentials context
import { CredentialsContext } from './../components/CredentialsContext';
import Splash from './../components/splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
// keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Drawers() {
  return (
    <>
      <View style={{ flex: 1, marginTop: 18 }}>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTitleAlign: 'center',
            drawerStyle: {
              backgroundColor: 'white',
              width: 240,
            },
            headerStyle: {
              backgroundColor: 'white',
            },
            //headerRight:()=>(<FontAwesome name="sign-out" size={24} color="black" />),
          }}
        >
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              drawerIcon: () => <FontAwesome name="home" size={24} color="black" />,
            }}
          />
          <Drawer.Screen
            name="Productos"
            component={Productos}
            options={{
              drawerIcon: () => <FontAwesome name="cart-plus" size={24} color="black" />,
            }}
          />
          <Drawer.Screen
            name="Producto"
            component={Producto}
            options={{
              drawerIcon: () => <FontAwesome name="bookmark" size={24} color="black" />,
            }}
          />
          <Drawer.Screen
            name="FormCompra"
            component={FormCompra}
            options={{
              drawerIcon: () => <FontAwesome name="money" size={24} color="black" />,
            }}
          />
          <Drawer.Screen
            name="Perfil"
            component={Perfil}
            options={{
              drawerIcon: () => <FontAwesome name="user-circle" size={24} color="black" />,
            }}
          />
          <Drawer.Screen
            name="Logout"
            component={Logout}
            options={{
              drawerIcon: () => <FontAwesome name="sign-out" size={24} color="black" />,
            }}
          />
        </Drawer.Navigator>
      </View>
    </>
  );
}

function SplashScreen({ navigation }) {
  setTimeout(() => {
    try {
      navigation.replace('Login');
    } catch (e) {
      console.log('Se encuentra en Home');
    }
  }, 4000);

  return <Splash />;
}

const RootStack = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer style={{ backgroundColor: 'red' }}>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: 'transparent',
              },

              headerTransparent: true,
              headerTitle: '',
              headerLeftContainerStyle: {
                paddingLeft: 20,
              },
              headerBackTitle: 'Login',
            }}
          >
            {storedCredentials ? (
              <Stack.Screen
                options={{
                  headerTintColor: primary,
                }}
                name="Drawers"
                component={Drawers}
              />
            ) : (
              <>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootStack;
