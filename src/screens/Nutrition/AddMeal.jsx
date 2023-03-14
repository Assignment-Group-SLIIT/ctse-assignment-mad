import { StyleSheet, View, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text, Divider, TextInput, Snackbar } from "react-native-paper";
import { theme } from '../../core/theme';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context"
import Button from '../../components/Button';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const AddMeal = ({ navigation }) => {
    const [name, setName] = useState("");

    const [breakfast, setBreakfast] = useState([{ name: "", portion: "" }]);
    const [lunch, setLunch] = useState([{ name: "", portion: "" }]);
    const [dinner, setDinner] = useState([{ name: "", portion: "" }]);

    const [visible, setVisible] = useState(false);
    const [msg, setMsg] = useState("Oops... Something went wrong");

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const onAddMeal = () => {

        if (meal == "" || breakfast[0].name == "" || lunch[0].name == "" || dinner[0].name == "") {
            setMsg("Please fill all the inputs!");
            onToggleSnackBar();
            return;
        }

        setMsg("Saving the meal...");
        onToggleSnackBar();

        const meal = {
            id: "",
            tenantId: user?.uid,
            name,
            breakfast,
            lunch,
            dinner
        };

        firestore()
            .collection('meals')
            .add(meal)
            .then((value) => {
                firestore().collection('meals').doc(value.id).update({ 'id': value.id });
                setMsg("Meal Saved Successfully!");
                onToggleSnackBar();
                navigation.navigate("NutritionHome");
            });

    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView keyboardShouldPersistTaps='always' style={{ width: '100%', padding: 5, height: '100%' }} >
                <TextInput
                    mode="outlined"
                    label="Name of you meal"
                    // placeholder="Name of you meal"
                    value={name}
                    onChangeText={(e) => { setName(e) }}
                    style={{ backgroundColor: '#fff', width: "100%", marginTop: 10, marginBottom: 25 }}

                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', position: 'relative' }}>
                    <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 15 }}>
                        Breakfast
                    </Text>

                    <Pressable onPress={() => { setBreakfast([...breakfast, { name: "", portion: "" }]); }} style={{ position: 'absolute', right: 0 }}>
                        <Icon name="playlist-plus" size={35} color={theme.colors.primary} />
                    </Pressable>
                </View>
                <Divider bold={true} style={{ marginBottom: 5 }} />
                <View style={{ flexDirection: 'column', marginHorizontal: 10, width: '100%', }}>
                    {
                        breakfast?.map((food, index) => {
                            return (
                                <View key={index} style={{ flexDirection: 'row', width: '90%', padding: 5, marginBottom: 5, alignItems: 'center' }}>
                                    <TextInput
                                        mode="flat"
                                        label={`Meal ${index + 1}`}
                                        placeholder={`Meal ${index + 1}`}
                                        value={breakfast[index].name}
                                        onChangeText={(e) => {
                                            const list = [...breakfast];
                                            list[index].name = e;
                                            setBreakfast(list);
                                        }}
                                        style={{ backgroundColor: '#fff', width: "60%" }}

                                    />
                                    <Text style={{ marginHorizontal: 10 }}>:</Text>
                                    <TextInput
                                        mode="flat"
                                        value={breakfast[index].portion}
                                        onChangeText={(e) => {
                                            const list = [...breakfast];
                                            list[index].portion = e;
                                            setBreakfast(list);
                                        }}
                                        style={{ backgroundColor: '#fff', width: "30%" }}

                                    />
                                    {
                                        breakfast.length !== 1 &&
                                        (
                                            <Pressable onPress={() => {
                                                const list = [...breakfast];
                                                list.splice(index, 1);
                                                setBreakfast(list);
                                            }}>
                                                <Icon name="delete-forever" size={40} color="red" />
                                            </Pressable>
                                        )
                                    }
                                </View>
                            )
                        })
                    }
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', position: 'relative', marginTop: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 15 }}>
                        Lunch
                    </Text>

                    <Pressable onPress={() => { setLunch([...lunch, { name: "", portion: "" }]); }} style={{ position: 'absolute', right: 0 }}>
                        <Icon name="playlist-plus" size={35} color={theme.colors.primary} />
                    </Pressable>
                </View>
                <Divider bold={true} style={{ marginBottom: 5 }} />
                <View style={{ flexDirection: 'column', marginHorizontal: 10, width: '100%', }}>
                    {
                        lunch?.map((food, index) => {
                            return (
                                <View key={index} style={{ flexDirection: 'row', width: '90%', padding: 5, marginBottom: 5, alignItems: 'center' }}>
                                    <TextInput
                                        mode="flat"
                                        label={`Meal ${index + 1}`}
                                        placeholder={`Meal ${index + 1}`}
                                        value={lunch[index].name}
                                        onChangeText={(e) => {
                                            const list = [...lunch];
                                            list[index].name = e;
                                            setLunch(list);
                                        }}
                                        style={{ backgroundColor: '#fff', width: "60%" }}

                                    />
                                    <Text style={{ marginHorizontal: 10 }}>:</Text>
                                    <TextInput
                                        mode="flat"
                                        value={lunch[index].portion}
                                        onChangeText={(e) => {
                                            const list = [...lunch];
                                            list[index].portion = e;
                                            setLunch(list);
                                        }}
                                        style={{ backgroundColor: '#fff', width: "30%" }}

                                    />
                                    {
                                        lunch.length !== 1 &&
                                        (
                                            <Pressable onPress={() => {
                                                const list = [...lunch];
                                                list.splice(index, 1);
                                                setLunch(list);
                                            }}>
                                                <Icon name="delete-forever" size={40} color="red" />
                                            </Pressable>
                                        )
                                    }
                                </View>
                            )
                        })
                    }
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', position: 'relative', marginTop: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 15 }}>
                        Dinner
                    </Text>

                    <Pressable onPress={() => { setDinner([...dinner, { name: "", portion: "" }]); }} style={{ position: 'absolute', right: 0 }}>
                        <Icon name="playlist-plus" size={35} color={theme.colors.primary} />
                    </Pressable>
                </View>
                <Divider bold={true} style={{ marginBottom: 5 }} />
                <View style={{ flexDirection: 'column', marginHorizontal: 10, width: '100%', }}>
                    {
                        dinner?.map((food, index) => {
                            return (
                                <View key={index} style={{ flexDirection: 'row', width: '90%', padding: 5, marginBottom: 5, alignItems: 'center' }}>
                                    <TextInput
                                        mode="flat"
                                        label={`Meal ${index + 1}`}
                                        placeholder={`Meal ${index + 1}`}
                                        value={dinner[index].name}
                                        onChangeText={(e) => {
                                            const list = [...dinner];
                                            list[index].name = e;
                                            setDinner(list);
                                        }}
                                        style={{ backgroundColor: '#fff', width: "60%" }}

                                    />
                                    <Text style={{ marginHorizontal: 10 }}>:</Text>
                                    <TextInput
                                        mode="flat"
                                        value={dinner[index].portion}
                                        onChangeText={(e) => {
                                            const list = [...dinner];
                                            list[index].portion = e;
                                            setDinner(list);
                                        }}
                                        style={{ backgroundColor: '#fff', width: "30%" }}

                                    />
                                    {
                                        dinner.length !== 1 &&
                                        (
                                            <Pressable onPress={() => {
                                                const list = [...dinner];
                                                list.splice(index, 1);
                                                setDinner(list);
                                            }}>
                                                <Icon name="delete-forever" size={40} color="red" />
                                            </Pressable>
                                        )
                                    }
                                </View>
                            )
                        })
                    }
                </View>

                <Button mode={"contained"} style={{ marginVertical: 20 }} onPress={() => { onAddMeal() }}>Add Meal</Button>
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 10,
        paddingHorizontal: 10
    },
});

export default AddMeal;