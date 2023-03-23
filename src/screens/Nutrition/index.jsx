import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from "react-native-safe-area-context"
import { Pressable, StyleSheet, View, Dimensions } from "react-native"
import { Text, FAB, Modal, Provider, Portal, Divider, TextInput, Snackbar, Dialog, Button } from "react-native-paper";
import { theme } from '../../core/theme';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ProgressIndicator from '../../components/ProgressIndicator';

const NutritionScreen = ({ navigation }) => {
    const [mealPlans, setMealPlans] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState({
        id: "",
        name: "",
        breakfast: [
            {
                name: "",
                portion: ""
            },
            {
                name: "",
                portion: ""
            }
        ],
        lunch: [
            {
                name: "",
                portion: ""
            },
            {
                name: "",
                portion: ""
            }
        ],
        dinner: [
            {
                name: "",
                portion: ""
            },
            {
                name: "",
                portion: ""
            }
        ],
    }
    );
    const [visible, setVisible] = useState(false);
    const [iconName, setIconName] = useState('square-edit-outline');
    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [msg, setMsg] = useState("Oops... Something went wrong");
    const [isDelete, setIsDelete] = useState(false);
    const [selectedId, setSelectedId] = useState("")
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    const showDialog = () => setIsDelete(true);

    const hideDialog = () => setIsDelete(false);

    const onToggleSnackBar = () => setSnackbarVisible(!visible);
    const onDismissSnackBar = () => setSnackbarVisible(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    useEffect(() => {
        // const subscriber = firestore()
        //     .collection('meals')
        //     .onSnapshot(querySnapshot => {
        //         const meals = [];

        //         querySnapshot.forEach(documentSnapshot => {
        //             meals.push(documentSnapshot.data());
        //         });

        //         setMealPlans(meals);
        //         setIsLoading(false);
        //     });
        if (user) {
            const subscriber = firestore()
                .collection('meals')
                .where('tenantId', '==', user.uid)
                .onSnapshot(querySnapshot => {
                    const meals = [];

                    querySnapshot.forEach(documentSnapshot => {
                        meals.push(documentSnapshot.data());
                    });

                    setMealPlans(meals);
                    setIsLoading(false);
                });
            // Unsubscribe from events when no longer in use
            return () => subscriber();
        }

    }, [user]);

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
        if (!isUpdating) {
            setIconName("content-save-outline");
            setIsUpdating(true);
            return;
        }

        await firestore().collection('meals').doc(selectedMeal.id).update({ ...selectedMeal }).then(() => {

            setIconName("square-edit-outline");
            setIsUpdating(false);
            hideModal();

            setMsg("successfully updated the meal!");
            onToggleSnackBar();

        }).catch((err) => {
            console.log("error while updating the meal...", err)
        });


    }

    const onDeleteMeal = () => {
        setMsg("Deleting the meal...");
        onToggleSnackBar();

        firestore()
            .collection('meals')
            .doc(selectedId)
            .delete()
            .then(() => {
                hideDialog();

                setMsg("Successfully deleted!");
                onToggleSnackBar();
            }).catch((err) => {
                setMsg("Oops... Something went wrong!");
                onToggleSnackBar();
            });
    }

    return (
        <Provider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.headerTxt}>
                    Meal Plans
                </Text>
                <ScrollView keyboardShouldPersistTaps='always' style={{ width: '100%', padding: 5, height: '100%' }} >
                    {
                        mealPlans?.length == 0 ?
                            (
                                <View style={{ height: Dimensions.get('window').height - 180, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>
                                        No records to display...
                                    </Text>
                                </View>
                            ) :
                            (
                                mealPlans?.map((meal, index) => {
                                    return (
                                        <Pressable
                                            key={index}
                                            style={styles.card}
                                            onPress={() => { showModal(); setSelectedMeal(mealPlans[index]) }}
                                            onLongPress={(e) => { showDialog(); setSelectedId(mealPlans[index]?.id) }}
                                        >
                                            <View style={styles.cardView}>
                                                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{meal?.name?.charAt(0)}</Text>
                                            </View>
                                            <Text style={{ fontSize: 20 }}>{meal.name}</Text>
                                        </Pressable>

                                    )
                                })
                            )
                    }
                </ScrollView>
                {
                    isLoading &&
                    <ProgressIndicator isLoading={isLoading} />
                }

                <FAB
                    icon="plus"
                    style={styles.FAB}
                    color="#fff"
                    size='medium'
                    onPress={() => {
                        navigation.navigate('AddMeal');
                        // showAddMealModal()
                    }}>

                </FAB>

                {/* update modal */}
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalStyle}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'relative' }}>
                            <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: '700' }}>{selectedMeal?.name}</Text>
                            <Pressable onPress={() => { onIconPress() }} style={{ position: 'absolute', right: 0 }}>
                                <Icon name={iconName} size={35} color={theme.colors.primary} />
                            </Pressable>
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 15 }}>
                            Breakfast
                        </Text>
                        <Divider bold={true} style={{ marginBottom: 5 }} />

                        <View style={{ flexDirection: 'column', marginHorizontal: 10, width: '100%', }}>
                            {
                                selectedMeal?.breakfast?.map((food, index) => {
                                    return (
                                        <View key={index} style={{ flexDirection: 'row', width: '90%', padding: 5, marginBottom: 5, alignItems: 'center' }}>
                                            <TextInput
                                                mode="flat"
                                                label={`Meal ${index + 1}`}
                                                placeholder={`Meal ${index + 1}`}
                                                value={selectedMeal.breakfast[index].name}
                                                onChangeText={(e) => {
                                                    const newSelectedMeal = { ...selectedMeal };
                                                    newSelectedMeal.breakfast[index].name = e;
                                                    setSelectedMeal(newSelectedMeal);
                                                }}
                                                style={{ backgroundColor: '#fff', width: "75%" }}
                                                disabled={!isUpdating}
                                            />
                                            <Text style={{ marginHorizontal: 10 }}>:</Text>
                                            <TextInput
                                                mode="flat"
                                                value={selectedMeal.breakfast[index].portion}
                                                onChangeText={(e) => {
                                                    const newSelectedMeal = { ...selectedMeal };
                                                    newSelectedMeal.breakfast[index].portion = e;
                                                    setSelectedMeal(newSelectedMeal);
                                                }}
                                                style={{ backgroundColor: '#fff' }}
                                                disabled={!isUpdating}
                                            />
                                        </View>
                                    )
                                })
                            }
                        </View>

                        <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 25 }}>
                            Lunch
                        </Text>
                        <Divider bold={true} style={{ marginBottom: 5 }} />
                        <View style={{ flexDirection: 'column', marginHorizontal: 10, width: '100%', }}>
                            {
                                selectedMeal?.lunch?.map((food, index) => {
                                    return (
                                        <View key={index} style={{ flexDirection: 'row', width: '90%', padding: 5, marginBottom: 5, alignItems: 'center' }}>
                                            <TextInput
                                                mode="flat"
                                                label={`Meal ${index + 1}`}
                                                placeholder={`Meal ${index + 1}`}
                                                value={selectedMeal.lunch[index].name}
                                                onChangeText={(e) => {
                                                    const newSelectedMeal = { ...selectedMeal };
                                                    newSelectedMeal.lunch[index].name = e;
                                                    setSelectedMeal(newSelectedMeal);
                                                }}
                                                style={{ backgroundColor: '#fff', width: "75%" }}
                                                disabled={!isUpdating}
                                            />
                                            <Text style={{ marginHorizontal: 10 }}>:</Text>
                                            <TextInput
                                                mode="flat"
                                                value={selectedMeal.lunch[index].portion}
                                                onChangeText={(e) => {
                                                    const newSelectedMeal = { ...selectedMeal };
                                                    newSelectedMeal.lunch[index].portion = e;
                                                    setSelectedMeal(newSelectedMeal);
                                                }}
                                                style={{ backgroundColor: '#fff' }}
                                                disabled={!isUpdating}
                                            />
                                        </View>

                                    )
                                })
                            }
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 25 }}>
                            Dinner
                        </Text>
                        <Divider bold={true} style={{ marginBottom: 5 }} />
                        <View style={{ flexDirection: 'column', width: '100%', }}>
                            {
                                selectedMeal?.dinner?.map((food, index) => {
                                    return (
                                        <View key={index} style={{ flexDirection: 'row', width: '90%', padding: 5, marginBottom: 5, alignItems: 'center' }}>
                                            <TextInput
                                                mode="flat"
                                                label={`Meal ${index + 1}`}
                                                placeholder={`Meal ${index + 1}`}
                                                value={selectedMeal.dinner[index].name}
                                                onChangeText={(e) => {
                                                    const newSelectedMeal = { ...selectedMeal };
                                                    newSelectedMeal.dinner[index].name = e;
                                                    setSelectedMeal(newSelectedMeal);
                                                }}
                                                style={{ backgroundColor: '#fff', width: "75%" }}
                                                disabled={!isUpdating}
                                            />
                                            <Text style={{ marginHorizontal: 10 }}>:</Text>
                                            <TextInput
                                                mode="flat"
                                                value={selectedMeal.dinner[index].portion}
                                                onChangeText={(e) => {
                                                    const newSelectedMeal = { ...selectedMeal };
                                                    newSelectedMeal.dinner[index].portion = e;
                                                    setSelectedMeal(newSelectedMeal);
                                                }}
                                                style={{ backgroundColor: '#fff' }}
                                                disabled={!isUpdating}
                                            />
                                        </View>

                                    )
                                })
                            }
                        </View>
                    </Modal>

                    {/* delete prompt dialog */}
                    <Portal>
                        <Dialog visible={isDelete} onDismiss={hideDialog}>
                            <Dialog.Title>Are you sure?</Dialog.Title>
                            <Dialog.Content>
                                <Text variant="bodyMedium">Do you want to delete this meal?</Text>
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    headerTxt: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 20
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
        width: "100%",
        height: 75,
        backgroundColor: "white",
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
        overflow: 'scroll'
    }
});

export default NutritionScreen