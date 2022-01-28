import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import DetailEventScreen from '../Events/DetailEventScreen';

const Stack = createStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator
    initialRouteName='Home'
    screenOptions={{
        headerShown:false
    }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DetailEvent" component={DetailEventScreen} />
    </Stack.Navigator>
  );
}