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
// import data from '../public/data.json';
import * as data from '../public/data.json';
export const ArmsScreen = ({navigation, route}) => {
  const images = {
    8: require('../assets/Arms/Dumbbell_Bicep.png'),
    9: require('../assets/Arms/Barbell_Curl.png'),
    10: require('../assets/Arms/Concentration_Curls.png'),
  };
  return (
    <View style={styles.screens}>
      <SafeAreaView style={{backgroundColor: '#FFFFFF'}} />
      <View>
        <FlatList
          data={data.Arms}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ArmsDescr', {item})}>
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
