import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";

export default ({rating=0}) => {
    const filledStars = Array(Math.floor(rating)).fill("star");
    const emptyStars = Array(5 - Math.floor(rating)).fill("staro");

    const stars = [...filledStars, ...emptyStars];

    return (
        <View style={styles.container}>
            <Text>{rating} </Text>
            {
                stars.map((star, i) => {
                   return <AntDesign name={star} size={12} color="tomato" key={i} />
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        flexDirection: "row"
    },
})