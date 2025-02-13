import React, {Component} from 'react';
import { View, Text, ActivityIndicator,FlatList,SafeAreaView, TouchableOpacity,Image} from 'react-native';
import {homeStyle, base,carousel} from '../assets/styles';
import { Button, Icon } from 'react-native-elements';
import {color3,color2} from "../constants/colors";
import {WEBROOT, LOGIN, TOKEN} from "../constants/general";
import {Context} from '../components/context'
import Carousel from '../components/carousel';
import { networkAlert, checkNetwork, checkLanguage } from '../components/components';
import { RetrieveData} from '../components/api';
import {Linking} from 'react-native'

class Home  extends Component{

    static contextType = Context;

    constructor(props){
        super(props);
        this.state= {
            categories: [],
            loading : true,
            refresh : false,
            imagesList : [],
            texts: [],
            network: true,
            langRefresh : false
        }

    }

    networkStatut = () =>{
        checkNetwork().then(st => {
          this.setState({network: st})
        }).then( st =>{
            if(this.state.network == false){
                networkAlert(this.networkStatut, this.getCategories)
            }
        }
        )      
    }
    
    getCategories = async(lang) =>{

        const context = this.context;

        this.networkStatut()
        
        await fetch(WEBROOT+"services",{
            method : 'post',
            header : {
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            },
            body:JSON.stringify({
                login : LOGIN,
                token : TOKEN,
                lang : lang
            })
            }) 
            .then((response) => response.json())
            .then((responseJson) =>{

                if(responseJson.success == true){

                    this.setState({
                        categories: responseJson.data,
                        imagesList: responseJson.images,
                        texts: responseJson.texts
                    })

                    context.setLoadingAppFalse()

                }else{

                    alert(responseJson.massage)

                }                

            })
            .catch((error) => {console.error(error);});

            this.setState({
                loading:false,
                refresh: false
            })

  
    }

    renderLoading () {
        
        if (this.state.loading == true){
            return(
                <ActivityIndicator animating color={color3} size='small' style={{marginBottom:10}}/>
            )
       }
    }

    componentDidMount(){

        RetrieveData('lang').then((lang) => 
        
        {
            if(lang == null){
                this.getCategories('fr')
            }else{
                this.getCategories(lang)
            }
        }

        )

    }

    render() {

        const {navigate} = this.props.navigation;

        const textContext = this.context;
        const texts = textContext.texts;
        
        return (

            <SafeAreaView  style={base.cont}>

                <FlatList
                    ListHeaderComponent={
                        <View style={homeStyle.container}>  

                            <Carousel data = {this.state.imagesList} style={carousel.card1}/>
                            <Text style={(textContext.lang == 'ar')? ({...homeStyle.h1, textAlign: 'right'}):(homeStyle.h1)}>{texts.text1}</Text>
                            
                        </View>
                    }
                    numColumns={2}
                    columnWrapperStyle={{justifyContent:'space-between',padding:20}}
                    onEndReachedThreshold={200}
                    data={this.state.categories}
                    refreshing={this.state.refresh}
                    onRefresh={() => {this.setState({refresh: true}), this.getCategories()}}
                    renderItem={({item})=>
                        <TouchableOpacity  style={homeStyle.serviceCard}
                        onPress={()=> navigate('ServiceDetail',{id: item.id,
                            name: item.name,
                            img: item.image,
                            statut: 1,
                            rootParent: 'home'
                        })}
                            >

                            <Image
                                source={{uri: item.image}}
                                resizeMode="cover"
                                style={homeStyle.serviceImg}
                            />
                            <Text style={homeStyle.serviceTitle}>{item.name}</Text>
                        

                        </TouchableOpacity>

                    }
                    keyExtractor={(item) =>item.id}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={
                        <View>
                            
                            {this.renderLoading()}
                                
                            <View style={homeStyle.container}>

                                <View style={(textContext.lang == 'ar')? ({...homeStyle.box, flexDirection:'column',alignItems: 'flex-end'}):(homeStyle.box)}>

                                    <Text style={homeStyle.boxH1}>{texts.text2}</Text>

                                    <View style={(textContext.lang == 'ar')? (base.flexEndRev):(base.flexStart)}>
                                        <Icon name= "ios-call" type='ionicon' size= {22} color={color3} style={{marginRight:10}}/>
                                        <Text style={{...homeStyle.siteTel, marginRight:8}}>{this.state.texts.phone}</Text>
                                    </View>
                                    
                                    <Text style={homeStyle.boxP}>{this.state.texts.about_text}</Text>
                                    
                                    <Button
                                        icon={<Icon name= "ios-call" type='ionicon' size= {20} color= {color2} style={{marginRight:10}}/>}
                                        title={texts.text3}
                                        buttonStyle={homeStyle.boxButton}
                                        titleStyle={{color:color2}}
                                        onPress={()=>Linking.openURL(`tel:${this.state.texts.phone}`)}
                                        />
                                </View>

                            </View>
                        </View>
                    }

                    />

            </SafeAreaView >
        )
  }

}
export default Home;
