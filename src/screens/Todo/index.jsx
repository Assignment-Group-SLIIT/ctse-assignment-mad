import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Pressable, StyleSheet, View} from 'react-native';
import {
  Text,
  FAB,
  Modal,
  Provider,
  Portal,
  Divider,
  TextInput,
  Snackbar,
  Dialog,
  Button,
} from 'react-native-paper';
import {theme} from '../../core/theme';
import {ScrollView} from 'react-native-gesture-handler';
import ProgressIndicator from '../../components/ProgressIndicator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TodoScreen = ({navigation}) => {
  const [todos, setTodos] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [selectTodo, setSelectTodo] = useState({
    id: '',
    title: '',
    list: [
      {
        addList: '',
      },
    ],
  });

  const [iconName, setIconName] = useState('square-edit-outline');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [msg, setMsg] = useState('Oops... Something went wrong');
  const [isDelete, setIsDelete] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const showDialog = () => setIsDelete(true);

  const hideDialog = () => setIsDelete(false);

  const onToggleSnackBar = () => setSnackbarVisible(!visible);
  const onDismissSnackBar = () => setSnackbarVisible(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    const subscriber = firestore()
      .collection('todos')
      .onSnapshot(querySnapshot => {
        const todos = [];

        querySnapshot.forEach(documentSnapshot => {
          todos.push(documentSnapshot.data());
        });

        setTodos(todos);
        setIsLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const onIconPress = async () => {
    if (!isUpdating) {
      setIconName('content-save-outline');
      setIsUpdating(true);
      return;
    }

    await firestore()
      .collection('todos')
      .doc(selectTodo.id)
      .update({...selectTodo})
      .then(() => {
        setIconName('square-edit-outline');
        setIsUpdating(false);
        hideModal();

        setMsg('successfully updated the todo!');
        onToggleSnackBar();
      })
      .catch(err => {
        console.log('error while updating the todo...', err);
      });
  };

  const onDeleteMeal = () => {
    setMsg('Deleting the todo...');
    onToggleSnackBar();

    firestore()
      .collection('todos')
      .doc(selectedId)
      .delete()
      .then(() => {
        hideDialog();

        setMsg('Successfully deleted!');
        onToggleSnackBar();
      })
      .catch(err => {
        setMsg('Oops... Something went wrong!');
        onToggleSnackBar();
      });
  };

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerTxt}>Your Todos</Text>
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={{width: '100%', padding: 5, height: '100%'}}>
          {todos.map((todo, index) => {
            return (
              <Pressable
                key={index}
                style={styles.card}
                onPress={() => {
                  showModal();
                  setSelectTodo(todos[index]);
                }}
                onLongPress={e => {
                  showDialog();
                  setSelectedId(todos[index]?.id);
                }}>
                <View style={styles.cardView}>
                  <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                    {todo?.title?.charAt(0)}
                  </Text>
                </View>
                <Text style={{fontSize: 20}}>{todo.title}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
        {isLoading && <ProgressIndicator isLoading={isDelete} />}
        <FAB
          icon="plus"
          style={styles.FAB}
          color="#fff"
          size="medium"
          onPress={() => {
            // navigation.navigate('ScreenOne');
            navigation.navigate('AddTodo');
          }}></FAB>

        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalStyle}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                position: 'relative',
              }}>
              <Text
                style={{fontSize: 20, textAlign: 'center', fontWeight: '700'}}>
                {selectTodo?.addList}
              </Text>
              <Pressable
                onPress={() => {
                  onIconPress();
                }}
                style={{position: 'absolute', right: 0}}>
                <Icon name={iconName} size={35} color={theme.colors.primary} />
              </Pressable>
            </View>
            <Text style={{fontSize: 28, fontWeight: '500', marginTop: 15}}>
              Todo List
            </Text>
            <Divider bold={true} style={{marginBottom: 5}} />

            <View
              style={{
                flexDirection: 'column',
                marginHorizontal: 10,
                width: '100%',
              }}>
              {selectTodo?.list?.map((todo, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      width: '125%',
                      padding: 5,
                      marginBottom: 5,
                      alignItems: 'center',
                    }}>
                    <TextInput
                      mode="flat"
                      label={`Todo ${index + 1}`}
                      placeholder={`Todo ${index + 1}`}
                      value={selectTodo.list[index].addList}
                      onChangeText={e => {
                        const newSelectedTodo = {...selectTodo};
                        newSelectedTodo.list[index].addList = e;
                        setSelectTodo(newSelectedTodo);
                      }}
                      style={{backgroundColor: '#fff', width: '75%'}}
                      disabled={!isUpdating}
                    />
                  </View>
                );
              })}
            </View>
          </Modal>

          {/* delete prompt dialog */}
          <Portal>
            <Dialog visible={isDelete} onDismiss={hideDialog}>
              <Dialog.Title>Are you sure?</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">
                  Do you want to delete this meal?
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={onDeleteMeal}>Yes</Button>
                <Button onPress={hideDialog}>No</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </Portal>

        <Snackbar
          visible={snackbarVisible}
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
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  headerTxt: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  FAB: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    position: 'absolute',
    bottom: 15,
    right: 15,
    height: 50,
    backgroundColor: theme.colors.buttonBackground,
    borderRadius: 100,
  },
  card: {
    width: '100%',
    height: 75,
    backgroundColor: 'white',
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  cardView: {
    width: '20%',
    backgroundColor: theme.colors.primary,
    height: 75,
    borderTopStartRadius: 15,
    borderBottomStartRadius: 15,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalStyle: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 20,
    flex: 1,
    justifyContent: 'flex-start',
    margin: 10,
    overflow: 'scroll',
  },
});

export default TodoScreen;
