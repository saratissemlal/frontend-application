import React, {useState} from 'react';
import { View, Dimensions, FlatList, Animated } from 'react-native';
import {carousel} from '../assets/styles';

import CarouselItem from './carouselItem'
import { color4 } from '../constants/colors';

const {width, height} = Dimensions.get('window');
let flatList

function  autoScroll(datalist) {
    const numberOffData = datalist
    let scrollValue = 0, scrolled = 0


    setInterval(function () {
        scrolled++
        if(scrolled < numberOffData)
        scrollValue = scrollValue + width

        else{
            scrollValue = 0
            scrolled = 0
        }

        this.flatList.scrollToOffSet({animated : true, offset: scrollValue})
    },3000)
}


const Carousel = ({data,style}) => {

    const scrollX = new Animated.Value(0);
    let position = Animated.divide(scrollX, width);
    const [dataList, setDataList] = useState(data)
    
    
    if (data) {
        return(
            <View>
                <FlatList
                data = {data}
                keyExtractor = {(item, index) => 'key' + index}
                horizontal
                pagingEnabled
                scrollEnabled
                snapToAlignment = 'center'
                scrollEventThrottle = {16}
                decelerationRate = {'fast'}
                showsHorizontalScrollIndicator = {false}
                renderItem = {({item}) => {
                   return <CarouselItem item = {item} style= {style}/>
                }}
                onScroll = {Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: false}
                )}
                />

                <View style={carousel.dotsView}>
                    {data.map((_, i) => {
                        let opacity = position.interpolate({
                            inputRange : [i-1, i, i+1],
                            outputRange : [0.3, 1, 0.3],
                            extrapolate : 'clamp'
                        })
                        return(
                            <Animated.View
                                key = {i}
                                style = {{opacity, width: 10, height: 10, backgroundColor: color4,margin: 8, borderRadius: 5}}
                            />
                        )
                    })}
                </View>

            </View>
        )
    }

    console.log("pas d'images");
    return null;

}

export default Carousel