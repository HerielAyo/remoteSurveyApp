import React, { useState } from 'react';
import { View, Text, TextInput,Button } from 'react-native';

import {db} from '../config';

export default function ShortTextQuestion({navigation}){
    const [questionText, setQuestionText] = useState('')

    const handleText = (text)=>(
        setQuestionText(text)
    )

    function onSubmitQuestion(){
        db.ref('/questions/').push({type:'shortText', questionText:questionText});
        navigation.navigate('RegisteredQuestions')
    }
    return(
        <View style = {{ flex:1, alignItems:'center', justifyContent:'center'}}>
            <View style = {{width:'80%', alignItems:'center'}}>
            <Text style = {{fontSize:20, margin:10}}>Type The Question</Text>
            <TextInput
            multiline = {true}
            style = {{width:'80%', height:60, backgroundColor:'white', borderWidth:1, borderRadius:10, borderColor:'gray', padding:5}}
            onChangeText = {(text)=>handleText(text)}
            value = {questionText}
            />
            </View>
            <View  style = {{width:'20%', margin:10}}>
                <Button title = "Register Question"
                color = "blue"
                onPress = {onSubmitQuestion}
                />
            </View>
        </View>
    )
}