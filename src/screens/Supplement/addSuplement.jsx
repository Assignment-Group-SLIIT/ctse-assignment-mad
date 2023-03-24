import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../core/theme';
import { Text, Divider, TextInput, Snackbar } from "react-native-paper";
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../components/Button';
import { SafeAreaView } from "react-native-safe-area-context"
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const AddSuppplement = ({ navigation }) => {

    const [supplementName, setSupplementName] = useState("");
    const [description, setDescription] = useState("")
    const [instructionList, setInstructionList] = useState([{ addList: '' }]);
    const [errMsg, setErrMsg] = useState("")
    const [isOpenSnackBar, setOpenSnackBar] = useState(false);

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    const onToggleSnackBar = () => {
        setOpenSnackBar(true)
    }

    const onDismissSnackBar = () => {
        setOpenSnackBar(false)
    }

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);


    const AddInstructions = async () => {
        if (supplementName == "" || description == "" || instructionList[0].addList == '') {
            setErrMsg("Please fill the fields !!")
        } else {
            const supplementData = {
                tenantId: user?.uid,
                id: '',
                supplementName,
                instructionList,
                description
            };

            firestore().collection('supplement').add(supplementData).then((value) => {
                let response = firestore().collection('supplement').doc(value.id).update({ 'id': value.id });
                setErrMsg("Supplement Added Succesfully !!!");
                onToggleSnackBar();
                navigation.navigate("SupplementHome")
            }).catch((err) => {
                setErrMsg("Something Went Wrong !! Try Again");
                onToggleSnackBar();
            })

        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView keyboardShouldPersistTaps='always' style={{ width: '100%', padding: 5, height: '100%' }} >
                <View>
                    <TextInput
                        mode="outlined"
                        label="Name of your Supplement"
                        placeholder="Name of your Supplement"
                        value={supplementName}
                        onChangeText={(e) => { setSupplementName(e) }}
                        style={{ backgroundColor: '#fff', width: "100%", marginTop: 10, marginBottom: 25 }}

                    />

                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: '100%',
                        marginBottom: 10

                    }}
                >
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>
                        Add Instructions
                    </Text>

                    <Pressable
                        onPress={() => {
                            setInstructionList([...instructionList, { addList: '' }]);
                        }}
                        style={{ position: 'absolute', right: 0 }}>
                        <Icon name="playlist-plus" size={35} color={theme.colors.primary} />
                    </Pressable>
                </View>
                <Divider bold={true} style={{ marginBottom: 5 }} />
                <View
                    style={{
                        flexDirection: 'column',
                        marginHorizontal: 10,
                        width: '100%',
                    }}>
                    {instructionList?.map((instruction, index) => {
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
                                    label={`Instruction ${index + 1}`}
                                    placeholder={`Instruction ${index + 1}`}
                                    value={instructionList[index].addList}
                                    onChangeText={e => {
                                        const instructionsList = [...instructionList];
                                        instructionsList[index].addList = e;
                                        setInstructionList(instructionsList);
                                    }}
                                    style={{ backgroundColor: '#fff', width: '100%' }}
                                />
                                {instructionList.length !== 1 && (
                                    <Pressable
                                        onPress={() => {
                                            const instructionsList = [...instructionList];
                                            instructionsList.splice(index, 1);
                                            setInstructionList(instructionsList);
                                        }}>
                                        <Icon name="delete-forever" size={40} color="red" />
                                    </Pressable>
                                )}
                            </View>
                        );
                    })}
                </View>
                <Divider bold={true} style={{ marginBottom: 5, marginTop: 5 }} />
                <View >
                    <TextInput
                        mode="outlined"
                        label="Supplement Description"
                        placeholder="Supplement Description"
                        value={description}
                        onChangeText={(e) => { setDescription(e) }}
                        style={{ backgroundColor: '#fff', width: "100%", }}

                    />
                </View>



                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: '100%',
                        position: 'relative',
                        marginTop: 20,
                    }}></View>
                <Divider bold={true} style={{ marginBottom: 5 }} />
                <View style={styles.button}>
                    <Button
                        mode={'contained'}
                        // style={{ marginVertical: 20 }}
                        onPress={() => {
                            AddInstructions()
                        }}>
                        Add Supplement
                    </Button>
                </View>


            </ScrollView>

            <Snackbar
                visible={isOpenSnackBar}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Dismiss',
                    onPress: () => {
                        onDismissSnackBar();
                    },
                }}>
                {errMsg}
            </Snackbar>
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
    }
});

export default AddSuppplement