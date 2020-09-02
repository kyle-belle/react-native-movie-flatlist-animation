/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  Dimensions,
  Animated
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Rating from "./Rating";
import Genres from "./Genres";

import {getMovies} from "./api";

const {width, height} = Dimensions.get("window");

const SPACING = 10;
const ITEM_SIZE = width * 0.75;

const Loading = () => {
  return (
    <View style={styles.loading}>
      <Text>Loading...</Text>
    </View>
  )
}

const MovieBackGrounds = ({movies=[], scrollx}) => {
  return (
    <View style={{flexGrow: 1, width, height: height * .6, position: "absolute", top: 0, zIndex: 1}}>
      <FlatList horizontal style={{flex: 1, width, height: height * 0.6, backgroundColor: "yellow"}} contentContainerStyle={{width, height: height * 0.6, backgroundColor: "blue", flexDirection: "column", justifyContent: "center"}} data={movies} keyExtractor={(item) => item.key} renderItem={({item, index}) => {

        const inputRange = [(index - 1) * ITEM_SIZE, index * ITEM_SIZE, (index + 1) * ITEM_SIZE];

        const outputRange = [-width, 0, 0];

        const translateX = scrollx.interpolate({inputRange, outputRange});

        return (
          <Animated.View style={[StyleSheet.absoluteFillObject, {transform: [{translateX}], top: (-height*.6)/2, width, height: height * .6, backgroundColor: "red"}]}>
            <Image source={{uri: item.backdrop}} style={{height: height * 0.6, width}} resizeMode="cover" />
          </Animated.View>
        )
      }} />

      <LinearGradient colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 1)"]} style={{position: "absolute", top: 0, height: height * 0.6, width}} />
    </View>
  );
}

const App: () => React$Node = () => {

  const [movies, setMovies] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      setMovies(movies);
    }

    if(movies.length === 0){
      fetchData(movies);
    }
  }, [movies]);

  if(movies.length === 0){
    return <Loading />
  }

  return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

        <MovieBackGrounds movies={movies} scrollx={scrollX} />

        <Animated.FlatList style={{position: "relative", zIndex: 2}} scrollEventThrottle={16} onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {useNativeDriver: true})} contentContainerStyle={{alignItems: "center", paddingHorizontal: (width - ITEM_SIZE)/2}} data={movies} horizontal showsHorizontalScrollIndicator={false} snapToInterval={ITEM_SIZE} decelerationRate={"fast"} bounces={false} renderItem={({item, index}) => {
          
          const inputRange = [(index - 1) * ITEM_SIZE, index * ITEM_SIZE, (index + 1) * ITEM_SIZE];
          
          const translateY = scrollX.interpolate({inputRange, outputRange: [75, 50, 75]})
          
            return (
              <Animated.View style={{width: ITEM_SIZE, transform: [{translateY}]}}>
                <View style={{marginHorizontal: SPACING, padding: SPACING * 2, alignItems: "center", backgroundColor: "white", borderRadius: 34}}>
                  <Image style={styles.image} source={{uri: item.poster}} resizeMode="cover" />
                </View>

                <Text style={styles.title}>
                  {item.title}
                </Text>

                <Rating rating={item.rating/2} />

                <Genres genres={item.genres} />

                <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
              </Animated.View>
            );
          }} keyExtractor={(item) => item.key} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "white"
  },
  image: {
    width: "100%",
    height: ITEM_SIZE * 1.2,
    borderRadius: 24
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    textAlign: "center"
  },
  description: {
    fontSize: 14,
    marginHorizontal: 14
  }
});

export default App;
