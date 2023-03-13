import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from "react-native-safe-area-context"
import { Alert, Pressable, StyleSheet, View } from "react-native"
import { Text, FAB, Modal, Provider, Portal, Divider, TextInput, Snackbar, Dialog, Button } from "react-native-paper";
import { theme } from '../../core/theme';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ProgressIndicator from '../../components/ProgressIndicator';

const WorkoutScreen = ({ navigation }) => {
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkOut,setSelectedWorkOut]=useState({
        id:"",
        workoutId:"",
        name:"",
        packageType:"",
        caloriesBurnt:"",
        duration:"",
        steps:"",
        url:""
    })

    const [visible, setVisible] = useState(false);
    const [iconName, setIconName] = useState('square-edit-outline');
    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [msg, setMsg] = useState("Oops... Something went wrong");
    const [isDelete, setIsDelete] = useState(false);
    const [selectedId, setSelectedId] = useState("")

    const showDialog = () => setIsDelete(true);

    const hideDialog = () => setIsDelete(false);

    const onToggleSnackBar = () => setSnackbarVisible(!visible);
    const onDismissSnackBar = () => setSnackbarVisible(false);

    
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

  

    useEffect(() => {
        const subscriber = firestore()
        .collection('workouts')
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
    }, []);


    const onIconPress = async () => {
        if (!isUpdating) {
            setIconName("content-save-outline");
            setIsUpdating(true);
            return;
        }

        await firestore().collection('workouts').doc(selectedWorkOut.id).update({ ...selectedWorkOut }).then(() => {

            setIconName("square-edit-outline");
            setIsUpdating(false);
            hideModal();

            setMsg("successfully updated the workout details!");
            onToggleSnackBar();

        }).catch((err) => {
            console.log("error while updating the meal...", err)
        });


    }

    const onDeleteWorkout = () => {
        setMsg("Deleting the workout...");
        onToggleSnackBar();

        firestore()
            .collection('workouts')
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
                    Workouts Collection
                </Text>
                <ScrollView keyboardShouldPersistTaps='always' style={{ width: '100%', padding: 5, height: '100%' }}>
                    {
                        workouts.map((workout, index) => {
                            return (
                               
                                    <Pressable
                                        key={index}
                                        style={styles.card}
                                        onPress={() => { showModal(); setSelectedWorkOut(workouts[index]) }}
                                        onLongPress={(e) => { showDialog(); setSelectedId(workouts[index]?.id) }}
                                    >
                                        <View style={styles.cardView}>
                                            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{workout?.name?.charAt(0)}</Text>
                                        </View>
                                        <Text style={{ fontSize: 20 }}>{meal.name}</Text>
                                    </Pressable>
    
                                

                            )
                        })
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
                        // navigation.navigate('ScreenOne');
                        navigation.navigate('');
                    }}>

                </FAB>
           

            {/* update modal */}
            <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalStyle}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'relative' }}>
                            <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: '700' }}>{selectedWorkOut?.name}</Text>
                            <Pressable onPress={() => { onIconPress() }} style={{ position: 'absolute', right: 0 }}>
                                <Icon name={iconName} size={35} color={theme.colors.primary} />
                            </Pressable>
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 15 }}>
                            Work Out Details
                        </Text>
                        <Divider bold={true} style={{ marginBottom: 5 }} />
                    </Modal>

                    {/* delete prompt dialog */}
                    <Portal>
                        <Dialog visible={isDelete} onDismiss={hideDialog}>
                            <Dialog.Title>Are you sure?</Dialog.Title>
                            <Dialog.Content>
                                <Text variant="bodyMedium">Do you want to delete this workout?</Text>
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 10
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
        flexDirection: 'row'
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
        justifyContent: 'center'
    },
    modalStyle: {
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 20,
        flex: 1,
        margin: 10
    }
});


export default WorkoutScreen