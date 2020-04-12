import { EmployeeContext } from '../../../Contexts';
import EnterTimeRoutes from './EnterTime';
import React from 'react';
import ScheduleRoutes from './Schedule';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileRoutes from './Profile';

const EmployeeDrawer = createDrawerNavigator();

function UserRoutes({ route }) {
  return (
    <EmployeeContext.Provider value={{ ...route.params }}>
      <EmployeeDrawer.Navigator initialRouteName='My Schedule'>
        <EmployeeDrawer.Screen name='My Schedule' component={ScheduleRoutes} />
        <EmployeeDrawer.Screen name='Enter Timesheet' component={EnterTimeRoutes} />
        <EmployeeDrawer.Screen name= 'Profile' component={ProfileRoutes}/>
      </EmployeeDrawer.Navigator>
    </EmployeeContext.Provider>
  );
}

export default UserRoutes;
