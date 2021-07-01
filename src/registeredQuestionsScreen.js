import React, { useState, useEffect } from 'react';

import {db} from './config';
import { View, Text, TextInput,Button } from 'react-native';
import {  } from 'react-native-paper';

export default function RegisteredQuestions({navigation}){
    const [questionsList, setQuestionsList] = useState({});
    const [questionText, setQuestionText] = useState('')

    const handleText = (text)=>(
        setQuestionText(text)
    )

    useEffect(()=>{
        var listerner = db.ref('/questions');
        listerner.on('value', resp=>{
            let data = resp.val()?resp.val():{};
            setQuestionsList({...data});
        })    
    },[])
   let questionsKeys = Object.keys(questionsList);
const questions = questionsKeys.map((key, index)=><View style = {{display:'flex', width:'100%', alignItems:'flex-start',marginTop:20}}>
            <Text style = {{fontSize:20, margin:10}}>{index+1}: {questionsList[key].questionText}</Text>
            <TextInput
            multiline = {true}
            style = {{width:'90%', height:questionsList[key].type === 'explanationText'?100:40, backgroundColor:'white', borderWidth:1, borderRadius:10, borderColor:'gray', padding:5}}
            onChangeText = {(text)=>handleText(text)}
            value = {questionText}
            />
            </View>)

    return(
        <View>
        <View style = {{width:'100%', alignItems:'flex-start'}}>
            {questions}
        </View>
        <View style = {{margin:10, padding:10, width:'100%'}}>
            <Button title = 'Add a Short Text Question'
            onPress = {()=>navigation.navigate('ShortTextQuestion')}
            style = {{margin:10, padding:10}}
            />
            </View>
            <View style = {{margin:10, padding:10}}>
            <Button title = 'Add an Explanation Question'
            onPress = {()=>navigation.navigate('ExplanationQuestion')}
            style = {{margin:10, padding:10}}
            />
        </View>
        </View>
    )
}
