import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BarcodeScan from './pages/BarcodeScan.tsx';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BarcodeScan" component={BarcodeScan} />
    </Stack.Navigator>
  );
};
export default Router;