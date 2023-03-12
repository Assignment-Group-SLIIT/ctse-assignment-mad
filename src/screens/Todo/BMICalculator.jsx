import React, { useState } from 'react';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {theme} from '../../core/theme';
import {StyleSheet, View, Pressable, SafeAreaView} from 'react-native';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { Alert } from 'react-native/Libraries/Alert/Alert';
import { TouchableOpacity } from 'react-native-gesture-handler';

const BMICalculator = () => {
   const [weight, setWeight] = useState('');
   const [height, setHeight] = useState('');
   const [bmi, setBmi] = useState('');
   const [description, setDescription] = useState('');

   const calculation = () => {
      const bmi = weight / ((height /100) * (height/100))
      setBmi(bmi.toFixed(1))
      console.log("ddbdbd")
      if(bmi < 18.5){
         setDescription('Underweight, eat more!!!')
      }else if(bmi >= 18.5){
         setDescription('Normal, keep it up!!!')
      }else if(bmi >=25 && bmi<=29.9){
         setDescription('Overweight, Start working out!!!')
      }else if(bmi >= 30){
         setDescription('Obese, Hit the gym!!!')

      }
   }

   const refresh = () => {
     setBmi('')
     setWeight('')
     setHeight('')
     setDescription('')
   }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Find your BMI </Text>
        <Icon name="smile-wink" size={40} color={theme.colors.primary} />
      </View>
      <View style={styles.display}>
        <View style={styles.displayBox}>
         <Text style={styles.displayBmi}>{bmi}</Text>
         <Text style={styles.displaydes}>{description}</Text>
        </View>
        <View style={styles.displayheight}>
        <TextInput
            value={height}
            onChangeText={(text) => setHeight(text)}
            placeholder="Height in cm"
            keyboardType="numeric"
            style={{backgroundColor: '#9FE2BF', width: '100%', fontSize:30}}
         />
        </View>
        <View style={styles.displayweight}>
         <TextInput
            value={weight}
            onChangeText={(text) => setWeight(text)}
            placeholder="Weight in Kg"
            keyboardType="numeric"
            style={{backgroundColor: '#9FE2BF', width: '100%', fontSize:30}}
         />
        </View>
        <Button
          mode={'contained'}
          style={{marginVertical: 20}}
          onPress={calculation}>
          Calculate BMI
        </Button>
        <Button
          mode={'contained'}
          style={{marginVertical: 20}}
          onPress={refresh}>
          Refresh
        </Button>
      </View>
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
  title: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },

  titleText: {
    marginTop: 5,
    paddingRight: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  display: {
   flexDirection:'column',
   marginBottom:'10%'
  },
  displayBox: {
    borderColor: '#DE3163',
    backgroundColor: '#DE3163',
    borderWidth:5,
    width: '100%',
    height: '25%',
    justifyContent:'center',
    paddingBottom:10
  },
  displayBmi: {
   textAlign: 'center', 
   fontSize: 50,
   color:'white'
  },
  displaydes: {
   textAlign: 'center', 
   fontSize: 30,
   color:'white'

  },
  displayheight: {
   // borderColor: '#40E0D0',
   // borderWidth:5,    
   width: '100%',
   //height: '25%',
   paddingTop:30

  },
  displayweight: {
   // borderColor: '#9FE2BF',
   // borderWidth:5,    
   width: '100%',
   //height: '25%',
   paddingBottom:80
  },

});

export default BMICalculator;
