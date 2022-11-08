import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as data from '../public/data.json';
export const ChestScreen = ({navigation, route}) => {
  const images = {
    1: require('../assets/Chest/Close_Grip.png'),
    2: require('../assets/Chest/Barbell_Bench.png'),
    3: require('../assets/Chest/Single_Arm.png'),
    4: require('../assets/Chest/Decline_Dumbbell.png'),
  };
  return (
    <View style={styles.screens}>
      <SafeAreaView style={{backgroundColor: '#FFFFFF'}} />
      <View>
        <FlatList
          data={data.Chest}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ChestDescr', {item})}>
              <View style={styles.nameHader}>
                <Text style={styles.name}>{item.name}</Text>
              </View>
              <View>
                <View style={styles.imageWrapper}>
                  <Image
                    style={styles.image}
                    source={images[item.id]}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <View style={styles.instructionsHader}>
                <Text numberOfLines={3}>{item.instructions}</Text>
              </View>
            </TouchableOpacity>
          )}
          // renderItem={({item}) => <Text>{data[item].name}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
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
