import {StyleSheet, View, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, Divider, TextInput, Snackbar} from 'react-native-paper';
import {theme} from '../../core/theme';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../components/Button';
import firestore from '@react-native-firebase/firestore';

const AddWorkOut = ({navigation}) => {
  const [workoutId, setWorkoutId] = useState('');
  const [name, setName] = useState('');
  const [packageType, setPackageType] = useState('');
  const [caloriesBurnt, setCaloriesBurnt] = useState('');
  const [duration, setDuration] = useState('');
  const [steps, setSteps] = useState('');
  const [url, setUrl] = useState('');

  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState('Oops... Something went wrong');

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const onAddWorkOut = () => {
    if (
      id="",
      name,
      workoutId, 
      packageType,
      caloriesBurnt. 
      duration, 
      steps,
      url 
    ) {
      setMsg('Please fill all the inputs!');
      onToggleSnackBar();
      return;
    }

    setMsg('Saving the meal...');
    onToggleSnackBar();

    const workout = {
      workoutId,
      name,
      packageType,
      caloriesBurnt,
      duration,
      steps,
      url,
    };

    firestore()
      .collection('workouts')
      .add(workout)
      .then(value => {
        firestore().collection('workouts').doc(value.id).update({id: value.id});
        setMsg('Meal Saved Successfully!');
        onToggleSnackBar();
        navigation.navigate('WorkOutsHome');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{width: '100%', padding: 5, height: '100%'}}>
        <TextInput
          mode="outlined"
          label="WorkOut ID XX1234"
          // placeholder="Name of you meal"
          value={workoutId}
          onChangeText={e => {
            setWorkoutId(e);
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
            WorkOut Plan Details
          </Text>

          <TextInput
          mode="outlined"
          label="Name of Exercise"
          // placeholder="Name of you meal"
          value={name}
          onChangeText={e => {
            setName(e);
          }}
          style={{
            backgroundColor: '#fff',
            width: '100%',
            marginTop: 10,
            marginBottom: 25,
          }}
        />
        <TextInput
          mode="outlined"
          label="Package Type"
          // placeholder="Name of you meal"
          value={packageType}
          onChangeText={e => {
            setPackageType(e);
          }}
          style={{
            backgroundColor: '#fff',
            width: '100%',
            marginTop: 10,
            marginBottom: 25,
          }}
        />
        <TextInput
          mode="outlined"
          label="Calories Burnt"
          // placeholder="Name of you meal"
          value={caloriesBurnt}
          onChangeText={e => {
            setCaloriesBurnt(e);
          }}
          style={{
            backgroundColor: '#fff',
            width: '100%',
            marginTop: 10,
            marginBottom: 25,
          }}
        />
         <TextInput
          mode="outlined"
          label="Duration"
          // placeholder="Name of you meal"
          value={caloriesBurnt}
          onChangeText={e => {
            setDuration(e);
          }}
          style={{
            backgroundColor: '#fff',
            width: '100%',
            marginTop: 10,
            marginBottom: 25,
          }}
        />
         <TextInput
          mode="outlined"
          label="Instructions"
          // placeholder="Name of you meal"
          value={steps}
          onChangeText={e => {
            setSteps(e);
          }}
          style={{
            backgroundColor: '#fff',
            width: '100%',
            marginTop: 10,
            marginBottom: 25,
          }}
        />
        <TextInput
          mode="outlined"
          label="Video Link"
          // placeholder="Name of you meal"
          value={url}
          onChangeText={e => {
            setUrl(e);
          }}
          style={{
            backgroundColor: '#fff',
            width: '100%',
            marginTop: 10,
            marginBottom: 25,
          }}
        />
          
           
     
        </View>


         
        <Divider bold={true} style={{marginBottom: 5}} />
        

        <Button
          mode={'contained'}
          style={{marginVertical: 20}}
          onPress={() => {
            onAddWorkOut();
          }}>
          Add WorkOut
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

export default AddWorkOut;
