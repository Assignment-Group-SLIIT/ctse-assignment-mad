import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Pressable, StyleSheet, View, TextInput, Dimensions} from 'react-native';
import {
  Text,
  FAB,
  Modal,
  Provider,
  Portal,
  Divider,
  Snackbar,
  Dialog,
  Button,
} from 'react-native-paper';
import {theme} from '../../core/theme';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressIndicator from '../../components/ProgressIndicator';
import DropDown from 'react-native-paper-dropdown';

const WorkoutScreen = ({navigation}) => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkOut, setSelectedWorkOut] = useState({
    tenantId: '',
    id: '',
    name: '',
    packageType: '',
    caloriesBurnt: '',
    duration: '',
    steps: '',
    url: '',
  });

  const [visible, setVisible] = useState(false);
  const [iconName, setIconName] = useState('square-edit-outline');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [msg, setMsg] = useState('Oops... Something went wrong');
  const [isDelete, setIsDelete] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const showDialog = () => setIsDelete(true);

  const hideDialog = () => setIsDelete(false);

  const onToggleSnackBar = () => setSnackbarVisible(!visible);
  const onDismissSnackBar = () => setSnackbarVisible(false);

  const [showDropDown, setShowDropDown] = useState(false);

  const [selectionOne, setSelectionOne] = useState(false);
  const [selectionTwo, setSelectionTwo] = useState(false);
  const [selectionThree, setSelectionThree] = useState(false);
  const [selectedPackage,setSelectedPackage]=useState('')

  const [editable,setEditable]=useState(false)

  const setSelections = (value)=>{
    console.log(value)
    if(value == '1'){
      setSelectionOne(true)
      setSelectionTwo(false)
      setSelectionThree(false)
      setSelectedPackage('Weight Gain')
    }else if(value == '2' ){
      setSelectionOne(false)
      setSelectionTwo(true)
      setSelectionThree(false)
      setSelectedPackage('Fat Loss')
    }else{
      setSelectionOne(false)
      setSelectionTwo(false)
      setSelectionThree(true)
      setSelectedPackage('Regular')
    }
  }

  const packages = [
    {
      label: 'Weight Gain',
      value: 'Weight Gain',
    },
    {
      label: 'Fat Loss',
      value: 'Fat Loss',
    },
    {
      label: 'Regular',
      value: 'Regular',
    },
  ];

  const setPackage = e => {
    const newSelectedWorkOut = {...selectedWorkOut};
    newSelectedWorkOut.packageType = e;
    setSelectedWorkOut(newSelectedWorkOut);
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    if (user) {
      const subscriber = firestore()
        .collection('workouts')
        .where('tenantId', '==', user.uid)
        .onSnapshot(querySnapshot => {
          const workouts = [];

          querySnapshot.forEach(documentSnapshot => {
            workouts.push(documentSnapshot.data());
          });

          setWorkouts(workouts);
          setIsLoading(false);
        });

      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }
  }, [user]);


  useEffect(()=>{
    if (user) {
      const subscriber = firestore()
        .collection('workouts')
        .where('tenantId', '==', user.uid)
        .onSnapshot(querySnapshot => {
          const workouts = [];

          querySnapshot.forEach(documentSnapshot => {
            console.log(documentSnapshot.data().packageType)
            if(documentSnapshot.data().packageType == selectedPackage){
              workouts.push(documentSnapshot.data());
            }       
          });
          setWorkouts(workouts);
          setIsLoading(false);
        });

      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }
    
  },[selectionOne,selectionTwo,selectionThree])



  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onIconPress = async () => {
    if(editable){
      setEditable(false)
    }else{
      setEditable(true)
    }
 
    if (!isUpdating) {
      setIconName('content-save-outline');
      setIsUpdating(true);
      return;
    }

    await firestore()
      .collection('workouts')
      .doc(selectedWorkOut.id)
      .update({...selectedWorkOut})
      .then(() => {
        setIconName('square-edit-outline');
        setIsUpdating(false);
        hideModal();

        setMsg('successfully updated the workout details!');
        onToggleSnackBar();
      })
      .catch(err => {
        console.log('error while updating the workout...', err);
      });
  };

  const onDeleteWorkout = () => {
    setMsg('Deleting the workout...');
    onToggleSnackBar();

    firestore()
      .collection('workouts')
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
        <Text style={styles.headerTxt}>Workouts Collection</Text>
        <View style={styles.tabs}>
          <Button style={[styles.tabTO, {backgroundColor: selectionOne?'#1ebeff':null}]}
          onPress={()=>setSelections('1')}>
            Weight Gain
          </Button>
          <Button style={[styles.tabTO,{backgroundColor: selectionTwo?'#1ebeff':null}]}
          onPress={()=>setSelections('2')}>
            Fat-Loss
          </Button>
          <Button style={[styles.tabTO,{backgroundColor: selectionThree?'#1ebeff':null}]}
          onPress={()=>setSelections('3')}>
            Regular
          </Button>
        </View>

        <ScrollView
          keyboardShouldPersistTaps="always"
          style={{width: '100%', padding: 5, height: '100%'}}>
          {workouts?.length == 0 ? (
            <View
              style={{
                height: Dimensions.get('window').height - 180,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>No records to display...</Text>
            </View>
          ) : (
            workouts.map((workout, index) => {
              return (
                <Pressable
                  key={index}
                  style={styles.card}
                  onPress={() => {
                    showModal();
                    setSelectedWorkOut(workouts[index]);
                  }}
                  onLongPress={e => {
                    showDialog();
                    setSelectedId(workouts[index]?.id);
                  }}>
                  <View style={styles.cardView}>
                    <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                      {workout?.name?.charAt(0)}
                    </Text>
                  </View>
                  <Text style={{fontSize: 20}}>{workout.name}</Text>
                </Pressable>
              );
            })
          )}
        </ScrollView>
        {isLoading && <ProgressIndicator isLoading={isLoading} />}
        <FAB
          icon="plus"
          style={styles.FAB}
          color="#fff"
          size="medium"
          onPress={() => {
            // navigation.navigate('ScreenOne');
            navigation.navigate('AddWorkOut');
          }}></FAB>

        {/* update modal */}
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
                {selectedWorkOut?.name}
              </Text>
              <Pressable
                onPress={() => {
                  hideModal();
                }}
                style={{position: 'absolute', left: 0,bottom:0 }}>
                <Icon name='close-outline' size={35} color={theme.colors.error} />
              </Pressable>
              <Pressable
                onPress={() => {
                  onIconPress();
                }}
                style={{position: 'absolute', right: 0}}>
                <Icon name={iconName} size={35} color={theme.colors.primary} />
              </Pressable>
            </View>
            <ScrollView
              keyboardShouldPersistTaps="always"
              style={{width: '100%', padding: 5, height: '100%',marginTop:30}}>
              <DropDown
                label={'Package Type'}
                mode={'outlined'}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={selectedWorkOut.packageType}
                setValue={e => setPackage(e)}
                list={packages}
                editable={false}
              />
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  width: '100%',
                  position: 'relative',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    left: -104,
                    marginTop: 8,
                  }}>
                  Name of Exercise
                </Text>
                <TextInput
                  mode="outlined"
                  label="Name of Exercise"
                  value={selectedWorkOut.name}
                  onChangeText={e => {
                    const newSelectedWorkOut = {...selectedWorkOut};
                    newSelectedWorkOut.name = e;
                    setSelectedWorkOut(newSelectedWorkOut);
                  }}
                  style={{
                    backgroundColor: '#e4e8e5',
                    width: '100%',
                    marginTop: 2,
                    marginBottom: 25,
                    fontWeight:'bold',
                    color:'#000'
                  }}
                  editable={editable}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    left: -118,
                    marginTop: 8,
                  }}>
                  Calories Burnt
                </Text>

                <TextInput
                  mode="outlined"
                  label="Calories Burnt"
                  keyboardType="numeric"
                  value={selectedWorkOut.caloriesBurnt}
                  onChangeText={e => {
                    const newSelectedWorkOut = {...selectedWorkOut};
                    newSelectedWorkOut.caloriesBurnt = e;
                    setSelectedWorkOut(newSelectedWorkOut);
                  }}
                  style={{
                    backgroundColor: '#e4e8e5',
                    width: '100%',
                    marginTop: 2,
                    marginBottom: 25,
                    fontWeight:'bold',
                    color:'#000'
                    
                  }}
                  editable={editable}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    left: -100,
                    marginTop: 8,
                  }}>
                  Duration in minutes
                </Text>
                <TextInput
                  mode="outlined"
                  label="Duration in minutes"
                  keyboardType="numeric"
                  value={selectedWorkOut.duration}
                  onChangeText={e => {
                    const newSelectedWorkOut = {...selectedWorkOut};
                    newSelectedWorkOut.duration = e;
                    setSelectedWorkOut(newSelectedWorkOut);
                  }}
                  style={{
                    backgroundColor: '#e4e8e5',
                    width: '100%',
                    marginTop: 2,
                    marginBottom: 25,
                    fontWeight:'bold',
                    color:'#000'
                    
                  }}
                  editable={editable}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    left: -124,
                    marginTop: 8,
                  }}>
                  Instructions
                </Text>
                <TextInput
                  mode="outlined"
                  multiline
                  numberOfLines={4}
                  label="Instructions"
                  value={selectedWorkOut.steps}
                  onChangeText={e => {
                    const newSelectedWorkOut = {...selectedWorkOut};
                    newSelectedWorkOut.steps = e;
                    setSelectedWorkOut(newSelectedWorkOut);
                  }}
                  style={{
                    backgroundColor: '#e4e8e5',
                    width: '100%',
                    marginTop: 2,
                    marginBottom: 25,
                    fontWeight:'bold',
                    color:'#000'
                    
                  }}
                  editable={editable}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    left: -132,
                    marginTop: 8,
                  }}>
                  Video Link
                </Text>
                <TextInput
                  mode="outlined"
                  label="Video Link"
                  value={selectedWorkOut.url}
                  onChangeText={e => {
                    const newSelectedWorkOut = {...selectedWorkOut};
                    newSelectedWorkOut.url = e;
                    setSelectedWorkOut(newSelectedWorkOut);
                  }}
                  style={{
                    backgroundColor: '#e4e8e5',
                    width: '100%',
                    marginTop: 2,
                    marginBottom: 25,
                    fontWeight:'bold',
                    color:'#000'
                    
                  }}
                  editable={editable}
                />
              </View>
            </ScrollView>
          </Modal>

          {/* delete prompt dialog */}
          <Portal>
            <Dialog visible={isDelete} onDismiss={hideDialog}>
              <Dialog.Title>Are you sure?</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">
                  Do you want to delete this workout?
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={onDeleteWorkout}>Yes</Button>
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
    margin: 10,
  },
  tabs: {
    width: '100%',
    height: '5%',
    margin: '2%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabTO: {
    width: "30%",
    height: '100%',
    borderRadius: 20,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default WorkoutScreen;
