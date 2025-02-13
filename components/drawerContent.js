import React, {Component} from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions} from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { Image, Icon, Divider } from 'react-native-elements';

import { color3, color4, color5, color6, color7} from '../constants/colors';
import {drawerStyle, base, detailStyle, homeStyle} from '../assets/styles';
import {Context} from '../components/context';
import { texts } from '../constants/texts';
import { RetrieveData } from '../components/api';
import {loadInBrowser} from '../components/components'

const {height} = Dimensions.get('window');

export class  DrawerContent extends Component{

    constructor(props){
        super(props);
        this.state= {
    
          lang: 'fr'
    
        }
      }

    componentDidMount(){

        RetrieveData('lang').then((lang) => this.setState({lang: lang}))
      
    }

    render(){

        return (

            <Context.Consumer>
            {
                infos =>
                
                <DrawerContentScrollView >
                <SafeAreaView style={{flexDirection:'column',justifyContent:'space-between', height: height}}>
                    <View>
                
                        <View style={drawerStyle.head}>

                            <View style={{alignItems: "center"}}>
                                
                                <Image
                                    source={require( "../assets/logo.png")}
                                    resizeMode="contain"
                                    style={drawerStyle.img}
                                />
                            
                            </View>                

                        </View>

                        <View style={{marginVertical:20, paddingHorizontal:20}}>

                            <TouchableOpacity
                                    style={(this.state.lang == 'ar') ? ({...base.flexEndRev, alignItems: 'center', alignSelf: 'flex-end'}) : ({...base.flexStart, alignItems: 'center'})}
                                    onPress={() => {this.props.navigation.navigate('Home')}}
                                >
                                <Icon color={color4} size={22} type='ionicon'  name='ios-home-outline' />
                                <Text style={drawerStyle.item}>{(this.state.lang == 'ar') ? ( texts.AR.text30 ) : (texts.FR.text30)}</Text>

                            </TouchableOpacity>

                            <Divider style={{ backgroundColor: color4, marginVertical: 20 }} />

                            <TouchableOpacity
                                    style={(this.state.lang == 'ar') ? ({...base.flexEndRev, alignItems: 'center', alignSelf: 'flex-end'}) : ({...base.flexStart, alignItems: 'center'})}
                                    onPress={() => {this.props.navigation.navigate('Contact')}}
                                >
                                <Icon color={color4} size={22} type='ionicon'  name='ios-mail-outline' />
                                <Text style={drawerStyle.item}>{(this.state.lang == 'ar') ? ( texts.AR.text5 ) : (texts.FR.text5)}</Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                    style={(this.state.lang == 'ar') ? ({...base.flexEndRev, alignItems: 'center', alignSelf: 'flex-end'}) : ({...base.flexStart, alignItems: 'center'})}
                                    onPress={() => {this.props.navigation.navigate('About')}}
                                >
                                <Icon color={color4} size={22} type='ionicon'  name='ios-information-circle-outline' />
                                <Text style={drawerStyle.item}>{(this.state.lang == 'ar') ? ( texts.AR.text29 ) : (texts.FR.text29)}</Text>

                            </TouchableOpacity>

                            <Divider style={{ backgroundColor: color4, marginVertical: 20 }} />

                            <Text style={drawerStyle.title}>{(this.state.lang == 'ar') ? (texts.AR.text33) : (texts.FR.text33)}</Text>

                            <TouchableOpacity
                                    style={(this.state.lang == 'ar') ? ({...base.flexEndRev, alignItems: 'center', alignSelf: 'flex-end'}) : ({...base.flexStart, alignItems: 'center'})}
                                    onPress={() => {infos.setLanguage('fr'), infos.setRefresh(true)}}
                                >
                                <Image
                                    source={require( "../assets/france.png")}
                                    resizeMode="contain"
                                    style={drawerStyle.img2}
                                    />
                                <Text style={drawerStyle.item}>{(this.state.lang == 'ar') ? ( texts.AR.text34 ) : (texts.FR.text34)}</Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                    style={(this.state.lang == 'ar') ? ({...base.flexEndRev, alignItems: 'center', alignSelf: 'flex-end'}) : ({...base.flexStart, alignItems: 'center'})}
                                    onPress={() => {infos.setLanguage('ar'), infos.setRefresh(true)}}
                                >
                                <Image
                                    source={require( "../assets/algeria.png")}
                                    resizeMode="contain"
                                    style={drawerStyle.img2}
                                    />
                                <Text style={drawerStyle.item}>{(this.state.lang == 'ar') ? ( texts.AR.text35 ) : (texts.FR.text35)}</Text>

                            </TouchableOpacity>

                        </View>

                    </View> 

                    <View style={{padding:20}}>

                        <TouchableOpacity
                        onPress={() => loadInBrowser("https://www.ebricodom.dz/")}>

                            <Text  style={{color: color3, textAlign: "center", marginBottom:10}}>www.ebricodom.dz</Text>
                        
                        </TouchableOpacity>
                        
                        <Text style={{color: color4, textAlign: "center", marginBottom:20}}>Copyright © 2021 Ebricodom. Tous droits réservés.</Text>
                        
                    </View>
                </SafeAreaView>
                
                </DrawerContentScrollView>

            }
            </Context.Consumer>
            
        )
    }

}