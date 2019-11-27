import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import SignInScreen from './pages/signin';
import LancamentosScreen from './pages/lancamentos';
import CategoriasScreen from './pages/categorias';
import PlataformasScreen from './pages/plataformas';
import ProfileScreen from './pages/profile';
// import LFiltradoScreen from './pages/lancamentoFiltrado'
// criar a navegaçao com o login = autenticaçao
const AuthStack = createStackNavigator({
  Sign: {screen: SignInScreen},
})

const MainNavigator = createBottomTabNavigator(
  {
    Lancamentos: {
      screen: LancamentosScreen,
    },
    Categorias: {
      screen: CategoriasScreen,
    },
    Plataformas: {
      screen: PlataformasScreen
    },
    Profile:{
      screen:ProfileScreen
    }
   
  
  },
  {
    // define a rota inicial
    initialRouteName: 'Lancamentos',
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      activeTintColor:'#b4b4b4',
      inactiveTintColor:'white',
      inactiveBackgroundColor: '#3f2558',
      activeBackgroundColor:'#341e49' ,
      style: {
        width: '100%',
        height: 50,
      },
    },
  },
);
export default createAppContainer(createSwitchNavigator(
  {
    // define as telas que vão aparecer
    MainNavigator,
    AuthStack
  }, {

    initialRouteName: 'AuthStack',
  }
),
);
