import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

class Categorias extends Component {
  // apresentar a lista de eventos

  static navigationOptions = {
    tabBarIcon: () => (
      <Image
        source={require('../assets/img/loginIcon.png')}
        style={styles.tabNavigatorIcon}
      />
    )
  }

  constructor() {
    super();
    this.state = {
      categorias: [],
    };
  }

  componentDidMount() {
    this._carregarCategorias();
  }

  _carregarCategorias = async () => {
    await fetch('http://192.168.7.85:5000/api/categorias')
      .then(resposta => resposta.json())
      .then(data => this.setState({categorias: data}))
      .catch(erro => console.warn(erro));
  };

  render() {
    return (
      <FlatList
        data={this.state.categorias}
        keyExtractor={item => item.idCategoria}
        renderItem={({item}) => (
          <View>
            <Text>{item.nome}</Text>
          </View>
        )}
        
      />
    );
  }
}

const styles = StyleSheet.create({
  tabNavigatorIcon: {width: 25, height: 25, tintColor: 'white'}
})

export default Categorias;