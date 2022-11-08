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
export const ExerciseScreen = ({navigation, route}) => {
  return (
    <View style={styles.screens}>
      {/* <SafeAreaView style={{backgroundColor: '#FFFFFF'}} /> */}
      <View style={styles.textHeader}>
        <Text style={styles.text}>Muscle group exercises</Text>
      </View>
      <View>
        <FlatList
          data={Object.keys(data)}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View>
              {(() => {
                if (item === 'Chest') {
                  return (
                    <TouchableOpacity
                      style={styles.card}
                      onPress={() => navigation.navigate('ChestScreens')}>
                      <Text style={styles.text}>{item}</Text>
                      <View>
                        <Image
                          style={styles.image}
                          source={require('../assets/images/Chest.jpg')}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                } else if (item === 'Arms') {
                  return (
                    <TouchableOpacity
                      style={styles.card}
                      onPress={() => navigation.navigate('ArmsScreens')}>
                      <Text style={styles.text}>{item}</Text>
                      <View>
                        <Image
                          style={styles.image}
                          source={require('../assets/images/Arms.jpg')}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                } else if (item === 'Abs') {
                  return (
                    <TouchableOpacity
                      style={styles.card}
                      onPress={() => navigation.navigate('AbsScreens')}>
                      <Text style={styles.text}>{item}</Text>
                      <View>
                        <Image
                          style={styles.image}
                          source={require('../assets/images/Abs.jpg')}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                } else if (item === 'Legs') {
                  return (
                    <TouchableOpacity
                      style={styles.card}
                      onPress={() => navigation.navigate('LegsScreens')}>
                      <Text style={styles.text}>{item}</Text>
                      <View>
                        <Image
                          style={styles.image}
                          source={require('../assets/images/Legs.jpg')}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                }
              })()}
            </View>
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
  },
  card: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#ffffff',
    // width: 250,
    // height: 250,
  },
  image:{
    width: 250,
    height: 250
  },
  text:{
    fontSize:20,
  },
  textHeader:{
    paddingTop:10,
    alignItems:'center',
    // justifyContent:'center'
  }
});
