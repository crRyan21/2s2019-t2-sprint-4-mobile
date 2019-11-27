import React, { Component, Fragment } from 'react';
import { Text, View, Image, StyleSheet, TouchableHighlight, AsyncStorage } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { DrawerNavigator } from 'react-navigation';
import jwt from 'jwt-decode'


// import Img from 'react-image'


class Lancamentos extends Component {
  // apresentar a lista de eventos

  static navigationOptions = {
    tabBarIcon: () => (
      <Image
        source={require('../assets/base/iconePerfil.png')}
        style={styles.tabNavigatorIcon}
      />
    )
  }

  constructor() {
    super();
    this.state = {
      unique_name: '',
      imagem: '',
      telefone: '',
      email:'',
      permissao:''
    };
  }

  componentDidMount() {
    this._carregarPermissao();
    this._carregarTelefone();
    this._carregarEmail();
    this._carregarImagem();
    this._carregarNome();
    console.warn(AsyncStorage.getItem('opflix-token'));
  }

  _carregarNome = async () => {
    this.setState({ unique_name: jwt(await AsyncStorage.getItem('opflix-token')).unique_name })
  }
  _carregarImagem = async () => {
    this.setState({ imagem: jwt(await AsyncStorage.getItem('opflix-token')).gender })
  }
  _carregarEmail = async () => {
    this.setState({ email: jwt(await AsyncStorage.getItem('opflix-token')).email })
  }
  _carregarTelefone = async () => {
    this.setState({ telefone: jwt(await AsyncStorage.getItem('opflix-token')).sub })
  }
  _carregarPermissao = async () => {
    this.setState({ permissao: jwt(await AsyncStorage.getItem('opflix-token')).prn })
  }


  render() {
    return (
      <ScrollView style={styles.corpo}>
        <View style={styles.topo}>
          <Image
            source={require('../assets/base/logoMobile.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.infos} >

          <View style={styles.Viewimagem} >
          <Image
            source={{uri:this.state.imagem}}
            style={styles.fotoPerfil}
            />
          </View>

          <View >
          <Text style={styles.Nome} >
            {this.state.unique_name}
          </Text>
          </View>

          <View style={styles.dados} >
            <Text style={styles.dadosText}>Email: {this.state.email}</Text>
          </View>

          <View style={styles.dados} >
            <Text style={styles.dadosText}>Telefone: {this.state.telefone}</Text>
          </View>

          <View style={styles.dados} >
            <Text style={styles.dadosText}>Permissão: {this.state.permissao}</Text>
          </View>

          </View>
      </ScrollView>
    );

  }
}
const styles = StyleSheet.create({
  corpo: {
    backgroundColor: '#1E112a'
  },
  infos:{
    marginTop:30
  },  
  dados:{
    marginLeft:20,
    marginTop:20
  },
  dadosText:{
    color:'#b4b4b4',
    fontSize:15,

  },
  Nome:{
    color:'white',
    fontSize:20,
    textAlign:'center'
  },
  Viewimagem:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    // margin:'0 auto'
  },
  tabNavigatorIcon:{ 
    width: 25,
    height: 25, 
    color: '#b4b4b4'
    // tintColor: 'white'
  },
  fotoPerfil:{
    height:130,
    width:110
  },
  topo:{
    backgroundColor: '#341e49',
    display:'flex',
    alignItems:'center',
    height: 60
  },
  logo:{
    position: 'relative',
    bottom: 30,
    // height: 65,
    // width:200,
  },

})

export default Lancamentos;