import React from 'react';
import { View,  SafeAreaView, FlatList } from 'react-native';

import { SearchBar, Icon } from 'react-native-elements';
import {color1, color5, color4} from "../constants/colors";

import { base} from '../assets/styles'

import {WEBROOT, LOGIN, TOKEN} from "../constants/general";
import {Context} from '../components/context'
import { renderLoading, Service, networkAlert, checkNetwork } from '../components/components'
import { RetrieveData} from '../components/api'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        login : false,
        loading : true,
        load: false,
        search : '',
        servicesItems: [],
        services: [],
        network: true
        }

    }

    static contextType = Context;

    /*networkStatut = () =>{
        checkNetwork().then(st => {
          this.setState({network: st})
        }).then( st =>{
            if(this.state.network == false){
                networkAlert(this.networkStatut, this.getServices)
            }
        }
        )      
    }*/

    getServices = async(lang) =>{

        //this.networkStatut()

        await fetch(WEBROOT+"search",{
            method : 'post',
            header : {
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            },
            body:JSON.stringify({
                login : LOGIN,
                token : TOKEN,
                lang: lang
            })
            }) 
            .then((response) => response.json())
            .then((responseJson) =>{

                if(responseJson.success == true){

                    this.setState({
                        loading: false,
                        servicesItems: responseJson.data,
                        services: responseJson.data,
                                               
                    })

                }else{
                    alert('error')
                }                

            })
            .catch((error) => {console.error(error);});

    }

    handleSearch (search, cancel){

        this.state.servicesItems = this.state.services

        const newData = this.state.servicesItems.filter(item => {
            if(cancel){

                return this.state.services

            }else{
                const itemData = item.title.toUpperCase();
                const textData = search.toUpperCase();
                return itemData.indexOf(textData) > -1
            }
          });
          
          this.setState({
            servicesItems : newData,
            search: search
            })
        
    }


    componentDidMount(){

        RetrieveData('lang').then((lang) =>
        {
            if(lang == null){
                this.getServices('fr')
            }else{
                this.getServices(lang)
            }
        }
        )
    
    }    

  render(){

    const {navigate} = this.props.navigation
    const textContext = this.context;
    const texts = textContext.texts;

    return(
        
        <SafeAreaView  style={base.cont}>

            <View style={{marginBottom:15}}>
                <SearchBar
                    placeholder={texts.text10}
                    onChangeText={(search) =>{ this.setState({load: true}), this.handleSearch(search, false)}}
                    onClear={(search) => {this.setState({load: true}), this.handleSearch(search, true)}}
                    value={this.state.search}
                    round
                    searchIcon={<Icon name= "ios-search-outline" type='ionicon' size= {24} color= {color4} style={{marginRight:10}}/>}
                    lightTheme
                    showLoading = {this.state.load}
                    showCancel= {true}
                    clearIcon={false}
                    inputContainerStyle={(textContext.lang == 'ar') ? ({flexDirection:'row-reverse',backgroundColor:color5}) : ({backgroundColor:color5})}
                    containerStyle={{backgroundColor:color1}}
                />   
            </View> 

            <FlatList
                
                keyExtractor={item => item.id}
                onEndReachedThreshold={200}
                data={this.state.servicesItems}

                renderItem={({item})=>
            
                <Service navigation={this.props.navigation} navigate={navigate} item={item}
                            rootParent={'search'} priceMin={item.price_min} priceMax={item.price_max} />
                }
                    
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <View>
                        
                        {renderLoading(this.state.loading)}

                    </View>
                }

                />
            
        </SafeAreaView >
        )
  }
  }

  export default Search;