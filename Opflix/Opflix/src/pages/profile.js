import React, {Component,Fragment} from 'react';
import {Text, View, Image, StyleSheet,TouchableHighlight,AsyncStorage} from 'react-native';
import {FlatList,ScrollView} from 'react-native-gesture-handler';
import { DrawerNavigator } from 'react-navigation'; 

// import Img from 'react-image'


class Lancamentos extends Component {
  // apresentar a lista de eventos

  static navigationOptions = {
    tabBarIcon: () => (
      <Image
        source={require('../assets/base/iconeFilme.png')}
        style={styles.tabNavigatorIcon}
      />
    )
  }

  constructor() {
    super();
    this.state = {
      usuarios: [
        // {
        //     // nome:'ryan'
        // }
      ],
    };
  }

  componentDidMount() {
    this._carregarCategorias();
    console.warn(AsyncStorage.getItem('roman-token'));

  }

  _carregarCategorias = async () => {
    try{
        let token = await AsyncStorage.getItem('opflix-token');
        console.warn(token)
    
    await fetch('http://192.168.4.183:5000/api/usuarios',{
        method:'GET',
        headers:{
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        }
    })
      .then(resposta => resposta.json())
      .then(data => this.setState({usuarios: data}))
      .catch(erro => console.warn(erro));
    }catch(error){

    }
  };


  render() {
    return (
      
        <Fragment style={styles.corpo}>
      <View  style={styles.topo}>
        <Image
        source={require('../assets/base/logoMobile.png')}
        style={styles.logo}
      />
      </View>  
      <FlatList style={styles.corpo}
        data={this.state.usuarios}
        keyExtractor={item => item.idUsuario}
        renderItem={({item}) => (
          
              <Text style={styles.filmes_nome}>{item.nome}</Text>
          
        )}
        
      />
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
    corpo:{
        backgroundColor: '#1E112a'
    },
    filmes_lancamento:{
        marginBottom:30,
        position:'relative',
        top: 40

    },
    filmes_nome_width:{
      width:190,
      marginLeft:10
    },
    filmes_nome:{
        color:'white',
        fontSize: 18,
        // textAlign: 'justify'
        // marginRight:50
    },
    filmes_categoria:{
      marginRight: 20,
      color: '#A9A9A9',
      fontSize: 15,
    },  
    filmes_sinopse:{
      color: '#A9A9A9',
      fontSize: 18
    },
    fimes_row:{
      display:'flex',
      flexDirection:'row',
      justifyContent: 'flex-end',
      position: 'relative',
      right:20
    },
    // fimes_row1:{
    //   display:'flex',
    //   flexDirection:'row',
    // },
    filmes_duracao:{
      color: '#A9A9A9',
      fontSize: 12,
      position:'relative',
      top:10,
      marginBottom:20,
      marginLeft: 20
    },
    filmes_estreia:{
      color: '#A9A9A9',
      fontSize: 15,
      position:'relative',
    },
    estreia_row:{
      display:'flex',
      flexDirection:'row',
      justifyContent: 'flex-end',
      position: 'relative',
      right:20,
      bottom: 23
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
    View_Imagem:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    },
    imagem:{
      height: 300,
      width:200,
      
    },
    tabNavigatorIcon:{ 
      width: 25,
      height: 25, 
      // tintColor: 'white'
    }
    

})

export default Lancamentos;