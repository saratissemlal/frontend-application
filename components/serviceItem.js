import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import {homeStyle} from '../assets/styles';

const ServiceItem = ({item,navigation}) => {

    return(

    <TouchableOpacity  style={homeStyle.serviceCard} onPress={()=> navigation.navigate('ServiceDetail',{service: item.title})}>

        <Image
            source={require( "../assets/logo.png")}
            resizeMode="cover"
            style={homeStyle.serviceImg}
        />
        
        <Text style={homeStyle.serviceTitle}>{item.title}</Text>
    

    </TouchableOpacity>
    )
}
export default ServiceItem