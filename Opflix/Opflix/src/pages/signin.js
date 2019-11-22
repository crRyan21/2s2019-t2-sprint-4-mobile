import React, {Component,Fragment} from 'react';

import {Text, TextInput, View, TouchableOpacity, AsyncStorage,StyleSheet,Image,ImageBackground,} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Fundo from './../assets/base/background.jpg';

class SignIn extends Component{

    static navigationOptions = {
        header: null,
      };
    
    constructor() {
        super();
        this.state = {
            email: 'paolo@mail.com',
            senha: '321'
        }
    }

    _realizarLogin = async () => {
        fetch('http://192.168.4.183:5000/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                senha: this.state.senha
            })
        })
            .then(resposta => resposta.json())
            .then(data => this._irParaHome(data.token))
            .catch(erro => console.warn('ocorreu um erro' + erro))
        }
        
    _irParaHome = async (tokenRecebido) => {
        if(tokenRecebido != null) {
            try {
                await AsyncStorage.setItem('opflix-token', tokenRecebido);
                this.props.navigation.navigate('MainNavigator')
            } catch (error) {
                console.warn('ocorreu um erro' + erro);
            }
        }
    }
    

    render () {
        return(
            <View >
                <ImageBackground source={Fundo} style={{height:"100%", width:"100%" }} >
                <View  style={styles.topo}>
                <Image
                source={require('../assets/base/logoMobile.png')}
                style={styles.logo}
                />
                </View>
                {/* <Text style={styles.LoginH2}>Faça seu login</Text> */}
                <View style={styles.form} >
                
                  <TextInput style={styles.corInput} placeholder="Email"  placeholderTextColor='black' onChangeText={email => this.setState({email})}/>
                <TextInput style={styles.corInputSenha} placeholder="Senha"  placeholderTextColor='black' onChangeText={senha => this.setState({senha})}/>
                <TouchableOpacity style={styles.bottom} onPress={this._realizarLogin}> 
                    <Text style={styles.textBottom} >Login</Text>
                </TouchableOpacity>
                </View>  
                </ImageBackground>
            </View> 
        )
    }
}
const styles = StyleSheet.create({
    corpo:{
        backgroundColor: '#1E112a',
        position:'relative',
        // bottom:30
    },
    topo:{
      backgroundColor: '#341e49',
    //   display:'flex',
    //   alignItems:'center',
      height: 60,
      position:'relative',
    //   top: -200,
    //   height:100
    },
    logo:{
      position: 'relative',
      bottom: 30,
    },
    LoginH2:{
        fontSize:20,
        color:"white",
        textAlign:'center'
    },  
    corInput:{
    //  color:'white',
    //  fontSize:15,
    backgroundColor:'white',
    height:40,
    width:"70%",
    fontSize:15,
    position: 'relative',
    borderRadius:5
    
    },
    corInputSenha:{
    //  color:'white',
    //  fontSize:15,
    backgroundColor:'white',
    height:40,
    width:"70%",
    fontSize:15,
    position: 'relative',
    // left:20,
    top:20,
    borderRadius:5

    },
    form:{
        position:'relative',
        top:50,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    bottom:{
   
      display:"flex",
      alignItems:'center',
      justifyContent: 'center',
      textAlign:"center",
      position:'relative',
      marginTop:30,
      backgroundColor: '#341e49',
      width:50,
      height:25,
      borderRadius:5
    },
    
    textBottom:{
        textAlign:'center',
        color:'white'
        
    }
})

export default SignIn