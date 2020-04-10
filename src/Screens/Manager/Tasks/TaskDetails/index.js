import {
  Alert,
  Picker,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {
  deleteTask,
  getTaskDetails,
  updateTaskDetails,
} from '../../../../Services/taskServices';

import { BASE_URL } from '../../../../Constants/appConfigs';
import Button from '../../../../Components/Button';
import ImagePicker from '../../../../Components/ImagePicker';
import { ManagerContext } from '../../../../Contexts';
import { getDatetime } from '../../../../Common/utils';
import { useIsFocused } from '@react-navigation/native';

function TaskDetails({ navigation, route }) {
  const [name] = useState(route.params?.TaskName);
  const [task, setTask] = useState({ ...route.params });
  const focused = useIsFocused();
  const manager = useContext(ManagerContext);
  console.log('Manager' + manager.Id + ' ' + task.Processor);
  const isMyTask = Boolean(manager.Id === task.Processor);
  if (task.Description === 'null') setTask({ ...task, Description: null });
  if (task.ContentHandlingWork === 'null') setTask({ ...task, ContentHandlingWork: null });

  useEffect(() => {
    if (focused)
      getTaskDetails(task.TaskId).then(res => {
        setTask(res.data.Data);
      });
  }, [focused]);

  const onUpdate = () => {
    console.log(JSON.stringify(task));
    let tempTask = { ...task, Updater: manager.Id };
    setTask({ ...task, Updater: manager.Id });
    updateTaskDetails(tempTask)
      .then(res => {
        Alert.alert('Info', res.data.Message);
        // SendNoti(task.Processor, "Your task has been updated")
        navigation.goBack();
      })
      .catch(() => Alert.alert('Error', 'Server error!'));
  };

  const onDrop = () => {
    console.log(JSON.stringify(task));
    let tempTask = { ...task, Updater: user.Id, Status: 5 };
    setTask({ ...task, Updater: user.Id, Status: 5 });
    updateTaskDetails(tempTask)
      .then(res => {
        Alert.alert('Info', res.data.Message);
        // SendNoti(task.Processor, "Your task has been updated")
        navigation.goBack();
      })
      .catch(() => Alert.alert('Error', 'Server error!'));
  };

  const onStart = () => {
    console.log(JSON.stringify(task));
    let tempTask = { ...task, Updater: manager.Id, Status: 2 };
    setTask({ ...task, Updater: manager.Id, Status: 2 });
    updateTaskDetails(tempTask)
      .then(res => {
        Alert.alert('Info', res.data.Message);
        // SendNoti(task.Processor, "Your task has been updated")
        navigation.goBack();
      })
      .catch(() => Alert.alert('Error', 'Server error!'));
  };

  const onEnd = () => {
    console.log(JSON.stringify(task));
    let tempTask = { ...task, Updater: manager.Id, Status: 3,  };
    setTask({ ...task, Updater: manager.Id, Status: 3, });
    updateTaskDetails(tempTask)
      .then(res => {
        Alert.alert('Info', res.data.Message);
        // SendNoti(task.Processor, "Your task has been updated")
        navigation.goBack();
      })
      .catch(() => Alert.alert('Error', 'Server error!'));
  };

  const onDelete = () => {
    deleteTask(task.TaskId)
      .then(res => {
        Alert.alert('Info', 'Delete successful!');
        navigation.goBack();
      })
      .catch('Error', 'Server Error!');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 30,
          paddingHorizontal: '5%',
          justifyContent: 'flex-start',
        }}
      >
        <Text style={s.header}>{name || 'TaskName'}</Text>
        <Text style={s.minorHeader}>{'Task Details\n'}</Text>
        <View style={s.inputContainer}>
          <Text style={s.label}>{'Description'}</Text>
          <TextInput
            style={s.input}
            numberOfLines={4}
            multiline
            value={task.ContentAssigned}
            onChangeText={text => setTask({ ...task, ContentAssigned: text })}
            editable={task.Creator !== 1 ? true : false}
          />
        </View>
        <View style={s.inputContainer}>
          <Text style={s.label}>{'Handling details:'}</Text>
          <TextInput
            style={s.input}
            numberOfLines={4}
            multiline
            value={task.ContentHandlingWork}
            onChangeText={text => setTask({ ...task, ContentHandlingWork: text })}
            editable={task.Creator !== 1 ? true : false}
          />
        </View>
        <View style={s.inputContainer}>
          <Text style={s.label}>{'Name'}</Text>
          <TextInput
            style={s.input}
            value={task.TaskName}
            onChangeText={text => setTask({ ...task, TaskName: text })}
            maxLength={40}
            editable={true}
          />
        </View>
        <View>
          <Text style={s.label}>{`Creator: ${task.CreatorName}`}</Text>
          <Text style={s.label}>{`Details: ${task.ContentAssigned}`}</Text>
          <Text style={s.label}>{`Processor: ${task.ProcesssorName}`}</Text>
          <Text
            style={s.label}
          >{`Processing details: ${task.ContentHandlingWork}`}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={s.label}>{'Status:'}</Text>
            <Picker
              selectedValue={task.Status}
              style={{ height: 30, width: 150 }}
              onValueChange={(itemValue, itemIndex) =>
                setTask({ ...task, Status: itemValue })
              }
              enabled={false}
            >
              <Picker.Item label='Unstarted' value={1} />
              <Picker.Item label='Processing' value={2} />
              <Picker.Item label='Finished' value={3} />
              <Picker.Item label='Overdue' value={4} />
              <Picker.Item label='Dropped' value={5} />
            </Picker>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={s.label}>{'Mark:'}</Text>
            <Picker
              enabled={!isMyTask}
              selectedValue={task.Mark}
              style={{ height: 30, width: 150 }}
              onValueChange={(itemValue, itemIndex) =>
                setTask({ ...task, Mark: itemValue })
              }
            >
              <Picker.Item label='Not set' value={null} />
              <Picker.Item label='1' value={1} />
              <Picker.Item label='2' value={2} />
              <Picker.Item label='3' value={3} />
              <Picker.Item label='4' value={4} />
              <Picker.Item label='5' value={5} />
              <Picker.Item label='6' value={6} />
              <Picker.Item label='7' value={7} />
              <Picker.Item label='8' value={8} />
              <Picker.Item label='9' value={9} />
              <Picker.Item label='10' value={10} />
            </Picker>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={s.label}>{'Acceptance:'}</Text>
            <Picker
              enabled={!isMyTask}
              selectedValue={task.Acceptance}
              style={{ height: 30, width: 150 }}
              onValueChange={(itemValue, itemIndex) =>
                setTask({ ...task, Acceptance: itemValue })
              }
            >
              {task.Status !== 1 ? null : (
                <Picker.Item label='Unaccepted' value={null} />
              )}
              <Picker.Item label='Accepted' value={true} />
              <Picker.Item label='Declined' value={false} />
            </Picker>
          </View>
          <Text style={s.label}>{`Time start: ${getDatetime(
            task.TimeStart,
          )}`}</Text>
          <Text style={s.label}>{`Time created: ${getDatetime(
            task.CreationTime,
          )}`}</Text>
          <Text style={s.label}>{`Time due: ${getDatetime(
            task.CreationTime,
          )}`}</Text>
          <Text style={s.label}>{`Time last updated: ${getDatetime(
            task.TimeUpdated,
          )}`}</Text>
          {task.Status == 2 && !isMyTask && task.ImageConfirmation ? (
            <View style={s.inputContainer}>
              <Text style={s.label}>{'Comment'}</Text>
              <TextInput
                style={s.input}
                numberOfLines={4}
                multiline
                value={task.Description}
                onChangeText={text => setTask({ ...task, Description: text })}
              />
            </View>
          ) : null}
          <Text style={s.label}>{'Image confirmation'}</Text>
          <ImagePicker
            image={
              task.ImageConfirmation
                ? task.ImageConfirmation.includes('uploads')
                  ? BASE_URL + task.ImageConfirmation
                  : task.ImageConfirmation
                : null
            }
            setImage={i => {
              setTask({ ...task, ImageConfirmation: i });
            }}
          />
          <View style={{ ...s.row, marginVertical: 20 }}>
            {isMyTask && task.Status === 1 ? (
              <Button
                title='DELETE'
                onPress={onDelete}
                buttonStyle={{ backgroundColor: 'red' }}
              />
            ) : null}
            {isMyTask && task.Status === 1 ? (
              <Button
                title='START'
                onPress={onStart}
                buttonStyle={{ backgroundColor: 'orange' }}
              />
            ) : null}
            <Button
              title='UPDATE'
              onPress={onUpdate}
              buttonStyle={{ backgroundColor: 'green' }}
            />
            {isMyTask && task.Acceptance === 2 ? (
              <Button
                title='DROP'
                onPress={onDrop}
                buttonStyle={{ backgroundColor: 'purple' }}
              />
            ) : null}
            {!isMyTask && task.Description && task.ContentHandlingWork && task.ImageConfirmation   ? (
              <Button
                title='END'
                onPress={onEnd}
                buttonStyle={{ backgroundColor: 'black' }}
              />
            ) : null}
            <Button
              title='CANCEL'
              onPress={() => navigation.goBack()}
              buttonStyle={{ backgroundColor: 'grey' }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    paddingLeft: '5%',
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  header: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 40,
  },
  scroll: {
    paddingBottom: 30,
  },
  listItem: {
    width: 400,
  },
  inputContainer: {
    marginTop: 10,
    width: '95%',
  },
  minorHeader: {
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderLeftWidth: 4,
    borderLeftColor: '#039dfc',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    borderTopWidth: 1,
    borderTopColor: 'grey',
    borderRightWidth: 1,
    borderRightColor: 'grey',
    width: '100%',
    paddingLeft: 7,
    paddingTop: 5,
    textAlignVertical: 'top',
  },
  label: {
    color: 'black',
    marginVertical: 4,
  },
});

export default TaskDetails;
