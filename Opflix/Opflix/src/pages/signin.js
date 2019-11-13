import React, {Component,Fragment} from 'react';

import {Text, TextInput, View, TouchableOpacity, AsyncStorage,StyleSheet,Image} from 'react-native';

class SignIn extends Component{

    
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
            <Fragment >
                <View  style={styles.topo}>
                <Image
                source={require('../assets/base/logoMobile.png')}
                style={styles.logo}
                />
                </View>  
                
                <TextInput placeholder="email" onChangeText={email => this.setState({email})}/>
                <TextInput placeholder="senha" onChangeText={senha => this.setState({senha})}/>
                <TouchableOpacity onPress={this._realizarLogin}>
                    <Text>Login</Text>
                </TouchableOpacity>

            </Fragment> 
        )
    }
}
const styles = StyleSheet.create({
    corpo:{
        backgroundColor: '#1E112a'
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
    }
})

export default SignIn