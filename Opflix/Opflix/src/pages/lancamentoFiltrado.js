import React, {Component} from 'react';
import {Text, View, AsyncStorage, Picker, ScrollView, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
var s = require('../style');

class listarPorPlataforma extends Component{
    constructor(props){
        super(props);
        this.state = {
            lancamentos: [
                // {idLancamento: 1, titulo: 'filme 1', sinopse: 'sinopse filme 1', dataLancamento: '2019-11-11T00:00.000', genero: 'nb', categoria: 'gay', plataforma: '15 ou mais'}
            ],
            plataformaEscolhida: null,
            plataformas: []   
        }
    }

    componentDidMount(){
        this._carregarLancamentos();
        this._carregarPlataformas();
    }

    _carregarLancamentos = async () =>{
        await fetch('http://192.168.6.220:5000/api/lancamentos/listar/plataforma/' + this.state.plataformaEscolhida, {
            headers:{
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await AsyncStorage.getItem("@Opflix:token")
            },
        })
          .then(resposta => resposta.json())
          .then(data => this.setState({lancamentos: data}))
          .catch(erro => console.warn(erro))
    }
    _carregarPlataformas = async () => {
        await fetch('http://192.168.6.220:5000/api/plataformas', {
          headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + await AsyncStorage.getItem("@Opflix:token")
        }
        })
          .then(resposta => resposta.json())
          .then(data => this.setState({plataformas: data}))
          .catch(erro => console.warn(erro));
      };

    render() {
        return (
            <ScrollView style={s.fundoAzu}>
                <View>
                    <Text>Filtrar lançamentos por plataformas</Text>
                    <Picker selectedValue={this.state.plataformaEscolhida} onValueChange={(itemValue) => this.setState({plataformaEscolhida: itemValue})}>
                        <Picker.Item label="Escolha a plataforma:" value="0" selectedValue/>
                            {this.state.plataformas.map(e => {
                                return( <Picker.Item label={e.nome} value={e.nome}/>
                                    )})}
                    </Picker>
                    <TouchableOpacity onPress={this._carregarLancamentos}>
                        <Text>Buscar</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={this.state.lancamentos}
                        keyExtractor={item => item.idLancamento}
                        renderItem={({ item }) => (
                            <View>
                                <Text>Id: {item.idLancamento}</Text>
                                <Text>Titulo: {item.titulo}</Text>
                                <Text>Sinopse: {item.sinopse}</Text>
                                <Text>Data de Lancamento: {item.dataLancamento}</Text>
                                <Text>Gênero: {item.idGeneroNavigation.nome}</Text>
                                <Text>Categoria: {item.idCategoriaNavigation.nome}</Text>
                                <Text>Plataforma: {item.idPlataformaNavigation.nome}</Text>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        )
    }
}

export default listarPorPlataforma;