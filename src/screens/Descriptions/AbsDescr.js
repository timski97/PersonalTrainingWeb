import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
export const AbsDescr = ({navigation, route}) => {
  const images = {
    11: require('../../assets/Abs/Bottoms_Up.webp'),
    12: require('../../assets/Abs/Plank.jpg'),
  };
  const data = route.params.item;
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
    height: 250,
  },
  imageWrapper: {
    alignItems: 'center',
  },
});
