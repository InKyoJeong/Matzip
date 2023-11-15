import {createDrawerNavigator} from '@react-navigation/drawer';
import MapHomeScreen from '../../screens/MapHomeScreen';

const Drawer = createDrawerNavigator();

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MapHome" component={MapHomeScreen} />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
