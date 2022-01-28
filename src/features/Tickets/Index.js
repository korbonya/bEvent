import { createStackNavigator } from '@react-navigation/stack';
import DetailTicket from './DetailTicket';
import TicketsScreen from './TicketsScreen';

const Stack = createStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator
    initialRouteName='Tikets'
    screenOptions={{
        headerShown:false
    }}
    >
      <Stack.Screen name="Tikets" component={TicketsScreen} />
      <Stack.Screen name="DetailTicket" component={DetailTicket} />
    </Stack.Navigator>
  );
}