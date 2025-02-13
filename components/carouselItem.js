import React, {Component} from 'react';
import { View, Text, Dimensions,ActivityIndicator} from 'react-native';
import {carousel, base} from '../assets/styles';
import { Image } from 'react-native-elements';

const {width, height} = Dimensions.get('window');

const CarouselItem = ({item,style}) => {
    
    return(
        <View style={style}>

           
            
            <Image style={carousel.image} source={{uri: item.image}} PlaceholderContent={<ActivityIndicator />}/>

        </View>
    )
}

export default CarouselItem;