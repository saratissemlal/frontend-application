import React, {Component} from 'react';
import { View, Text,ScrollView } from 'react-native';
import {homeStyle, base, auth} from '../assets/styles';
import {color5, color2} from '../constants/colors';
import { Button, Input } from 'react-native-elements';
import {WEBROOT, LOGIN, TOKEN} from "../constants/general";
import {checkNetwork, networkAlert} from '../components/components'
import { Context } from '../components/context'
import { texts } from '../constants/texts';

class Contact  extends Component{

    static contextType = Context;

    constructor(props) {
        super(props)
        this.state = {
          loading : false,
          name : '',
          numero : '',
          email: '',
          message: '',
          network: true
    
        }
      }

    /*networkStatut = () =>{
      checkNetwork().then(st => {
        this.setState({network: st})
      }).then( st =>{
          if(this.state.network == false){
              networkAlert(this.networkStatut)
          }
      }
      )      
  }*/
    
    postContact = async() =>{

      //this.networkStatut()

      const context = this.context;
      const texts = context.texts

      this.setState({loading:true})
  
      if(this.state.email == '' || this.state.message == '' || this.state.numero == '' || this.state.name == ''){

          alert(texts.text4)
          
          this.setState({loading : false})
  
        return false        
      }
  
      try{

        this.setState({loading: true})
  
        await fetch(WEBROOT+"contact",{
            method : 'post',
            header : {
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            },
            body:JSON.stringify({
              
                login : LOGIN,
                token : TOKEN,
                app_token : context.token,
                id_user : context.idUser,
                name : this.state.name,
                numero : this.state.numero,
                email : this.state.email,
                message : this.state.message
            })
            })
            .then((response) => response.json())
            .then((responseJson) =>{
  
                console.log(responseJson)
  
                if(responseJson.success == true){
                  
                  this.setState({
                    name : '',
                    numero : '',
                    email: '',
                    message: '',
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

          this.setState({loading : false}) 
    }


    render() {

      const context = this.context;
      const texts = context.texts

        return (

            <ScrollView style={{...base.cont, padding:20}}>

                <View style={{...homeStyle.box2, backgroundColor: color5}}>       

                    <Text style={(context.lang == 'ar')? ({...homeStyle.h1, marginBottom:20, textAlign: 'right'}):({...homeStyle.h1, marginBottom:20})}>{texts.text5}</Text>
                </View>

                <View style={{marginBottom:60}}>

                    <View style={(context.lang == 'ar')? ({flexDirection:'column',alignItems: 'flex-end',marginTop:20}):({marginTop:20})}>

                        <Input
                          value={this.state.name}
                          placeholder={texts.text6}
                          onChangeText={(text) => this.setState({name: text})}
                          style={(context.lang == 'ar')? ({textAlign: 'right'}):({textAlign: 'left'})}
                        />

                        <Input
                          value={this.state.email}
                          placeholder={texts.text7}
                          onChangeText={(text) => this.setState({email: text})}
                          style={(context.lang == 'ar')? ({textAlign: 'right'}):({textAlign: 'left'})}
                        />

                        <Input
                          value={this.state.numero}
                          placeholder={texts.text8}
                          onChangeText={(text) => this.setState({numero: text})}
                          style={(context.lang == 'ar')? ({textAlign: 'right'}):({textAlign: 'left'})}
                        />

                        <Input
                          value={this.state.message}
                          placeholder={texts.text9}
                          onChangeText={(text) => this.setState({message: text})}
                          style={(context.lang == 'ar')? ({textAlign: 'right',alignItems:"flex-start", textAlignVertical: "top", height: 150}):({alignItems:"flex-start", textAlignVertical: "top", height: 150})}
                          numberOfLines={7}
                          multiline={true}
                        />

                        <Button
                          title={texts.text36}
                          buttonStyle={base.button}
                          titleStyle={{color:color2}}
                          onPress={()=> {this.postContact()}}
                          loading = {this.state.loading}
                        />

                    </View>

                </View>
                
            </ScrollView>
        );
  }

}
export default Contact;
