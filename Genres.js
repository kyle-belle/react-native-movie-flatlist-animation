import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default ({genres=[]}) => {
    return (
        <View style={styles.container}>
            {genres.map((genre) => {
                return (
                    <View style={styles.genre} key={genre}>
                        <Text style={styles.genreText}>{genre}</Text>
                    </View>
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    genre: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        marginHorizontal: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "grey",
        borderStyle: "solid",
        borderRadius: 10
    },
    genreText: {
        fontSize: 10,
        textAlign: "center",
    }
})