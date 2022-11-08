import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as data from '../../public/data.json';

export const ChestDescr = ({navigation, route}) => {
  const images = {
    1: require('../../assets/Chest/Close_Grip.png'),
    2: require('../../assets/Chest/Barbell_Bench.png'),
    3: require('../../assets/Chest/Single_Arm.png'),
    4: require('../../assets/Chest/Decline_Dumbbell.png'),
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
  nameHader:{
    padding:30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
  },
  instructionsHader:{
    margin:20,
    alignItems:'center',
    justifyContent:'center'
  },
  image: {
    width: 350,
    height: 350,
  },
  imageWrapper:{
    alignItems:'center',
    justifyContent:'center'
  }
});
