import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import React, { useContext, useEffect, useState } from 'react';
import { getDatetime, truncate } from '../../../Common/utils';

import Button from '../../../Components/Button';
import { EmployeeContext } from '../../../Contexts';
import OptionModal from './Modals/OptionModal/OptionModal';
import ScheduleInput from './ScheduleInput';
import Swiper from 'react-native-swiper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getAllTasks } from '../../../Services/taskServices';
import { useIsFocused } from '@react-navigation/native';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function EnterTimesheet({ navigation }) {
  const employee = useContext(EmployeeContext);
  const [listTasks, setListTasks] = useState([]);
  const [searchAgain, setSearchAgain] = useState(true);
  const [userSearch, setUserSearch] = useState('');
  const [options, setOptions] = useState({
    filter: false,
    fromDate: null,
    toDate: null,
    status: null,
  });
  const [optionModalVisibility, setOptionModalVisibility] = useState(false);
  const focused = useIsFocused();

  console.log(JSON.stringify(employee));

  const filter = l => {
    return Boolean(
      (!userSearch ||
        (userSearch &&
          l.ProcesssorName.toLowerCase().includes(userSearch.toLowerCase()))) &&
        optionFilter(l),
    );
  };

  const optionFilter = l => {
    if (options.filter) {
      let date = new Date(l.DueDate);
      return (
        Boolean(options.fromDate ? date >= options.fromDate : true) &&
        (options.toDate ? date <= options.toDate : true) &&
        (options.status ? options.status == l.Status : true)
      );
    } else return true;
  };

  useEffect(() => {
    if (focused)
      getAllTasks(employee.Id)
        .then(res => {
          setListTasks(res.data.Data);
        })
        .catch(err => {
          console.log(err);
        });
  }, [focused, searchAgain]);

  return (
    <View style={styles.container}>
      <OptionModal
        isVisible={optionModalVisibility}
        setIsVisile={setOptionModalVisibility}
        options={options}
        setOptions={setOptions}
      />
      {/* <Text style={styles.header}>{employee.Username || 'Admin Board'}</Text> */}
      <View style={styles.row}>
        <Text style={styles.minorHeader}>{'Tasks'}</Text>
        <Button
          icon={{ name: 'recycle', size: 10 }}
          buttonStyle={{ marginLeft: 10, marginBottom: 10 }}
          onPress={() => {
            setUserSearch('');
            setSearchAgain(!searchAgain);
            setOptions({
              filter: false,
              fromDate: null,
              toDate: null,
              status: null,
            });
          }}
        />
      </View>
      <View style={styles.row}>
        <Button
          title='Options '
          icon={{ name: 'cog', size: 10 }}
          buttonStyle={{ marginLeft: 10 }}
          onPress={() => setOptionModalVisibility(true)}
          style={{ color: 'red' }}
        />
        <Button
          title='Create '
          icon={{ name: 'plus', size: 10 }}
          onPress={() => navigation.navigate('CreateTask')}
        />
      </View>
      <View
        style={{
          flex: 1,
          marginHorizontal: 5,
          marginVertical: 5,
          borderRadius: 10,
          backgroundColor: 'white',
          overflow: 'hidden',
        }}
      >
        <Swiper
          showsButtons={true}
          showsPagination={false}
          loop={false}
          containerStyle={{ borderRadius: 10 }}
        >
          <ScheduleInput/>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
        </Swiper>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  header: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10,
    fontSize: 40,
    marginLeft: 10,
  },
  listItem: {
    width: '100%',
  },
  minorHeader: {
    fontSize: 20,
    marginLeft: 10,
  },
  row: {
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightTitleStyle: {
    fontWeight: 'bold',
  },
  wrapper: {
    borderRadius: 10,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
