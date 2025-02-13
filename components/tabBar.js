import React, { Component } from 'react';
import {MainScreen, SearchScreen, ContactScreen, AboutScreen} from '../components/screensStacks'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { color3, color2 } from '../constants/colors';
import { Icon } from 'react-native-elements';
import { texts } from '../constants/texts';
import { StoreData, RetrieveData, ClearValue } from '../components/api';


const Tab = createBottomTabNavigator();

export class TabBar  extends Component{
  

  constructor(props){
    super(props);
    this._isMounted = false;
    this.state= {

      lang: ''
      
    }
  }

  setLang () {
    RetrieveData('lang').then((lang) => { if (this._isMounted){
        this.setState({lang: lang})
    } })
  }

  componentDidMount(){

    this._isMounted = true;
    
    this._isMounted &&  this.setLang ()

  }

  componentWillUnmount() {
    this._isMounted = false;
 }

  render (){

  return(

        <Tab.Navigator
        screenOptions={({ route }) => ({
          
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
                
              if (route.name === texts.FR.text30 || route.name === texts.AR.text30 ) {
                iconName = focused
                  ? 'ios-home'
                  : 'ios-home-outline';
              } else if (route.name === texts.FR.text31 || route.name === texts.AR.text31) {
                iconName = focused ? 'ios-mail' : 'ios-mail-outline';
              }else if (route.name === texts.FR.text32 || route.name === texts.AR.text32) {
                iconName = focused ? 'ios-search' : 'ios-search-outline';
              }
            
            return <Icon name={iconName} type='ionicon' size={size} color={color} />
          },
        })}
        tabBarOptions={{
          activeTintColor: color3,
          inactiveTintColor: color2,
        }}>
            
            <Tab.Screen name={(this.state.lang == 'ar') ? (texts.AR.text30) : (texts.FR.text30)} component={MainScreen}/>
            <Tab.Screen name={(this.state.lang == 'ar') ? (texts.AR.text31) : (texts.FR.text31)} component={ContactScreen} />
            <Tab.Screen name={(this.state.lang == 'ar') ? (texts.AR.text32) : (texts.FR.text32)} component={SearchScreen} />
        
        </Tab.Navigator>
  )
  }
}
