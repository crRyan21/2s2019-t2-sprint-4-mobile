import React, { Component, Fragment} from 'react';
import {View, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';

class App extends Component {
  constructor() {
    super();
    this.state = {
      medicos: [],
    };
  }

  componentDidMount() {
    this._carregarMedicos();
  }

  _carregarMedicos = async () => {
    await fetch('http://192.168.4.183:5000/api/medicos')
      .then(resposta => resposta.json())
      .then(data => this.setState({ medicos: data }))
      .catch(erro => console.warn(erro));
  };
  render() {
    return (
      <Fragment>
       
      <Text>Médicos</Text>
      <FlatList
        data={this.state.medicos}
        keyExtractor={item => item.idMedico}
        renderItem={({item}) => (
          <View>
            <Text></Text>
            <Text>ID: {item.idMedico}</Text>
            <Text>Nome: {item.nome}</Text>
            <Text>Data de Nascimento: {item.dataNascimento}</Text>
            <Text>CRM: {item.crm}</Text>
            <Text>Especialidade: {item.especialidade}</Text>
            <Text>Satus: {item.status}</Text>
            <Text></Text>
          </View>
        )}
        
        />
        </Fragment>
    );
  };
}

export default App;