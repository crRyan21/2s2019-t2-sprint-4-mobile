import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity,AsyncStorage} from 'react-native';
// import console = require('console');

class SignIn extends Component{
    //constructor
    //state
    constructor(){
        super();
        this.state = {
            email: 'admin@admin.com',
            senha: null,
        };
    }
    
    //enviar para a api
    _realizarLogin = async () =>{
        // console.warn(this.state.email + " - " + this.state.senha);
        fetch('http://192.168.7.85:5000/api/login',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                senha: this.state.senha,
            }),
        })
        .then(resposta => resposta.json())
        .then(data => this._irParaHome(data.token))
        .catch(erro => console.warn('deu ruim' + erro));
    };
    _irParaHome = async (tokenRecebido) => {
        if(tokenRecebido != null){
            try{
                await AsyncStorage.setItem('@gufos:token',tokenRecebido);
                //redirecionar
                this.props.navigation.navigate('MainNavigator');
            }catch(error){

            }
            
        }
    }

    render(){
        return(
            // email
            // senha
            // botao
            <View>
                <TextInput placeholder="email" 
                onChangeText={email => this.setState({email})}  
                />
                <TextInput placeholder="senha" 
                onChangeText={senha => this.setState({senha})}
                />
                <TouchableOpacity onPress={this._realizarLogin}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        ); 
    }
}

export default SignIn;