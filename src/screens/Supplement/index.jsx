import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from '../../core/theme';
import { Text, FAB, Modal, Provider, Portal, Divider, TextInput, Snackbar, Dialog, Button } from "react-native-paper";
import { StyleSheet, Pressable, View, Dimensions } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressIndicator from '../../components/ProgressIndicator';

const SupplementScreen = ({ navigation }) => {
    const [isOpenModal, setOpenModal] = useState(false);
    const [iconName, setIconName] = useState('square-edit-outline');
    const [isOpenDeleteModal, setOpenDeleteModal] = useState(false);
    const [supplementList, setSupplementList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [updateData, setUpdateData] = useState({
        id: '',
        instructionList: [
            {
                addList: ''
            }
        ],
        description: ''
    });
    const [selectedSupplementId, setSelectedSupplementId] = useState("");
    const [errMsg, setErrMsg] = useState("")
    const [isOpenSnackBar, setOpenSnackBar] = useState(false);
    const [isUpdating, setUpdating] = useState(false)
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    const closeModal = () => {
        setOpenModal(false)
    }
    const showModal = () => {
        setOpenModal(true)
    }

    const closeDeleteDialog = () => {
        setOpenDeleteModal(false)
    }


    const openDeleteDialog = () => {
        setOpenDeleteModal(true)
    }

    const onToggleSnackBar = () => {
        setOpenSnackBar(!isOpenModal)
    }

    const onDismissSnackBar = () => {
        setOpenSnackBar(false)
    }


    const DeleteSuplement = async () => {
        setErrMsg("Deleting the supplement details ...")
        onToggleSnackBar()
        await firestore().collection('supplement').doc(selectedSupplementId).delete().then(() => {
            setErrMsg("Deleted Supplement Details")
            closeDeleteDialog()
        }).catch((err) => {
            setErrMsg("Something Went Wrong ! Try Again")
            onToggleSnackBar()
        })
    }

    const GetSupplementDetails = async () => {

        // let list = 
        const subscriber = await firestore().collection('supplement').where('tenantId', '==', user.uid).onSnapshot(querySnapshot => {
            const supplements = [];
            querySnapshot.forEach(documentSnapshot => {
                supplements.push(documentSnapshot.data());
            });

            setSupplementList(supplements);
            setIsLoading(false)
        });
        return () => subscriber();
    }

    const UpdateupplementDetails = async () => {
        if (!isUpdating) {
            setIconName('content-save-outline')
            setUpdating(true)
            return
        }

        await firestore().collection('supplement').doc(updateData.id).update({ ...updateData }).then(() => {
            setIconName('square-edit-outline');
            setUpdating(false);
            closeModal();
            setErrMsg("Updated Supplement Details Successfully")
            onToggleSnackBar()
        }).catch((err) => {
            setErrMsg("Can't Updated Supplement Details. Try Again !!!", err)
            onToggleSnackBar()
        })
    }

    useEffect(() => {
        if (user) {
            GetSupplementDetails()
        }
    }, [user])

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);



    return (
        <Provider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.headerTxt}>
                    Supplements
                </Text>
                {isLoading ?
                    <ProgressIndicator isLoading={isLoading} />
                    :

                    <ScrollView keyboardShouldPersistTaps='always' style={{ width: '100%', padding: 5, height: '100%' }} >
                        {

                            supplementList?.length == 0 ?
                                (
                                    <View style={{ height: Dimensions.get('window').height - 180, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>
                                            No records to display...
                                        </Text>
                                    </View>
                                ) :
                                (supplementList.map((supplement, index) => {
                                    return (
                                        <Pressable
                                            key={index}
                                            style={styles.card}
                                            onPress={() => {
                                                showModal();
                                                setUpdateData(supplement)
                                            }}
                                            onLongPress={(e) => {
                                                openDeleteDialog();
                                                setSelectedSupplementId(supplement.id)
                                            }}
                                        >
                                            <View style={styles.cardView}>
                                                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>

                                                    {supplement?.supplementName?.charAt(0)}
                                                </Text>
                                            </View>
                                            <Text style={{ fontSize: 20 }}>
                                                {supplement.supplementName}
                                            </Text>
                                        </Pressable>
                                    )
                                }))
                        }

                    </ScrollView>
                }

                <FAB
                    icon="plus"
                    style={styles.FAB}
                    color="#fff"
                    size='medium'
                    onPress={() => {
                        navigation.navigate('AddSupplement');
                    }}>

                </FAB>
                <Portal>
                    <Modal
                        visible={isOpenModal}
                        onDismiss={closeModal}
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
                                style={{ fontSize: 20, textAlign: 'center', fontWeight: '700' }}>
                            </Text>
                            <Pressable
                                onPress={() => {
                                    UpdateupplementDetails();
                                }}
                                style={{ position: 'absolute', right: 0 }}>
                                <Icon name={iconName} size={35} color={theme.colors.primary} />
                            </Pressable>
                        </View>
                        <Text style={{ fontSize: 28, fontWeight: '500', marginTop: 15 }}>
                            Supplement Details
                        </Text>
                        <Divider bold={true} style={{ marginBottom: 5 }} />
                        <View style={{ marginTop: 10 }}>
                            <TextInput
                                mode="outlined"
                                label="Supplement Name"
                                placeholder="Supplement Name"
                                value={updateData.supplementName}
                                onChangeText={(e) => {
                                    const newSelectedSupplement = { ...updateData };
                                    newSelectedSupplement.supplementName = e;
                                    setUpdateData(newSelectedSupplement);
                                }}
                                style={{ backgroundColor: '#fff', width: "100%", }}
                                disabled={!isUpdating}

                            />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <TextInput
                                mode="outlined"
                                label="Supplement Description"
                                placeholder="Supplement Description"
                                value={updateData.description}
                                onChangeText={(e) => {
                                    const newSelectedSupplement = { ...updateData };
                                    newSelectedSupplement.description = e;
                                    setUpdateData(newSelectedSupplement);
                                }}
                                // onChangeText={(e) => { setDescription(e) }}
                                style={{ backgroundColor: '#fff', width: "100%", }}
                                disabled={!isUpdating}

                            />
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 15 }}>
                            Instructions
                        </Text>
                        <Divider bold={true} style={{ marginBottom: 5 }} />
                        <View
                            style={{
                                flexDirection: 'column',
                                marginHorizontal: 10,
                                width: '100%',
                            }}>
                            {updateData?.instructionList?.map((supplement, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={{
                                            flexDirection: 'row',
                                            width: '125%',
                                            padding: 5,
                                            marginBottom: 5,
                                            alignItems: 'center',
                                        }}>
                                        <TextInput
                                            mode="flat"
                                            label={`Instruction ${index + 1}`}
                                            placeholder={`Instruction ${index + 1}`}
                                            value={updateData.instructionList[index].addList}
                                            onChangeText={e => {
                                                const newSelectedSupplement = { ...updateData };
                                                newSelectedSupplement.instructionList[index].addList = e;
                                                setUpdateData(newSelectedSupplement);
                                            }}
                                            style={{ backgroundColor: '#fff', width: '75%' }}
                                            disabled={!isUpdating}
                                        />
                                    </View>
                                )
                            })}
                        </View>
                    </Modal>

                    <Portal>
                        <Dialog visible={isOpenDeleteModal} onDismiss={closeDeleteDialog}>
                            <Dialog.Title>Are you sure?</Dialog.Title>
                            <Dialog.Content>
                                <Text variant="bodyMedium">
                                    Do you want to delete this supplement details?
                                </Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button
                                    onPress={DeleteSuplement}
                                >Yes</Button>
                                <Button
                                    onPress={closeDeleteDialog}
                                >No</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </Portal>
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
    modalStyle: {
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 20,
        flex: 1,
        justifyContent: 'flex-start',
        margin: 10,
        overflow: 'scroll',
    },
});

export default SupplementScreen