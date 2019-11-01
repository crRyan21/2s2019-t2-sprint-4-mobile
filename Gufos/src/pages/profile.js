import React, {Component} from 'react';
import {Text,AsyncStorage,View} from 'react-native';

class Profile extends Component {
    
    // static navigationOption = {
    //   // header: null,
    // }

    constructor(){
      super();
      this.state ={
        token: ''
      }
    }

    //quando eu abrir o meu profile,
    //eu quero buscar os dados do asyncStorage
    componentDidMount(){
      this._buscarDadosDoStorage();
    }

    _buscarDadosDoStorage = async() =>{
      try{
        const tokenDoStorage = await AsyncStorage.getItem('@gufos:token');
        if(tokenDoStorage != null){
            this.setState({ token: tokenDoStorage })
        }
      }catch(error){

      }
    }

  render() {
    return(
    <View>
      <Text>{this.state.token}</Text>
    </View>
    );
  }
}

export default Profile;
