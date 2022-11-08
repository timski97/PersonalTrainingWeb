import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import data from '../public/data.json';
import * as data from '../../public/data.json';
export const LegsDescr = ({navigation, route}) => {
  const data = route.params.item;
  const images = {
    16: require('../../assets/Legs/Barbell_Deadlift.png'),
    17: require('../../assets/Legs/Barbell_Full.png'),
    18: require('../../assets/Legs/Barbell_Walking.jpg'),
    19: require('../../assets/Legs/Lying_Leg.png'),
  };
  return (
    <ScrollView style={styles.screens}>
      <SafeAreaView style={{backgroundColor: '#FFFFFF'}} />
      <View>
        <View style={styles.imageWrapper}>
          <View style={styles.nameHader}>
            <Text style={styles.name}>{data.name}</Text>
          </View>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={images[data.id]}
              resizeMode="contain"
            />
          </View>
          <View style={styles.instructionsHader}>
            <Text>{data.instructions}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screens: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  nameHader: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
  },
  instructionsHader: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 350,
    height: 350,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
