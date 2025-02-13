/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component } from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createDrawerNavigator } from '@react-navigation/drawer';
 
 import {Context} from './components/context'
 import {renderTextModal, renderAppLoadingModal} from './components/components'
 import {DrawerContent} from './components/drawerContent'
 import {TabBar} from './components/tabBar'
 import {MainScreen, SearchScreen, ContactScreen, AboutScreen} from './components/screensStacks'
 import { texts } from './constants/texts';
 import { StoreData, RetrieveData, ClearValue } from './components/api';
 import RNRestart from 'react-native-restart'

 
 /**------------------------------------------TAB------------------------------------- */
 
 

 
 /*------------------------DRAWER------------------*/
 
 const Drawer = createDrawerNavigator();
 
 
 class App  extends Component{
 
   constructor(props){
     super(props);
     this.state= {
       visible: false,
       modalText: '',
       modalVisible: false,
       item: [],
       language: 'fr',
       lang: '',
       texts: [],
       refresh: false,
       isMounted: true,
       loadingApp: true
   }
   }
   
   setLoadingAppFalse = () => {
    this.setState({loadingApp: false})
    }

   closeModal = () => {
     this.setState({visible: false})
   }
 
   setModalVisible = (text, time = 3000) =>{
 
     this.setState({modalText:text});
     this.setState({visible:true});
 
     setTimeout(() => {
       this.setState({visible:false});
   }, time)
                     
  }

  setRefresh = (el) => {
     this.setState({refresh: el})
   }

  setLanguage = (el) => {

    ClearValue('lang').then(() => StoreData('lang', el)).then(
      () => RNRestart.Restart())

  }

  setTexts = () => {

      RetrieveData('lang').then((lang) => this.setState({lang: lang},
      () => {
        
        if(this.state.lang == 'ar'){
    
          this.setState({texts: texts.AR})
    
        }else{
    
          this.setState({texts: texts.FR})
    
        }

      }));

      this.setState({isMounted: false})

  }
  
  componentDidMount(){

    if (this.state.isMounted == true){
      this.setTexts()
    }
    
  }

  componentWillUnmount() {
    this.setState({isMounted: false})
  }

  render(){
 
     return (
 
       <Context.Provider value={{setModalVisible: this.setModalVisible, closeModal: this.closeModal,
        modalVisible: this.state.modalVisible, texts: this.state.texts, lang: this.state.lang,
        setTexts: this.setTexts, setLanguage: this.setLanguage, setRefresh: this.setRefresh,
        langRefresh: this.state.refresh, setLoadingAppFalse: this.setLoadingAppFalse}}>
      
            {renderTextModal(this.state.modalText, this.state.visible, this.closeModal)}

            {renderAppLoadingModal(this.state.loadingApp)}
        
            <NavigationContainer>
              
                  <Drawer.Navigator initialRouteName="TabBar" drawerContent={(props)=><DrawerContent {...props}/>}>
    
                    <Drawer.Screen name="TabBar" component={ TabBar }/>
                    <Drawer.Screen name="About" component={ AboutScreen } />
    
                  </Drawer.Navigator>
                
          </NavigationContainer>

       </Context.Provider>
     )
   }
 }
 
 export default App;