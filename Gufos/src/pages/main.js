import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

class Main extends Component {
  // apresentar a lista de eventos

  static navigationOptions = {
    tabBarIcon: () => (
      <Image
        source={require('../assets/img/calendar.png')}
        style={styles.tabNavigatorIcon}
      />
    )
  }

  constructor() {
    super();
    this.state = {
      eventos: [],
      categorias: [],
    };
  }

  componentDidMount() {
    this._carregarEventos();
  }
  // componentWillMount(){
  //   this._carregarCategorias();
  // }

  _carregarEventos = async () => {
    await fetch('http://192.168.7.85:5000/api/eventos')
      .then(resposta => resposta.json())
      .then(data => this.setState({eventos: data}))
      .catch(erro => console.warn(erro));
  };
  _carregarCategorias = async () => {
    await fetch('http://192.168.7.85:5000/api/categorias')
      .then(resposta => resposta.json())
      .then(data => this.setState({categorias: data}))
      .catch(erro => console.warn(erro));
  };

  render() {
    return (
      <FlatList
        data={this.state.eventos}
        keyExtractor={item => item.idEvento}
        renderItem={({item}) => (
          <View>
            <Text>{item.titulo}</Text>
            <Text>{item.dataEvento}</Text>
            <Text>{item.descricao}</Text>
            <Text>{item.localizacao}</Text>
          </View>
        )}
        
      />
    );
  }
}

const styles = StyleSheet.create({
  tabNavigatorIcon: {width: 25, height: 25, tintColor: 'white'}
})

export default Main;