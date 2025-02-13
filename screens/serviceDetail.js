import React, {Component} from 'react';
import { View, Text,SafeAreaView,TouchableOpacity,FlatList,ActivityIndicator} from 'react-native';
import {homeStyle, base,detailStyle} from '../assets/styles';
import { Icon, Tile } from 'react-native-elements';
import {color3} from "../constants/colors";
import {WEBROOT, LOGIN, TOKEN} from "../constants/general";
import {Service, checkNetwork, networkAlert} from '../components/components'
import {Context} from '../components/context'
import { RetrieveData} from '../components/api'

class ServiceDetail  extends Component{

    static contextType = Context;

    constructor(props){
        super(props);
        this.state= {
            servicesItems: [],
            loading: true,
            refresh: false,
            network: true
            
        }

    }

    networkStatut = () =>{
        console.log('network statut')
        const {params} = this.props.route;

        checkNetwork().then(st => {
          this.setState({network: st})
        }).then( st =>{
            if(this.state.network == false){
                networkAlert(this.networkStatut, this.getServices(params.id))
            }
        }
        )      
    }


    getServices = async(id, lang) =>{

        //this.networkStatut()

        await fetch(WEBROOT+"servicesByCategory",{
            method : 'post',
            header : {
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            },
            body:JSON.stringify({
                login : LOGIN,
                token : TOKEN,
                categorie : id,
                lang: lang
            })
            }) 
            .then((response) => response.json())
            .then((responseJson) =>{

                if(responseJson.success == true){

                    this.setState({
                        loading : false,
                        refresh : false,
                        servicesItems: responseJson.data
                    })

                }else{
                    alert('error')
                }                

            })
            .catch((error) => {console.error(error);});
  
    }

    getServicesByParent = async(id, lang) =>{

        //this.networkStatut()

        await fetch(WEBROOT+"servicesByParent",{
            method : 'post',
            header : {
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            },
            body:JSON.stringify({
                login : LOGIN,
                token : TOKEN,
                parent_id : id,
                lang: lang
            })
            }) 
            .then((response) => response.json())
            .then((responseJson) =>{

                if(responseJson.success == true){

                    this.setState({
                        loading : false,
                        refresh : false,
                        servicesItems: responseJson.data
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

    renderNoData () {

        const servicesItems = this.state.servicesItems
        
        if(this.state.loading == false){
            if (servicesItems.length === 0){
                return(
                    
                    <View style={{alignItems:"center", padding:30}}>
                        <Icon name= "ios-basket" type='ionicon' size= {70} color= {color3} />
                        <Text style={{...homeStyle.h1, textAlign:"center"}}>Aucun service</Text>
                    </View>
                )
            }
        }
    }

    
    componentDidMount() {

        const {params} = this.props.route;

        this.props.navigation.setOptions({
            title: params.title,
            headerShown: false
        });

        if (params.statut == 1) {

            RetrieveData('lang').then((lang) =>
            {
                if(lang == null){
                    this.getServices(params.id, 'fr')
                }else{
                    this.getServices(params.id, lang)
                }
            }
            )

        }else{

            RetrieveData('lang').then((lang) =>
            {
                if(lang == null){
                    this.getServicesByParent(params.id, 'fr')
                }else{
                    this.getServicesByParent(params.id, lang)
                }
            }
            )
           
        }
  

    }
    
    render() {
        const {params} = this.props.route;
        const {navigate} = this.props.navigation;
        const rootParent = params.rootParent

        const title = params.name
        const img = params.img


        return (

            <SafeAreaView  style={base.cont}>

                <FlatList
                    ListHeaderComponent={
                        <View style={{marginBottom:20}}>
                            
                            <View style={{zIndex:0}}>
                            
                                <Tile
                                    imageSrc={{uri: img}}
                                    title={title}
                                    featured
                                    height={250}
                                    titleStyle={detailStyle.TileTitle}
                                    activeOpacity={1}
                                />
                            </View>

                            <TouchableOpacity style={base.backButton}
                                onPress={() => this.props.navigation.goBack()} >
                                <Icon name='ios-chevron-back-outline' size={30} type='ionicon' iconStyle={base.BackIcon}
                                />
                            </TouchableOpacity>

                        </View>
                    }

                    onEndReachedThreshold={200}
                    data={this.state.servicesItems}
                    onRefresh={() => {this.setState({refresh: true}),
                    (params.statut == 1) ? (
                        this.getServices(params.id)
                    ):(
                        this.getServicesByParent(params.id)
                    )}}
                    refreshing={this.state.refresh}
                
                    renderItem={({item})=>
                    {
                        return <Service navigation={this.props.navigation} navigate={navigate} item={item} rootParent={rootParent} priceMin={item.price_min} priceMax={item.price_max} />
                    }
                    }
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={
                        <View>
                            
                            {this.renderLoading()}
                            {this.renderNoData()}

                        </View>
                    }

                    /> 

            </SafeAreaView >
        );
  }

}
export default ServiceDetail;
