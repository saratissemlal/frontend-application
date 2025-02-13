import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
import {color3, color1, color2, color4,color5, color7, color6} from "../constants/colors";

const {width, height} = Dimensions.get('window');

const base = StyleSheet.create({
    cont:{flex:1,backgroundColor:'#fff'},
    contAR: {flexDirection:'column',alignItems: 'flex-end'},
    container: {padding: 20},
    flexStart: {flexDirection:'row',justifyContent:'flex-start',},
    flexEnd: {flexDirection:'row',justifyContent:'flex-end',},
    flexBet: {flexDirection:'row',justifyContent:'space-between',},
    flexCenter: {flexDirection:'row',justifyContent:'center',},
    flexWrap: {flexWrap:'wrap'},
    flexEndRev: {flexDirection:'row-reverse',justifyContent:'flex-end'},
    flexColEnd: {flexDirection:'column',justifyContent:'flex-end',},
    flexColCenter: {flexDirection:'column',justifyContent:'center',alignItems:'center'},
    backButton:{position:'absolute',top:13,left:13,zIndex:1,padding:5, backgroundColor: 'rgba(0,0,0,.2)', borderRadius: 30},
    BackIcon: {color:'#fff'},
    icon : {color: color3,marginRight: 15},
    modal: {backgroundColor: '#fff', padding:30, width: width,position: 'absolute',bottom:0},
    modalBack: {backgroundColor: 'rgba(0,0,0,.1)',flex: 1},
    button: {backgroundColor:color3,borderRadius:10},
    textModal: {backgroundColor: color3, padding:30, width: width,position: 'absolute',bottom:0},
    taRight:{textAlign:'right'}
});

const header = StyleSheet.create({
    head:{backgroundColor:color3}
});

const auth = StyleSheet.create({
    container:{flex:1,backgroundColor:color5},
    header: {justifyContent:'center',paddingHorizontal:30},
    logo: {width: "80%", alignSelf:"center",resizeMode: "contain"},
    footer: {backgroundColor:"#fff", borderTopLeftRadius:30,borderTopRightRadius:30,padding:30},
    title: {fontSize:40,fontWeight:"bold",marginBottom:15},
    p: {fontSize:15,marginBottom:25,color:color4},
    button: {backgroundColor:color3,borderRadius:10,width:width/2 - 40},
    button2: {backgroundColor:color2,borderRadius:10,width:width/2 - 40},
});


const drawerStyle = StyleSheet.create({
    head: {padding:20,backgroundColor:color5, display:'flex',justifyContent:'space-between'},
    avatar:{backgroundColor:color1,marginRight:15},
    item:{paddingHorizontal:10,color:color4, paddingVertical: 10},
    button:{backgroundColor:color3,color:color2,marginTop:20,paddingHorizontal:20,borderRadius:10},
    img: {width: width / 2, height: 100,marginHorizontal:10,resizeMode:'contain'},
    title: {fontSize: 15, color: color4, fontWeight: 'bold', marginVertical: 10},
    img2: {width: 25, height: 25,resizeMode:'contain'},

});

const carousel = StyleSheet.create({

    card1:{flex:1,width: width - 40 ,height: height / 3, backgroundColor:'#fff',borderRadius:15,
        shadowColor:color4, shadowOffset: {width: 1, height: 1}, shadowOpacity: 0.5,
        shadowRadius:15, elevation:5,borderColor:color1,overflow:'hidden'},
    card2:{flex:1, width: width ,height: height / 3, backgroundColor:'#fff',
    shadowColor:color4, shadowOffset: {width: 1, height: 1}, shadowOpacity: 0.5,
    shadowRadius:15, elevation:5,borderColor:color1},

    image:{width: "100%", height: height / 3},
    dotsView:{flexDirection: 'row', justifyContent: 'center'}

});

const homeStyle = StyleSheet.create({
    container: {padding:20},
    h1:{fontWeight:'bold',fontSize:30,marginTop:20},
    h2:{fontWeight:'bold',fontSize:23,marginTop:20},
    h3:{fontSize:20,marginBottom:8},
    h4:{fontSize:18,marginBottom:8,color:color4},
    h5:{fontSize:15,marginBottom:8, fontWeight: 'bold'},
    serviceCard:{width: (width /2) -30,alignItems:'center',},
    serviceImg: {width:width /2 -30,height:width /2 -30 ,borderRadius: 15,marginBottom:10},
    serviceTitle:{fontSize:15,},
    box: {backgroundColor:color2,borderRadius:15,padding:20,marginBottom:30},
    box2: {backgroundColor:color1,borderRadius:15,padding:20},
    boxH1: {color:color1,fontWeight:'bold',fontSize:30,marginBottom:10},
    siteTel :{color:color3,fontSize:18,marginBottom:10},
    boxP: {color:color1,fontSize:15,marginBottom:20},
    boxButton:{backgroundColor:color3,borderRadius:10,width: width /2,color:color2},
    serviceItemsImg: {width:width,height:150},
    
});

const detailStyle = StyleSheet.create({
    TileTitle:{width:width,height:260,backgroundColor:'rgba(0,0,0,.6)',paddingTop:120,paddingEnd:20,paddingStart:20},
    serviceItem:{backgroundColor: color3,marginEnd:10,marginStart:10,marginBottom:10,flexDirection:'row',justifyContent:'space-between',
        alignItems:'center',shadowColor:color4, shadowOffset: {width: 1, height: 1}, shadowOpacity: 0.5,
        shadowRadius:15, elevation:5,borderColor:color1,borderWidth:1,borderRadius:15},
    serviceItemImg: {width:width /4,height:width /5 ,borderBottomLeftRadius: 15, borderTopLeftRadius: 15,},
    serviceItemInfo: {width:'70%',flexDirection:'row', justifyContent: 'space-between', alignItems:'center'},
    serviceItemTitle: {fontSize:15,marginBottom:5, width: width/2},
    price: {fontSize:15,fontWeight:'bold',marginBottom:10,marginEnd:10},
    remise : {fontSize:15,color:color4,marginBottom:10, textDecorationLine:"line-through"},
    serviceItemButton: {backgroundColor:'transparent',},
    serviceItemPanier: {borderRadius:12,paddingVertical:5,paddingHorizontal:15},

})

const detail = StyleSheet.create({
    title : {fontSize:25,marginBottom:15},
    price : {fontSize:20,color:color3,padding: 10},
    desc : {marginTop:20,borderTopColor:color5,borderTopWidth:1,paddingTop:15},
    p: {fontSize : 15,marginBottom:20},
    infos : {backgroundColor:color5,padding:20},
    boxP : {color:color4,marginBottom:12},
    box : {backgroundColor:'#fff', shadowColor:color4, shadowOffset: {width: 1, height: 1}, shadowOpacity: 0.5,
            shadowRadius:15,borderRadius: 10, elevation:5,borderColor:color1, overflow: 'hidden'},
    titlePrice : {backgroundColor: color3,padding:10}

})

export {base, header, auth,drawerStyle, homeStyle, carousel,detailStyle,detail}

