
import { StyleSheet, View, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text, Divider, TextInput, Snackbar } from "react-native-paper";
import { theme } from '../../core/theme';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context"
import Button from '../../components/Button';
import DropDown from "react-native-paper-dropdown";

const fitnessCalculatorFunctions = require("fitness-calculator");


const BMRFinder = () => {

    let [weight, setWeight] = useState()
    let [height, setHeight] = useState()
    let [age, setAge] = useState()
    let [gender, setGender] = useState('')
    let [caloriesNeed, setCaloryNeed] = useState()
    let [BMRVal, setBMRVal] = useState()

    const [showDropDown, setShowDropDown] = useState(false);


    const genderList = [
        {
            label: 'Male',
            value: 'Male'
        },
        {
            label: 'Female',
            value: 'Female'
        }
    ]

    const onSubmit = async () => {

        const myCalorieNeeds = fitnessCalculatorFunctions.calorieNeeds(gender, parseInt(age), parseInt(height), parseInt(weight), "active");
        const BMR_value = fitnessCalculatorFunctions.BMR(gender, parseInt(age), parseInt(height), parseInt(weight));

        setCaloryNeed(myCalorieNeeds);
        setBMRVal(BMR_value)
    }

    console.log("gender", gender)







    return (
        <SafeAreaView style={styles.container}>
            <ScrollView keyboardShouldPersistTaps='always' style={{ width: '100%', padding: 5, height: '100%' }} >
                <View>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 25,
                            fontWeight: 40,
                            marginBottom: 20
                        }}
                    >
                        Calory/BMR Calculator
                    </Text>
                </View>
                <View>
                    <TextInput
                        mode="outlined"
                        label="Weight"
                        placeholder="Weight in Kg"
                        value={weight}
                        onChangeText={(e) => { setWeight(e) }}
                        style={{ backgroundColor: '#fff', width: "100%", marginTop: 10, marginBottom: 25 }}

                    />

                </View>
                <View>
                    <TextInput
                        mode="outlined"
                        label="Height"
                        placeholder="Height in cm"
                        value={height}
                        onChangeText={(e) => { setHeight(e) }}
                        style={{ backgroundColor: '#fff', width: "100%", marginTop: 10, marginBottom: 25 }}

                    />

                </View>
                <View>
                    <TextInput
                        mode="outlined"
                        label="Age"
                        placeholder="Your Age"
                        value={age}
                        onChangeText={(e) => { setAge(e) }}
                        style={{ backgroundColor: '#fff', width: "100%", marginTop: 10, marginBottom: 25 }}

                    />

                </View>
                <View>
                    <DropDown
                        label={"Gender"}
                        mode={"outlined"}
                        visible={showDropDown}
                        showDropDown={() => setShowDropDown(true)}
                        onDismiss={() => setShowDropDown(false)}
                        value={gender}
                        setValue={setGender}
                        list={genderList}
                    />
                </View>

                <View style={styles.button}>
                    <Button
                        mode={'contained'}
                        // style={{ marginVertical: 20 }}
                        onPress={() => {
                            onSubmit()
                        }}>
                        Calculate
                    </Button>
                </View>
                <Divider bold={true} style={{ marginBottom: 5, marginTop: 5 }} />

                {caloriesNeed && <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 20,

                    }}
                >
                    <Text
                        style={{
                            fontSize: 25
                        }}
                    >Calories Needed :</Text>
                    <Text
                        style={{
                            fontSize: 25,
                            color: '#21212199'
                        }}
                    >  {caloriesNeed.balance}</Text>
                </View>}
                {BMRVal && <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 20,

                    }}
                >
                    <Text
                        style={{
                            fontSize: 25
                        }}
                    >BMR Value :</Text>
                    <Text
                        style={{
                            fontSize: 25,
                            color: '#21212199'
                        }}
                    >  {(BMRVal).toFixed(2)}</Text>
                </View>}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 10,
        paddingHorizontal: 10
    },
    button: {
        zIndex: 99
    },
    dropItemText: {
        color: "#070303",
        backgroundColor: 'red',
        fontSize: 50
    },
    button: {
        zIndex: 99,
        marginTop: 20
    }
});

export default BMRFinder