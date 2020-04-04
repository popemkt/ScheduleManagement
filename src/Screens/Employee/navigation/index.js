import { EmployeeContext } from '../../../Contexts';
import EnterTimeRoutes from './EnterTime';
import React from 'react';
import ScheduleRoutes from './Schedule';
import { createDrawerNavigator } from '@react-navigation/drawer';

const EmpoloyeeDrawer = createDrawerNavigator();

function UserRoutes({ route }) {
  return (
    <EmployeeContext.Provider value={{ ...route.params }}>
      <EmpoloyeeDrawer.Navigator initialRouteName='My Schedule'>
        <EmpoloyeeDrawer.Screen name='My Schedule' component={ScheduleRoutes} />
        <EmpoloyeeDrawer.Screen name='Enter Timesheet' component={EnterTimeRoutes} />
      </EmpoloyeeDrawer.Navigator>
    </EmployeeContext.Provider>
  );
}

export default UserRoutes;
