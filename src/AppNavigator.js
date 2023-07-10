
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react'
import LocationSharing from './screens/LocationSharing'
import OnlineUsers from './screens/OnlineUsers'


const Stack = createStackNavigator()



class AppNavigator extends Component {

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='LocationSharing' screenOptions={{ headerShown: false }} >
                    <Stack.Screen name='LocationSharing' component={LocationSharing} />
                    <Stack.Screen name='OnlineUsers' component={OnlineUsers} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default AppNavigator