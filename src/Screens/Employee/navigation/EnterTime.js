import DrawerButton from '../../../Components/DrawerButton';
import EnterTime from '../EnterTime';
import LogoutButton from '../../../Components/LogoutButton';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const TasksStack = createStackNavigator();

function TasksRoutes({ navigation }) {
  return (
    <TasksStack.Navigator
      screenOptions={{
        headerTitle: 'Enter Timesheet',
        headerRight: () => <LogoutButton navigation={navigation} />,
        headerLeft: () => <DrawerButton navigation={navigation} />,
        headerStyle: { height: 45 },
      }}
      initialRouteName='Enter Time'
    >
      <TasksStack.Screen name='Enter Time' component={EnterTime} />
    </TasksStack.Navigator>
  );
}

export default TasksRoutes;
