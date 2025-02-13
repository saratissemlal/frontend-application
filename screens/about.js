import React, {Component} from 'react';
import { View, Text,ScrollView } from 'react-native';
import {homeStyle, base} from '../assets/styles';
import {color5} from '../constants/colors';
import {appName} from '../constants/texts';
import {renderLoading} from '../components/components'
import { RetrieveData} from '../components/api';
import {WEBROOT, LOGIN, TOKEN} from "../constants/general";
import { Context } from '../components/context';


class About  extends Component{

    constructor(props){
        super(props);
        this.state= {

            loading: false,
            aboutDetail: []

        }
    }

    static contextType = Context;


    getAboutDetails = async(lang) =>{

        await fetch(WEBROOT+"about",{
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
                        loading : false,
                        aboutDetail: responseJson
                    })

                }else{
                    alert('error')
                }                

            })
            .catch((error) => {console.error(error);});
  
    }

    componentDidMount() {

        RetrieveData('lang').then((lang) =>
        {
            if(lang == null){
                this.getAboutDetails('fr')
            }else{
                this.getAboutDetails(lang)
            }
        }
        )
        
    }

    render() {

        const textContext = this.context;
        const texts = textContext.texts;

        return (

            <ScrollView style={{...base.cont, padding:20}}>

                <View style={{...homeStyle.box2, backgroundColor: color5, marginBottom:40}}>       

                    <Text style={(textContext.lang == 'ar') ? ({...homeStyle.h2, marginBottom:20, textAlign: 'right'}) : ({...homeStyle.h2, marginBottom:20})}>{texts.text29}</Text>

                </View>

                
                {
                    (this.state.loading) ? (renderLoading())
                    :
                    (

                        <View style={(textContext.lang == 'ar')? ({paddingBottom: 30}) :({paddingBottom: 30})}>

                            <Text style={(textContext.lang == 'ar')? ({marginBottom:15, fontSize:22, fontWeight: 'bold', textAlign: 'right'}) :({marginBottom:15, fontSize:22, fontWeight: 'bold'})}>{this.state.aboutDetail.text_1}</Text>
                            <Text style={(textContext.lang == 'ar')? ({marginBottom:15, fontSize:16, textAlign: 'right'}) :({marginBottom:15, fontSize:16})}>{this.state.aboutDetail.text_2}</Text>
                            <Text style={(textContext.lang == 'ar')? ({marginBottom:15, fontSize:16, textAlign: 'right'}) :({marginBottom:15, fontSize:16})}>{this.state.aboutDetail.text_3}</Text>
                            <Text style={(textContext.lang == 'ar')? ({marginBottom:15, fontSize:22, fontWeight: 'bold', textAlign: 'right'}) :({marginBottom:15, fontSize:22, fontWeight: 'bold'})}>{this.state.aboutDetail.text_4}</Text>
                            <Text style={(textContext.lang == 'ar')? ({marginBottom:15, fontSize:16, textAlign: 'right'}) :({marginBottom:15, fontSize:16})}>{this.state.aboutDetail.text_5}</Text>
                            <Text style={(textContext.lang == 'ar')? ({marginBottom:15, fontSize:16, textAlign: 'right'}) :({marginBottom:15, fontSize:16})}>{this.state.aboutDetail.text_6}</Text>
                            <Text style={(textContext.lang == 'ar')? ({marginBottom:15, fontSize:16, textAlign: 'right'}) :({marginBottom:15, fontSize:16})}>{this.state.aboutDetail.text_7}</Text>
                            
                        </View>

                    )
                }

                
            </ScrollView>
        );
  }

}
export default About;
