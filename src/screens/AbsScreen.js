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
export const AbsScreen = ({navigation, route}) => {
  const images = {
    11: require('../assets/Abs/Bottoms_Up.webp'),
    12: require('../assets/Abs/Plank.jpg'),
  };
  return (
    <View style={styles.screens}>
      <SafeAreaView style={{backgroundColor: '#FFFFFF'}} />
      <View>
        <FlatList
          data={data.Abs}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AbsDescr', {item})}>
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
    height: 150,
  },
  imageWrapper: {
    alignItems: 'center',
    // justifyContent:'center'
  },
});
