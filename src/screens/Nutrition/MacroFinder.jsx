import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Divider, Searchbar, Text } from 'react-native-paper';
import { theme } from '../../core/theme';

const MacroFinder = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [nutritions, setNutritions] = React.useState(null);
    const onChangeSearch = query => setSearchQuery(query);

    const onSearch = async () => {
        try {
            const response = await fetch(
                `https://api.edamam.com/api/nutrition-data?app_id=7ff3464d&app_key=6a4f596bec81e119dfcdfa025e337d48&nutrition-type=cooking&ingr=${searchQuery}`,
            );
            const res = await response.json();
            setNutritions(res);
        } catch (error) {
            console.error(error);
        }
    }

    const formatText = (nutritions) => {
        const stringValue = nutritions?.toString();
        return stringValue ? stringValue?.substring(0, stringValue?.indexOf('.')) + stringValue?.substring(stringValue?.indexOf('.'), stringValue?.indexOf('.') + 3) : "";
    }

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                onIconPress={() => { onSearch() }}
                style={{ backgroundColor: '#fff' }}
                onClearIconPress={() => { setNutritions(null) }}
            />
            <View style={{
                flex: 1, marginTop: 20, borderRadius: 15, padding: 15, backgroundColor: '#fff'
            }}>
                <Text style={{ textAlign: 'center', fontSize: 26, fontWeight: '700' }}>
                    Nutrition Facts
                </Text>
                <Divider style={{ height: 5, marginBottom: 15 }} />
                <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: '700' }}>
                    Amount Per Serving
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 28, fontWeight: '700' }}>
                        Calories
                    </Text>
                    <Text style={{ fontSize: 28, fontWeight: '700' }}>
                        {nutritions?.calories}
                    </Text>
                </View>

                <Divider style={{ height: 5, marginBottom: 15 }} />
                <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginVertical: 8 }}>
                    <Text style={{ fontSize: 22, fontWeight: '700' }}>
                        Total Fat
                    </Text>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                        {formatText(nutritions?.totalDaily?.FAT?.quantity)}
                        {nutritions?.totalDaily?.FAT?.unit}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginVertical: 8 }}>
                    <Text style={{ fontSize: 22, fontWeight: '700' }}>
                        Cholesterol
                    </Text>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                        {formatText(nutritions?.totalDaily?.CHOLE?.quantity)}
                        {nutritions?.totalDaily?.CHOLE?.unit}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginVertical: 8 }}>
                    <Text style={{ fontSize: 22, fontWeight: '700' }}>
                        Sodium
                    </Text>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                        {formatText(nutritions?.totalDaily?.NA?.quantity)}
                        {nutritions?.totalDaily?.NA?.unit}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginVertical: 8 }}>
                    <Text style={{ fontSize: 22, fontWeight: '700' }}>
                        Total Carbohydrate
                    </Text>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                        {formatText(nutritions?.totalDaily?.CHOCDF?.quantity)}
                        {nutritions?.totalDaily?.CHOCDF?.unit}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginVertical: 8 }}>
                    <Text style={{ fontSize: 22, fontWeight: '700' }}>
                        Protein
                    </Text>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                        {formatText(nutritions?.totalDaily?.PROCNT?.quantity)}
                        {nutritions?.totalDaily?.PROCNT?.unit}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginVertical: 8 }}>
                    <Text style={{ fontSize: 22, fontWeight: '700' }}>
                        Vitamin D
                    </Text>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                        {formatText(nutritions?.totalDaily?.VITD?.quantity)}
                        {nutritions?.totalDaily?.VITD?.unit}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginVertical: 8 }}>
                    <Text style={{ fontSize: 22, fontWeight: '700' }}>
                        Calcium
                    </Text>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                        {formatText(nutritions?.totalDaily?.CA?.quantity)}
                        {nutritions?.totalDaily?.CA?.unit}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginVertical: 8 }}>
                    <Text style={{ fontSize: 22, fontWeight: '700' }}>
                        Iron
                    </Text>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                        {formatText(nutritions?.totalDaily?.FE?.quantity)}
                        {nutritions?.totalDaily?.FE?.unit}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginVertical: 8 }}>
                    <Text style={{ fontSize: 22, fontWeight: '700' }}>
                        Potassium
                    </Text>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                        {formatText(nutritions?.totalDaily?.K?.quantity)}
                        {nutritions?.totalDaily?.K?.unit}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 15
    },
});

export default MacroFinder