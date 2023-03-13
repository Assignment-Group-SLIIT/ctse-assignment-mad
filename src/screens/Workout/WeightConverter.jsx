import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Text, Divider, TextInput, Snackbar} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../components/Button';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const WeightConverter = () => {
  const [weight, setWeight] = useState('');
  const [calculatedWeight, setCalculatedWeight] = useState('');
  const [visible, setVisible] = useState(false);

  const data = [
    {
      label: 'Kilograms to Pounds',
    },
    {
      label: 'Pounds to Kilograms',
    },
    {
      label: 'Kilograms to Stones',
    },
  ];

  const convertWeight = e => {
    console.log(e.label);
    if (e.label == 'Kilograms to Pounds') {
      let calcWeight = parseFloat(weight) * 2.205;
      setCalculatedWeight('Your Weight is ' + calcWeight.toFixed(2) + ' Pounds');
    } else if (e.label == 'Pounds to Kilograms') {
      let calcWeight = parseFloat(weight) / 2.205;
      setCalculatedWeight('Your Weight is ' + calcWeight.toFixed(2) + ' Kilograms');
    } else if (e.label == 'Kilograms to Stones') {
      let calcWeight = parseFloat(weight) / 6.34;
      setCalculatedWeight('Your Weight is ' + calcWeight.toFixed(2) + 'Stones');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{width: '100%', padding: 5, height: '100%'}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 15,
            marginLeft: '18%',
            letterSpacing: 3,
            
          }}>
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

          <Divider bold={true} style={{marginBottom: 5}} />
        </View>
        <RadioButtonRN
          data={data}
          selectedBtn={e => convertWeight(e)}
          icon={<Icon name="check-circle" size={25} color="#2c9dd1" />}
        />

<Divider bold={true} style={{marginBottom: 60}} />

        <Text
          style={{
            fontSize: 24,
            fontWeight: '500',
            marginTop: 15,
            marginLeft: '8%',
          }}>
          {calculatedWeight}
        </Text>
      </ScrollView>
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
