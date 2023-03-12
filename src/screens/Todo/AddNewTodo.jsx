import {StyleSheet, View, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, Divider, TextInput, Snackbar} from 'react-native-paper';
import {theme} from '../../core/theme';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../components/Button';
import firestore from '@react-native-firebase/firestore';

const AddNewTodo = () => {
  const [title, setTitle] = useState('');
  const [list, setList] = useState([{addList: ''}]);
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState('Oops... Something went wrong');

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const AddtodoToList = () => {
    if (todo == '' || title == '' || list[0].addList == '') {
      setMsg('Please fill all the inputs!');
      onToggleSnackBar();
      return;
    }

    setMsg('Saving the todo...');
    onToggleSnackBar();

    const todo = {
      id: '',
      title,
      list,
    };

    firestore()
      .collection('todos')
      .add(todo)
      .then(value => {
        firestore().collection('todos').doc(value.id).update({id: value.id});
        setMsg('Todo Saved Successfully!');
        onToggleSnackBar();
        navigation.navigate('NutritionHome');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{width: '100%', padding: 5, height: '100%'}}>
        <TextInput
          mode="outlined"
          label="Title of your todo"
          value={title}
          onChangeText={e => {
            setTitle(e);
          }}
          style={{
            backgroundColor: '#fff',
            width: '100%',
            marginTop: 10,
            marginBottom: 25,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            position: 'relative',
          }}>
          <Text style={{fontSize: 18, fontWeight: '500', marginTop: 15}}>
            Insert your todo list
          </Text>

          <Pressable
            onPress={() => {
              setList([...list, {addList: ''}]);
            }}
            style={{position: 'absolute', right: 0}}>
            <Icon name="playlist-plus" size={35} color={theme.colors.primary} />
          </Pressable>
        </View>
        <Divider bold={true} style={{marginBottom: 5}} />
        <View
          style={{
            flexDirection: 'column',
            marginHorizontal: 10,
            width: '100%',
          }}>
          {list?.map((todo, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  width: '90%',
                  padding: 5,
                  marginBottom: 5,
                  alignItems: 'center',
                }}>
                <TextInput
                  mode="flat"
                  label={`Todo ${index + 1}`}
                  placeholder={`Todo ${index + 1}`}
                  value={list[index].addList}
                  onChangeText={e => {
                    const listTodo = [...list];
                    listTodo[index].addList = e;
                    setList(listTodo);
                  }}
                  style={{backgroundColor: '#fff', width: '100%'}}
                />
                {list.length !== 1 && (
                  <Pressable
                    onPress={() => {
                      const listTodo = [...list];
                      listTodo.splice(index, 1);
                      setList(listTodo);
                    }}>
                    <Icon name="delete-forever" size={40} color="red" />
                  </Pressable>
                )}
              </View>
            );
          })}
        </View>

        <Divider bold={true} style={{marginBottom: 5}} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            position: 'relative',
            marginTop: 20,
          }}></View>
        <Divider bold={true} style={{marginBottom: 5}} />

        <Button
          mode={'contained'}
          style={{marginVertical: 20}}
          onPress={() => {
            AddtodoToList();
          }}>
          Add List
        </Button>
      </ScrollView>

      {/* snackbar */}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Dismiss',
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        {msg}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});

export default AddNewTodo;
