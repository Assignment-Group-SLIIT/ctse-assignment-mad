import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Text, Divider, TextInput, Snackbar} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../components/Button';
import firestore from '@react-native-firebase/firestore';
import DropDown from "react-native-paper-dropdown";

const WeightConverter = ({navigation}) => {
  const [weight, setWeight] = useState('');
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{width: '100%', padding: 5, height: '100%'}}>
             <Text style={{fontSize: 18, fontWeight: '500', marginTop: 15, marginLeft:"25%", letterSpacing:3}}>
           WEIGHT CONVERTER
          </Text>
          
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
          label="Enter value for weight"
          value={weight}
          onChangeText={e => {
            setWeight(e);
          }}
          style={{
            backgroundColor: '#fff',
            width: '100%',
            marginTop: 25,
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

export default WeightConverter;
