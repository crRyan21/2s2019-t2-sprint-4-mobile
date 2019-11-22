import React, {Component,Fragment} from 'react';
import {Text, View, Image, StyleSheet,TouchableHighlight} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
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
      Lancamentos: [],
    };
  }

  componentDidMount() {
    this._carregarCategorias();
  }

  _carregarCategorias = async () => {
    await fetch('http://192.168.4.183:5000/api/lancamentos')
      .then(resposta => resposta.json())
      .then(data => this.setState({categorias: data}))
      .catch(erro => console.warn(erro));
  };

  render() {
    return (
      
        <Fragment >
      <View  style={styles.topo}>
        <Image
        source={require('../assets/base/logoMobile.png')}
        style={styles.logo}
      /></View>  
      <FlatList style={styles.corpo}
        data={this.state.categorias}
        keyExtractor={item => item.idCategoria}
        renderItem={({item}) => (
          <View style={styles.filmes_lancamento}>
            <View  >
            <View style={styles.filmes_nome_width} ><Text style={styles.filmes_nome}>{item.nome}</Text></View>
            
            <View  style={styles.estreia_row}><Text style={styles.filmes_categoria}>{item.idCategoriaNavigation.nome}</Text><Text style={styles.filmes_estreia}>{item.estreia}</Text></View>
            
            </View>
            <View><Text style={styles.filmes_sinopse}>{item.sinopse}</Text></View>
            <View style={styles.fimes_row}>
            <View ><Text style={styles.filmes_duracao}  >Duração: {item.duracao}</Text></View>
            <View ><Text style={styles.filmes_duracao}  >Plataforma: {item.idPlataformNavigation.nome}</Text></View>
            </View>
            <View style={styles.View_Imagem} >
            <Image
            source={{uri:item.imagem}}
            style={styles.imagem}
            />
            </View>
          </View>
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