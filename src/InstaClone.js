//NOTE#1) turbo360 dependency had to be locked at version =1.5.18 (perhaps a bit later, maybe even =1.6.35, but =1.5.18 that's the one that worked... anything after =1.8.61, and perhaps a bit before, was crashing the project before it could even finish bundling) until tutorial video 3, at about 53:00 when he was trying to actually have the photo taken automatically upload to the CDN and receive a callback with a link to it... at that point I had to change the version to "turbo360": "=1.6.35" in the package.json and npm install. Prior to that, there was the catch 22 of needing to provide an API Key but the turbo.uploadFile() method of version =1.5.18 wasn't configured to accept an API Key. NOTE#2) Expo is using an older version of react-native than what react-redux expects to change react-readux version in package.json to =6.0.0 as per this article https://stackoverflow.com/questions/55624579/react-default-memo-is-not-a-function-react-native-wrapwithconnect  NOTE#3) In stores/index.js make sure to import createStore from 'redux'

import React from 'react'
import config from './config'
import { View } from 'react-native'
import { MainFeed, Login, Register, PhoneCamera, Profile } from './components/screens'
import { createAppContainer, createSwitchNavigator, createStackNavigator, createBottomTabNavigator} from 'react-navigation'
import { Ionicons } from '@expo/vector-icons';


const Tabs = createBottomTabNavigator(
    {
        feed: MainFeed,
        camera: PhoneCamera,
        profile: Profile
    },
    {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'feed') {
          iconName = 'md-home'
      } else if (routeName === 'camera') {
          iconName = 'md-camera';
      } else if (routeName === 'profile') {
        iconName = 'md-person';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={22} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#8c8cff',
      inactiveTintColor: 'gray',
    },
  }
)

const IntroStack = createAppContainer(createStackNavigator({
    login: Login,
    register: Register
}))

const MainStack = createAppContainer(createSwitchNavigator({
    intro: IntroStack,
    main: Tabs
}))


class InstaClone extends React.Component {

    render() {
        return(
            //<PhoneCamera/>
            <MainStack />

        )
    }
}

export default InstaClone
