import React from 'react';
import { View, Text,Image,TouchableOpacity,ActivityIndicator, Modal, Pressable, Linking, Alert} from 'react-native';
import {auth, base,detailStyle, homeStyle} from '../assets/styles';
import {Picker} from '@react-native-picker/picker';
import NetInfo from "@react-native-community/netinfo";
import { Icon, Button } from 'react-native-elements';

import {color1, color2, color3} from "../constants/colors";
import { texts } from '../constants/texts';


const checkLanguage = (textContext, t) => {
    const FR = texts.FR;
    const AR = texts.AR;

    if (textContext = 'fr'){
        
        return(FR[t])

    }else if (textContext = 'ar'){
        
        return(AR[t])
        
    }
}

const checkNetwork = () =>{
    return NetInfo.fetch().then(state => {
        return state.isConnected
      })
}

const networkAlert = (networkStatut, func) =>{

    return(
        Alert.alert(
            "Aucune connexion internet",
            "Vérifiez votre connexion internet",
            [
            {
                text: "Annuler",
                style: "cancel"
            },
            { text: "Réessayer", onPress: () => {networkStatut(), func()}}
            ],
            {cancelable: false}
        )
    )

}

function renderNetwork(networkStatut,func){
    console.log('not not not connected')
    return(  
        
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>

            <View style={{width:"60%",alignItems:"center", marginVertical:20}}>
                <Text style={{marginBottom:20, fontSize:22,fontWeight:"bold",textAlign:"center"}}>Vous êtes actuellement hors ligne</Text>
                <Button
                    title="Réessayer"
                    buttonStyle={homeStyle.boxButton}
                    titleStyle={{color:color2}}
                    onPress={()=> {networkStatut(), func()}}
                    />
            </View>

        </View>

    )
}

function renderLoading(loading){
    if (loading == true){
        return(
            <ActivityIndicator animating color={color3} size='small' style={{marginBottom:10}}/>
        )
    }
}

function renderAppLoadingModal(visible){

    return(
        
        <View>
                
            <Modal
                transparent={false}
                visible={visible}
                animationType="none"
            >

                <View style={{height: "100%", width: "100%", backgroundColor: color1, ...base.flexColCenter}}>
                    <Image style={auth.logo} source={require( "../assets/logo.png")}/>
                </View>

            </Modal>

        </View>
    )
}

function renderTextModal(text, visible, closeModal){

    return(
        
        <View>
                
            <Modal
                transparent={true}
                visible={visible}
                animationType="slide"

            >
                <Pressable style={{flex:1}} onPress={() => closeModal()}>

                    <View style={base.textModal}>

                        <Text style={{color: color2, fontSize: 16}}>{text}</Text>

                    </View>

                </Pressable>

            </Modal>

        </View>
    )
}


const Service = (props) =>{

    const item = props.item
    const priceMin = props.priceMin
    const priceMax = props.priceMax
    const navigate = props.navigate
    const rootParent = props.rootParent

    return(
        
        <TouchableOpacity  style={detailStyle.serviceItem}
            onPress={()=>{

                if(rootParent == 'home'){

                    if(priceMin == 0){

                        props.navigation.push('ServiceDetail',{id: item.id,
                            name: item.title,
                            img: item.image,
                            statut: 2,
                            rootParent: 'home'})

                    }else{

                        navigate('ServiceItemDetail',{item : item, priceMin: priceMin, priceMax: priceMax})

                    }

                }else if (rootParent == 'search'){

                    if(priceMin == 0){

                        props.navigation.push('ServiceDetailSearch',{id: item.id,
                            name: item.title,
                            img: item.image,
                            statut: 2,
                            rootParent: 'search'})

                    }else{

                        navigate('ServiceItemDetailSearch',{item : item, priceMin: priceMin, priceMax: priceMax})

                    }
                }

            }}

            >
            

            <Image
                source={{uri: item.image}}
                resizeMode="cover"
                style={detailStyle.serviceItemImg}
            />

            <View style={detailStyle.serviceItemInfo}>

                <Text style={detailStyle.serviceItemTitle}>{item.title}</Text>
                <Icon name= "ios-chevron-forward-outline" type='ionicon' size= {25} color= {color2} style={{marginEnd:10,marginStart:10}}/>

            </View>
        

        </TouchableOpacity>
        
    )
}

function renderWilaya(statut) {

    const wilaya = [
        "Adrar","Chlef","Laghouat","Oum El Bouaghi","Batna","Béjaïa","Biskra","Béchar","Blida"
        ,"Bouira","Tamanrasset","Tébessa","Tlemcen","Tiaret","Tizi Ouzou","Alger","Djelfa","Jijel",
        "Sétif","Saïda","Skikda","Sidi Bel Abbès","Annaba","Guelma","Constantine","Médéa",
        ,"Mostaganem","M'sila","Mascara","Ouargla","Oran","El Bayadh","Illizi","Bordj Bou Arreridj",
        "Boumerdès","El Tarf","Tindouf","Tissemsilt","El Oued","Khenchela","Souk Ahras","Tipaza",
        "Mila","Aïn Defla","Naâma","Aïn Témouchent","Ghardaïa","Relizane"
    ]

    if(statut == 'name'){

        return(

            wilaya.map( (value, i )=> (
                <Picker.Item label={value} value={value} />
            ))
        )
    }else if(statut == 'index'){

        return(

            wilaya.map( (value, i )=> (
                <Picker.Item label={value} value={i} />
            ))
        )
    }
}

function loadInBrowser (url){
    Linking.openURL(url).catch(err => alert("Erreur lors du chargement de la page"));
  }

export {checkLanguage, checkNetwork, renderNetwork , networkAlert,renderLoading, Service, renderTextModal, renderWilaya, loadInBrowser, renderAppLoadingModal}