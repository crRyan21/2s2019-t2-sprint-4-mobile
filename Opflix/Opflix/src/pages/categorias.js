import React, {Component,Fragment} from 'react';
import {Text, View, Image, StyleSheet,Button,AsyncStorage,Picker,TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
// import { DrawerNavigator } from 'react-navigation'; 

// import Img from 'react-image'


class Categorias extends Component{

  static navigationOptions = {
    tabBarIcon: () => (
      <Image
        source={require('../assets/base/iconeFilme.png')}
        style={styles.tabNavigatorIcon}
      />
    )
  }

  constructor(props){
      super(props);
      this.state = {
          lancamentos: [
              // {idLancamento: 1, titulo: 'filme 1', sinopse: 'sinopse filme 1', dataLancamento: '2019-11-11T00:00.000', genero: 'nb', categoria: 'gay', plataforma: '15 ou mais'}
          ],
          categoriaEscolhida: null,
          categorias: []   
      }
  }

  componentDidMount(){
      this._carregarLancamentos();
      this._carregarPlataformas();
  }

  _carregarLancamentos = async () =>{
      await fetch('http://192.168.4.183:5000/api/lancamentos/listar/categoria/' + this.state.categoriaEscolhida, {
          headers:{
              "Accept": "application/json",
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + await AsyncStorage.getItem("opflix-token")
          },
      })
        .then(resposta => resposta.json())
        .then(data => this.setState({lancamentos: data}))
        .catch(erro => console.warn(erro))
  }
  _carregarPlataformas = async () => {
      await fetch('http://192.168.4.183:5000/api/categorias', {
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + await AsyncStorage.getItem("opflix-token")
      }
      })
        .then(resposta => resposta.json())
        .then(data => this.setState({categorias: data}))
        .catch(erro => console.warn(erro));
    };

  render() {
      return (
          <Fragment>
              <View  >
                  <Text>Filtrar lançamentos por categoria</Text>
                  <Picker selectedValue={this.state.categoriaEscolhida} onValueChange={(itemValue) => this.setState({categoriaEscolhida: itemValue})}>
                      <Picker.Item label="Escolha a plataforma:" value="0" selectedValue style={styles.filmes_sinopse}/>
                          {this.state.categorias.map(e => {
                              return( <Picker.Item label={e.nome} value={e.idCategoria}  />
                                  )})}
                  </Picker>
                  <TouchableOpacity onPress={this._carregarLancamentos}>
                      <Text>Buscar</Text>
                  </TouchableOpacity>
                  <FlatList style={styles.corpo}
                      data={this.state.lancamentos}
                      keyExtractor={item => item.idLancamento}
                      renderItem={({ item }) => (
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
              </View>
          </Fragment>
      )
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
    width:200,
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

export default Categorias;
