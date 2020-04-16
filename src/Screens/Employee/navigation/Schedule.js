import DrawerButton from '../../../Components/DrawerButton';
import LogoutButton from '../../../Components/LogoutButton';
import React from 'react';
import Schedule from '../Schedule';
import { createStackNavigator } from '@react-navigation/stack';

const TasksStack = createStackNavigator();

function TasksRoutes({ navigation }) {
  return (
    <TasksStack.Navigator
      screenOptions={{
        headerTitle: 'My schedule',
        headerRight: () => <LogoutButton navigation={navigation} />,
        headerLeft: () => <DrawerButton navigation={navigation} />,
        headerStyle: { height: 45 },
      }}
      initialRouteName='Schedule'
    >
      <TasksStack.Screen name='Schedule' component={Schedule} />
    </TasksStack.Navigator>
  );
}

export default TasksRoutes;
