import React from 'react';
import {CheckBox, StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

import {db} from './config';

export default function HomeScreen({navigation}) {

    return(
        <View>
            <View style={{marginTop:10, marginBottom:30, alignItems:'center'}}>
          <Text style = {{fontSize:20}}>Welcome to Remote Survey Tool</Text>
          </View>
      <View style={styles.subContainer}>
          <View style={styles.buttonStyle}>
          <Button
          title = "Add Responses"
          onPress = {()=>navigation.navigate('Questionnaire')}
          color = "blue"
          />
          </View>
          <View style = {styles.buttonStyle}>
          <Button
          title = "Add Todos"
          onPress = {()=>navigation.navigate('Todos')}
          color = 'green'
          />
          </View>
      </View>
      </View>
    );
}

const styles = StyleSheet.create({
    subContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonStyle:{
        margin:10,
        padding:10
    }
})
