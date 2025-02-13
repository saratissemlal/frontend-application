import React, {Component} from 'react';
import { View, Text,ScrollView,TouchableOpacity,ActivityIndicator, Alert, PermissionsAndroid, StatusBar} from 'react-native';
import {detail, base,carousel, homeStyle} from '../assets/styles';
import { Icon, Input, Button, CheckBox, Divider } from 'react-native-elements';
import {color2,color3, color4} from "../constants/colors";
import {WEBROOT, LOGIN, TOKEN} from "../constants/general";
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

import Carousel from '../components/carousel';
import { Context } from '../components/context';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { RetrieveData} from '../components/api'
import { getStatusBarHeight } from 'react-native-status-bar-height'


class ServiceItemDetail  extends Component{

    constructor(props){
        super(props);
        this.state= {
            productDetail: [],
            firstImg : [{
                image: this.props.route.params.item.image,
            }],
            servicesimages: [],
            texts: [],
            loading: true,
            checkedU: true,
            checkedR: false,
            loading2 : false,
            loading3 : false,
            dateShow : false,
            nom : '',
            prenom : '',
            adresse : '',
            email: '',
            description: '',
            tel: '',
            intervention: '1',
            date: new Date(1598051730000),
            time: new Date(1598051730000),
            hideText:false,
            hideTime:false,
            network: true,
            altitude: null,
            latitude: null,
            longitude: null,
            showMap: false
        }

    }

    static contextType = Context;

    getServiceDetails = async(id, lang) =>{

        await fetch(WEBROOT+"single",{
            method : 'post',
            header : {
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            },
            body:JSON.stringify({
                login : LOGIN,
                token : TOKEN,
                id : id,
                lang: lang
            })
            }) 
            .then((response) => response.json())
            .then((responseJson) =>{

                if(responseJson.success == true){

                    this.setState({
                        loading : false,
                        productDetail: responseJson.data,
                        texts: responseJson.texts,
                        servicesimages: this.state.firstImg.concat(responseJson.images)
                    })

                }else{
                    alert('error')
                }                

            })
            .catch((error) => {console.error(error);});
  
    }

    renderLoading () {

        if (this.state.loading == true){
            return(
                <ActivityIndicator animating color={color3} size='small' style={{marginBottom:10}}/>
            )
        }
    }

    getPrice(priceMin,priceMax){

        const textContext = this.context;
        const texts = textContext.texts;

        if(priceMin == 1 && priceMax == 1){

            return(
            
                <View style={detail.box}>

                    <Text style={(textContext.lang == 'ar') ? ({...detail.titlePrice, textAlign: 'right'}) : (detail.titlePrice)}>{texts.text11}</Text>
                    <Text style={(textContext.lang == 'ar') ? ({...detail.price, textAlign: 'right'}) : (detail.price)}>{texts.text38}</Text>
                     
                </View> 

            )
            
        }else if(priceMin == priceMax){

            return(
                <View style={detail.box}>

                    <Text style={(textContext.lang == 'ar') ? ({...detail.titlePrice, textAlign: 'right'}) : (detail.titlePrice)}>{texts.text11}</Text>
                    
                    <Text style={(textContext.lang == 'ar') ? ({...detail.price, textAlign: 'right'}) : (detail.price)}> {priceMin} DA TTC</Text>
                       
                </View>
            )
        }else{
            return(

                <View style={detail.box}>

                    <Text style={(textContext.lang == 'ar') ? ({...detail.titlePrice, textAlign: 'right'}) : (detail.titlePrice)}>{texts.text11}</Text>
                    
                    <Text style={(textContext.lang == 'ar') ? ({...detail.price, textAlign: 'right'}) : (detail.price)}>{texts.text12} {priceMin} DA TTC {texts.text13} {priceMax} DA TTC</Text>
                        
                </View>
            )
        }
    }

    getDescription(description){

        return(
            <Text style={detail.p}>{description}</Text>
        )
        
    }

    commander = async(title, id, price) =>{

        const context = this.context;
        this.setState({loading2 : true})
    
        if(this.state.nom == '' || this.state.prenom == '' || this.state.tel == '' || this.state.adresse == '' || this.state.intervention == ''){
    
            alert('Veuillez remplir tous les champs')
            this.setState({loading2 : false})
    
          return false        
        }
    
        try{
  
          this.setState({loading: true})
    
          await fetch(WEBROOT+"commander",{
              method : 'post',
              header : {
                  'Accept' : 'application/json',
                  'Content-type' : 'application/json'
              },
              body:JSON.stringify({
                
                  login : LOGIN,
                  token : TOKEN,
                  besoin_title : title,
                  besoin_id : id,
                  besoin_price : price,
                  nom : this.state.nom,
                  prenom : this.state.prenom,
                  email : this.state.email,
                  description : this.state.description,
                  tel : this.state.tel,
                  adresse : this.state.adresse,
                  gps: this.state.latitude + "," + this.state.longitude,
                  type : this.state.intervention,
                  date_intervention : this.state.date,
                  time_intervention : this.state.time
              })
              })
              .then((response) => response.json())
              .then((responseJson) =>{
    
                  if(responseJson.success == true){
                    
                    this.setState({
                      nom : '',
                      prenom : '',
                      adresse: '',
                      tel: '',
                      email: '',
                      date: new Date(),
                      time: new Date(),
                      showDate: false,
                      checkedU: true,
                      checkedR: false,
                      dateShow : false,
                      hideText:false,
                      hideTime:false
                    })
  
                    context.setModalVisible(responseJson.message)
    
                  }else{
    
                      alert(responseJson.message)
    
                  }
                  
    
              })
              .catch((error) => {console.error(error);});
            }catch(e){
              console.log(e)
            }
            
            this.setState({loading2 : false})
    }

    renderDate(){

        const textContext = this.context;
        const texts = textContext.texts;

        if (this.state.dateShow == true){
            return(
                <View>
                    <TouchableOpacity
                        onPress={() => {this.setState({showDate: true})}}
                        style={{...base.flexStart,alignItems:"center", paddingVertical:15,paddingHorizontal:10, marginTop:10}}
                        >
                        
                            <Icon name= "ios-calendar-outline" type='ionicon' size= {25} color= {color4} style={{marginRight:8}}/>
                            
                            {this.state.hideText ? (<Text>{moment(this.state.date).format("DD/MM/YYYY")}</Text>)
                                            : (<Text>{texts.text23}</Text>)}                                

                    </TouchableOpacity>

                    <Divider style={{ backgroundColor: "#A0A0AD", height:1 }} />

                    <TouchableOpacity
                        onPress={() => {this.setState({showTime: true})}}
                        style={{...base.flexStart,alignItems:"center", paddingVertical:15,paddingHorizontal:10}}
                        >
                        
                            <Icon name= "ios-time-outline" type='ionicon' size= {25} color= {color4} style={{marginRight:8}}/>
                            
                            {this.state.hideTime ? (<Text>{moment(this.state.time).format("H:m")}</Text>)
                                            : (<Text>{texts.text24}</Text>)}
                            

                    </TouchableOpacity>

                    {this.state.showDate && (
                        <DateTimePicker
                            testID="datePicker"
                            value={this.state.date}
                            mode={"date"}
                            is24Hour={true}
                            display="default"
                            minimumDate={new Date()}
                            onChange={(event, selectedDate) => {
                                
                                const currentDate = selectedDate || new Date();

                                this.setState({hideText: true, showDate: Platform.OS === 'ios'});

                                this.setState({date: currentDate});

                                    
                            }}
                        />
                    )}

                    {this.state.showTime && (
                        <DateTimePicker
                            testID="TimePicker"
                            value={this.state.time}
                            mode={"time"}
                            is24Hour={true}
                            display="default"
                            minimumDate={new Date()}
                            onChange={(event, selectedTime) => {
                                
                                const currentTime = selectedTime || new Date();

                                this.setState({hideTime: true, showTime: Platform.OS === 'ios'});

                                this.setState({time: currentTime})
       
                            }}
                        />
                    )}
                                
                </View>
            )
        }
    }

    requestLocationPermission = async () => {

        if (Platform.OS === 'ios') {
            this.getLocation();
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Accée à la localisation requie',
                message: "cette application à besoin d'accéder à la localisation",
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //To Check, If Permission is granted
              this.getLocation();
            } else {
              alert('Permission refusée');
            }
          } catch (err) {
            console.warn(err);
          }
        }
      };

    getLocation = async() => {

        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
          })
            .then((data) => {

            this.setState({loading3: true})

            Geolocation.getCurrentPosition(
                position => {
                    this.setState({latitude: position.coords["latitude"], longitude: position.coords["longitude"], showMap: true, loading3: false})
                },
                error =>  {
                    Alert.alert('Nous ne parvenons pas à vous localiser, veuillez réessayer'),
                    this.setState({loading3: false})
                },
                {enableHighAccuracy: false, timeout: 30000, maximumAge: 1000},
            );
            })

        .catch((err) => {
            console.log(err)
        })
        
    }

    getLocationIos = () => {

        this.setState({loading3: true})

        Geolocation.requestAuthorization()

        Geolocation.getCurrentPosition(
            position => {
                this.setState({latitude: position.coords["latitude"], longitude: position.coords["longitude"], showMap: true, loading3: false})
            },
            error =>  {
                Geolocation.getCurrentPosition(
                    position => {
                        this.setState({latitude: position.coords["latitude"], longitude: position.coords["longitude"], showMap: true, loading3: false})
                    },
                    error =>  {
                        Alert.alert('Nous ne parvenons pas à vous localiser, veuillez réessayer'),
                        this.setState({loading3: false})
                    },
                    {enableHighAccuracy: false, timeout: 30000, maximumAge: 1000},
                    );
            },
            {enableHighAccuracy: false, timeout: 30000, maximumAge: 1000},
            );
    }

    componentDidMount() {

        const {params} = this.props.route;

        this.props.navigation.setOptions({
            title: params.item.title,
            headerShown: false
        });

        RetrieveData('lang').then((lang) =>
        {
            if(lang == null){
                this.getServiceDetails(params.item.id, 'fr')
            }else{
                this.getServiceDetails(params.item.id, lang)
            }
        }
        )

        //if (Platform.OS === 'ios') {
        //    Geolocation.requestAuthorization('always');
        //  }
        
    }

    
    render() {
        const {params} = this.props.route;
        const textContext = this.context;
        const texts = textContext.texts;

        const item = params.item        

        const id = item.id
        const title = item.title
        const priceMin = params.priceMin
        const priceMax = params.priceMax

        const price = "Entre " + priceMin + "DA et " + priceMax + " DA"

        const description = this.state.productDetail.content
        const text_1 = this.state.texts.text_1
        const text_2 = this.state.texts.text_2

        
        return (

            <View style={{...base.cont, 
                ...Platform.OS === 'ios' && ({paddingTop: getStatusBarHeight()})
                }}>
                <TouchableOpacity style={{...base.backButton, ...Platform.OS === 'ios' && ({marginTop: 45})}}
                    onPress={() => this.props.navigation.goBack()} >
                    <Icon name='ios-chevron-back-outline' size={30} type='ionicon' iconStyle={base.BackIcon}
                    />
                </TouchableOpacity>

                <ScrollView>

                    <View style={{zIndex:0}}>
                        
                        <Carousel data = {this.state.servicesimages} style={carousel.card2}/>

                    </View>

                    <View style={{padding:20}} >
                        <Text style={detail.title}>{title}</Text>
                        {this.getPrice(priceMin,priceMax)}

                        <View>

                            <View style={(textContext.lang == 'ar') ? ({flexDirection:'column',alignItems: 'flex-end',marginTop: 20,...detail.box, padding:10}) : ({marginTop: 20,...detail.box, padding:10})}>

                                <Text style={detail.title}>{texts.text14}</Text>

                                <Input
                                    value={this.state.nom}
                                    placeholder={texts.text15}
                                    onChangeText={(text) => this.setState({nom: text})}
                                    style={(textContext.lang == 'ar')? ({textAlign: 'right'}):({textAlign: 'left'})}
                                />

                                <Input
                                    value={this.state.prenom}
                                    placeholder={texts.text16}
                                    onChangeText={(text) => this.setState({prenom: text})}
                                    style={(textContext.lang == 'ar')? ({textAlign: 'right'}):({textAlign: 'left'})}
                                />

                                <Input
                                    value={this.state.adresse}
                                    placeholder={texts.text17}
                                    onChangeText={(text) => this.setState({adresse: text})}
                                    style={(textContext.lang == 'ar')? ({textAlign: 'right'}):({textAlign: 'left'})}
                                />

                                <Text style={homeStyle.h3}>{texts.text39}</Text>

                                <Button
                                    title={texts.text40}
                                    buttonStyle={{...base.button, width: '100%', marginTop: 5, marginBottom: 15}}
                                    titleStyle={{color:color2}}
                                    onPress={(Platform.OS === 'ios')?(this.getLocationIos):(this.getLocation)}
                                    loading = {this.state.loading3}
                                />

                                {this.state.showMap && (
                                    <View style={{marginBottom: 20, width: "100%"}}>
                                        <Text style={{marginVertical:10}}>{this.state.latitude + " , " + this.state.longitude}</Text>

                                        <MapView
                                            provider={PROVIDER_GOOGLE} 
                                            style={{height: 300, width: "100%"}}
                                            region={{
                                                latitude: this.state.latitude,
                                                longitude: this.state.longitude,
                                                latitudeDelta: 0.015,
                                                longitudeDelta: 0.0121,
                                            }}
                                        >
                                            <MapView.Marker
                                                coordinate={{latitude: this.state.latitude,
                                                longitude: this.state.longitude}}
                                                />
                                        </MapView>
                                    </View>
                                )}


                                <Input
                                    value={this.state.tel}
                                    placeholder={texts.text18}
                                    onChangeText={(text) => this.setState({tel: text})}
                                    style={(textContext.lang == 'ar')? ({textAlign: 'right'}):({textAlign: 'left'})}
                                />

                                <Input
                                    value={this.state.email}
                                    placeholder={texts.text19}
                                    onChangeText={(text) => this.setState({email: text})}
                                    style={(textContext.lang == 'ar')? ({textAlign: 'right'}):({textAlign: 'left'})}
                                />

                                <Input  
                                    value={this.state.description}
                                    placeholder={texts.text37}
                                    onChangeText={(text) => this.setState({description: text})}
                                    style={(textContext.lang == 'ar')? ({textAlign: 'right', height:100, alignItems:"flex-start", textAlignVertical: "top"}):({textAlign: 'left', height:100, alignItems:"flex-start", textAlignVertical: "top"})}
                                />

                                <Text style={homeStyle.h3}>{texts.text20}</Text>

                                <CheckBox
                                    title={texts.text21}
                                    checkedIcon={<Icon name= "ios-radio-button-on" type='ionicon' size= {25} color= {color3} style={{marginRight:5}}/>}
                                    uncheckedIcon={<Icon name= "ios-radio-button-off" type='ionicon' size= {25} color= {color4} style={{marginRight:5}}/>}
                                    checked={this.state.checkedU}
                                    onPress={() => this.setState({checkedU: !this.state.checked, checkedR: false, intervention : '1', dateShow: false})}
                                />

                                <CheckBox
                                    
                                    title={texts.text22}
                                    checkedIcon={<Icon name= "ios-radio-button-on" type='ionicon' size= {25} color= {color3} style={{marginRight:5}}/>}
                                    uncheckedIcon={<Icon name= "ios-radio-button-off" type='ionicon' size= {25} color= {color4} style={{marginRight:5}}/>}
                                    checked={this.state.checkedR}
                                    onPress={() => this.setState({checkedR: !this.state.checked, checkedU: false, intervention : '2', dateShow: true})}
                                />

                                {this.renderDate()}

                                <Divider style={{ backgroundColor: color4, marginVertical: 20 }} />

                                <Button
                                    title={texts.text27}
                                    buttonStyle={{...base.button, width: '100%'}}
                                    titleStyle={{color:color2}}
                                    onPress={()=> {this.commander(title, id,price)}}
                                    loading = {this.state.loading2}
                                />

                            </View>

                            <View style={detail.desc}>

                                {this.getDescription(description)}

                            </View>

                        </View>


                        <View style={detail.infos}>

                            <View style={(textContext.lang == 'ar') ? ({...base.flexEnd,alignItems:"center"}):({...base.flexStart,alignItems:"center"})}>
                                <Icon name= "ios-construct-outline" type='ionicon' size= {25} color= {color2} style={{marginRight:5}}/>
                                <Text style={(textContext.lang == 'ar') ? ({textAlign: 'right'}) : ({textAlign: 'left'})}>{texts.text25}</Text>
                            </View>

                            <Text style={(textContext.lang == 'ar') ? ({textAlign: 'right', ...detail.boxP}) : ({textAlign: 'left', ...detail.boxP})}>{text_1}</Text>

                            <View style={(textContext.lang == 'ar') ? ({...base.flexEnd,alignItems:"center"}):({...base.flexStart,alignItems:"center"})}>
                                <Icon name= "ios-card-outline" type='ionicon' size= {25} color= {color2} style={{marginRight:5}}/>
                                <Text style={(textContext.lang == 'ar') ? ({textAlign: 'right'}) : ({textAlign: 'left'})}>{texts.text26}</Text>
                            </View>

                            <Text style={(textContext.lang == 'ar') ? ({textAlign: 'right', ...detail.boxP}) : ({textAlign: 'left', ...detail.boxP})}>{text_2}</Text>


                        </View>

                    </View> 
                    
                </ScrollView>

            </View>
        );
  }

}
export default ServiceItemDetail;
