import CreateTask from '../Schedule/CreateTask';
import DrawerButton from '../../../Components/DrawerButton';
import LogoutButton from '../../../Components/LogoutButton';
import React from 'react';
import TaskDetails from '../Schedule/TaskDetails';
import Tasks from '../Schedule';
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
      initialRouteName='Tasks'
    >
      <TasksStack.Screen name='Tasks' component={Tasks} />
      <TasksStack.Screen name='TaskDetails' component={TaskDetails} />
      <TasksStack.Screen name='CreateTask' component={CreateTask} />
    </TasksStack.Navigator>
  );
}

export default TasksRoutes;
