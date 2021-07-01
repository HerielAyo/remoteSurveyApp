import React, { useState } from 'react';
import { View, Text, StyleSheet,Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';

import {db} from './config';

export default function QuestionnaireScreen({navigation, route}){
    const [name, setName] = useState('')
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [langText, setLangText] = useState('')
    const [languages, setLanguages] = useState([]);

    function handleLanguages(lang){
        const langSplitted = lang.split(',');
        const langSplittedTrimmed = langSplitted.map(text=>text.trim());
        // setLanguages([...langSplittedTrimmed])
        return langSplittedTrimmed;
    }
    function handleSubmit(){
       const data = {
            name: name,
            age: age,
            gender:gender,
            languages: langText
        }
        db.ref('/responces/').push(data);
        alert('data submitted successfully')
        cleanFields();
    }

    function cleanFields(){
        setName('');
        setGender('');
        setAge('');
        setLangText('');
        setLanguages([])
    }
    return(
        <View style = {styles.container}>
            <View>
            <Text style = {styles.titleStyle}>Fill the Questions</Text>
            </View>
            <View style = {styles.rowStyle}>
                <TextInput 
                value = {name}
                style={styles.inputField}
                placeholder = "Name" 
                onChangeText = {name=>setName(name)}
                />

            </View>
            <View style = {styles.rowStyle}>
                <TextInput 
                value = {age}
                style={styles.inputField}
                placeholder = "Age" 
                onChangeText = {(age)=>setAge(age)}
                />

            </View >
            <View style={styles.fieldsStyle}>
            </View>
            <View style = {styles.rowStyle}>
                <Text style = {styles.labelStyle}>Male</Text>
                <RadioButton
                value = "M"
                status = {gender === 'M'? 'checked':'unchecked'}
                onPress = {()=>setGender('M')}
                />
                <Text style = {styles.labelStyle}>Female</Text>
                <RadioButton
                value = "F"
                status = {gender==='F'? 'checked':'unchecked'}
                onPress = {()=>setGender('F')}
                />

            </View>
            <View style = {styles.rowStyle}>
                <TextInput 
                value = {langText}
                style={styles.inputField}
                placeholder = "List all languages Spoken" 
                onChangeText = {(lang)=>setLangText(lang)}
                />
            </View>
            <View style = {styles.rowStyle}>
                <Button title = "Submit"
                color = "blue"
                style = {styles.buttonStyle}
                onPress = {handleSubmit}
                />
            </View>
            <View style = {styles.rowStyle}>
                <Button title = "View Responses"
                color = "blue"
                style = {styles.buttonStyle}
                onPress = {()=>navigation.navigate('ViewResponses')}
                />
            </View>
            <View style = {styles.rowStyle}>
                <Button title = "View Questions"
                color = "blue"
                style = {styles.buttonStyle}
                onPress = {()=>navigation.navigate('RegisteredQuestions')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    titleStyle:{
        fontSize:25,
        fontWeight:'bold'
    },
    inputField:{
        width:'95%',
        height:50,
        backgroundColor:'white',
        borderRadius:5,
        borderColor:'#afafaf',
        borderWidth:1,
        fontSize:20,
        padding:8

    },
    fieldsStyle:{
        alignItems:'flex-end'
    },
    rowStyle:{
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-start',
        margin:5
    },
    labelStyle:{
        fontSize:20,
        alignItems:'flex-end',
        margin:8,
    },
    buttonStyle:{
        padding:10,
        margin:20
    }
})