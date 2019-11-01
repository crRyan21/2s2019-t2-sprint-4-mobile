import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import MainScreen from './pages/main';
import ProfileScreen from './pages/profile';
import SignInScreen from './pages/signin';
import CategoriasScreen from './pages/categorias';

// criar a navegaçao com o login = autenticaçao
const AuthStack = createStackNavigator({
  Sign: {screen: SignInScreen},
})

const MainNavigator = createBottomTabNavigator(
  {
    Main: {
      screen: MainScreen,
    },
    Categorias: {
      screen: CategoriasScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
    
  },
  {
    // define a rota inicial
    initialRouteName: 'Profile',
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      inactiveBackgroundColor: '#b727ff',
      activeBackgroundColor: '#9900e6',
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
  }, 
),
);
