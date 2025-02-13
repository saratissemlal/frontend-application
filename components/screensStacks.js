import React, {Component} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import {color3, color1} from '../constants/colors';
import {appName} from '../constants/texts';

import Home from '../screens/home';
import About from '../screens/about';
import Search from '../screens/search';
import ServiceDetail from '../screens/serviceDetail';
import ServiceItemDetail from '../screens/serviceItemDetail';
import Contact from '../screens/contact';

import {Context} from '../components/context'

const Stack = createStackNavigator();

class MainScreen  extends Component{

    constructor(props){
        super(props);
    }

    static contextType = Context;

    render() {

        const context = this.context

        return (
            <Stack.Navigator screenOptions={{headerStyle: {backgroundColor:color3},
                      title:appName,
                      headerLeft: () =>(<Icon name='ios-menu-outline' type='ionicon' iconStyle={{paddingStart:20,paddingEnd:15}}
                      onPress={() => this.props.navigation.toggleDrawer()} />)}}>
        
                <Stack.Screen name="Home" component={Home} initialParams={{refresh: context.langRefresh}}/>
                <Stack.Screen name="ServiceDetail" component={ServiceDetail}/>
                <Stack.Screen name="ServiceItemDetail" component={ServiceItemDetail}/>
                <Stack.Screen name="Contact" component={ContactScreen}/>
  
            </Stack.Navigator>
        )
    }
}

class SearchScreen  extends Component{

    constructor(props){
        super(props);
    }

    render() {

        return (
            <Stack.Navigator screenOptions={{headerShown:false}}>
        
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="ServiceDetailSearch" component={ServiceDetail}/>
                <Stack.Screen name="ServiceItemDetailSearch" component={ServiceItemDetail} />
        
            </Stack.Navigator>
        )
    }
}


class ContactScreen  extends Component{

    constructor(props){
        super(props);
    }

    render() {

        return (
            <Stack.Navigator screenOptions={{headerStyle: {backgroundColor:color3},
                    title:appName,
                    headerLeft: () =>(<Icon name='ios-menu-outline' type='ionicon' iconStyle={{paddingStart:20,paddingEnd:15}}
                    onPress={() => this.props.navigation.toggleDrawer()} />)}}>
                
                <Stack.Screen name="Contact" component={Contact}/>
        
            </Stack.Navigator>
        )
    }
}

class AboutScreen  extends Component{

    constructor(props){
        super(props);
    }

    render() {

        return (
            <Stack.Navigator screenOptions={{headerStyle: {backgroundColor:color3},
                                title:'A propos',
                                headerLeft: () =>(<Icon name='ios-chevron-back-outline' type='ionicon' iconStyle={{paddingStart:20,paddingEnd:15}}
                                onPress={() => this.props.navigation.goBack()} />)}}>
                
                <Stack.Screen name="About" component={About}/>
        
            </Stack.Navigator>
        )
    }
}


export {MainScreen, SearchScreen, ContactScreen, AboutScreen}

