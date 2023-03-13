import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Text, Divider, TextInput, Snackbar} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../components/Button';
import firestore from '@react-native-firebase/firestore';
import DropDown from "react-native-paper-dropdown";

const AddWorkOut = ({navigation}) => {
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

  const [showDropDown, setShowDropDown] = useState(false);

  const packages = [
    {
      label: "Weight Gain",
      value: "Weight Gain",
    },
    {
      label: "Fat Loss",
      value: "Fat Loss",
    },
    {
      label: "Regular",
      value: "Regular",
    },
  ];

  const onAddWorkOut = () => {
    if (
      name == ""||
      packageType == ""||
      caloriesBurnt== ""||
      duration== ""||
      steps== ""
    ) {
      setMsg('Please fill all the inputs!');
      onToggleSnackBar();
      return;
    }

    setMsg('Saving the workout...');
    onToggleSnackBar();

    const workout = {
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
        setMsg('Workout Saved Successfully!');
        onToggleSnackBar();
        navigation.navigate('WorkOutHome');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{width: '100%', padding: 5, height: '100%'}}>
             <Text style={{fontSize: 18, fontWeight: '500', marginTop: 15, marginLeft:"25%"}}>
            WorkOut Plan Details
          </Text>
          <DropDown
              label={"Package Type"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={packageType}
              setValue={setPackageType}
              list={packages}     
            />
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            position: 'relative',
          }}>
         

          <TextInput
          mode="outlined"
          label="Name of Exercise"
          value={name}
          onChangeText={e => {
            setName(e);
          }}
          style={{
            backgroundColor: '#fff',
            width: '100%',
            marginTop: 25,
            marginBottom: 25,
          }}
        />
        {/* <TextInput
          mode="outlined"
          label="Package Type"
          value={packageType}
          onChangeText={e => {
            setPackageType(e);
          }}
          
        /> */}

        
        <TextInput
          mode="outlined"
          label="Calories Burnt"
          keyboardType='numeric'  
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
          label="Duration in minutes"
          keyboardType='numeric'
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
          multiline
          numberOfLines={4}
          label="Instructions"
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
