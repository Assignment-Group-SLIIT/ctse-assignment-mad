import React, { useState, useEffect } from 'react'

import { SafeAreaView } from "react-native-safe-area-context"
import { Pressable, StyleSheet, View } from "react-native"
import { Text, FAB, Modal, Provider, Portal, } from "react-native-paper";
import { theme } from '../../core/theme';
import { ScrollView } from 'react-native-gesture-handler';

const TodoScreen = ({ }) => {
    const [todos, setTodos] = useState([]);
    const [visible, setVisible] = React.useState(false);

    useEffect(() => {
        setTodos([
            {
                name: "todo 01"
            },
            {
                name: "todo 02"
            },
            {
                name: "todo 03"
            },
            {
                name: "todo 03"
            },
            {
                name: "todo 03"
            },
            {
                name: "todo 03"
            },
            {
                name: "todo 03"
            },
            {
                name: "todo 03"
            },
            {
                name: "todo 03"
            },
            {
                name: "todo 04"
            },
        ]);
        return () => {
            setTodos([]);
        };
    }, []);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
        <Provider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.headerTxt}>
                    Your Todos
                </Text>
                <ScrollView style={{ width: '100%', padding: 5 }}>
                    {
                        todos.map((todo, index) => {
                            return (
                                <Pressable key={index} style={styles.card} onPress={() => { showModal() }}>
                                    <View style={styles.cardView}>
                                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{todo?.name?.charAt(0)}</Text>
                                    </View>
                                    <Text style={{ fontSize: 20 }}>{todo.name}</Text>
                                </Pressable>

                            )
                        })
                    }
                </ScrollView>
                <FAB
                    icon="plus"
                    style={styles.FAB}
                    color="#fff"
                    size='medium'
                    onPress={() => {
                        // navigation.navigate('ScreenOne');
                        navigation.navigate('Root', {
                            screen: 'Todos',
                            initial: false,
                        });
                    }}>

                </FAB>
            </SafeAreaView>

            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalStyle}>
                    <Text>modal text</Text>
                </Modal>
            </Portal>
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

export default TodoScreen