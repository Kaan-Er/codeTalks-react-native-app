/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Register from './pages/Register';
import Login from './pages/Login';
import Rooms from './pages/Rooms';
import PrivateRoom from './pages/PrivateRoom';
import {TouchableOpacity} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';

const Router = () => {
  const Stack = createStackNavigator();
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user);
    });
  }, []);

  const handleLogout = () => {
    auth().signOut();
  };

  const AuthStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    );
  };

  const AfterLoginStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Rooms"
          component={Rooms}
          options={{
            headerShown: true,
            headerTitleStyle: {alignSelf: 'center', color: '#FFA347', left: 20},
            headerRight: () => (
              <TouchableOpacity onPress={handleLogout}>
                <Icon name="logout" size={30} style={{color: '#FFA347'}} />
              </TouchableOpacity>
            ),
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="PrivateRoom"
          component={PrivateRoom}
          options={({navigation, route}) => ({
            title: route.params.room.name,
            headerRight: () => (
              <TouchableOpacity onPress={handleLogout}>
                <Icon name="logout" size={30} style={{color: '#FFA347'}} />
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Rooms');
                }}>
                <Icon
                  name="chevron-left"
                  size={36}
                  style={{color: '#FFA347'}}
                />
              </TouchableOpacity>
            ),
            headerShown: true,
            headerTitleStyle: {alignSelf: 'center', color: '#FFA347'},
          })}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!userSession ? (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        ) : (
          <Stack.Screen name="AtferLoginStack" component={AfterLoginStack} />
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default Router;
