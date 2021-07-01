import React, { useState, useEffect } from 'react'

import {db} from './config';
import { View, Text,TextInput,Button, ScrollView} from 'react-native';
import {  } from 'react-native-paper';
import {  } from 'react-native-gesture-handler';

export default function Chat(){
    const [messages, setMessages] = useState({});
    const [messageText, setMessageText] = useState('')
    const [loading, setLoading] = useState(false)

    function sendMessage(){
        if(messageText.length===0){
        
        }
        else{
      let  msg = {message:messageText}
        db.ref('/chatmessages/').push(msg);
        setMessageText('')
        }
    }
    useEffect(()=>{
        setLoading(true)
        var listerner = db.ref('/chatmessages/');
        listerner.on('value', resp=>{
            
        let msg = resp.val()?resp.val():{};
        let data = {... msg}
        setMessages(data)
        setLoading(false)
        })
        return ()=>{
            listerner.off('value');
        }
    })

    const msgKeys = Object.keys(messages);

    let chatList = <Text></Text>;
    if (msgKeys.length>0 && loading){
       chatList =  msgKeys.map(key=><View style = {{backgroundColor:'rgba(0,0,0,.2)', borderRadius:40,margin:10, padding:20, width:'80%'}}><Text>{messages[key].message}</Text></View>)
    }
    else if(msgKeys.length<0 && loading){
       chatList=  <Text>Loading Messages</Text>
    }
    else{
        chatList = <Text>No messages in this chat</Text>
    }
    
    return(
        <View>
        <View style = {{flex:1, alignItems:'center', justifyContent:'center'}}>
            
            <View style = {{flex:4, borderRadius:30, width:'100%', alignItems:'center', justifyContent:'center', backgroundColor:'rgba(0,0,255,0.4)'}}>
            <ScrollView>
                {chatList}
            </ScrollView>
            </View>
            
            </View>
         <View style = {{flex:1}}>
            <TextInput 
            onChangeText = {(text)=>setMessageText(text)}
            style = {{ height:40, width:'100%', backgroundColor:'white', borderRadius:10, borderWidth:2}}
            value = {messageText}
            />
            <Button title = 'Send'
            onPress = {sendMessage}
            />
        </View>
        
        </View>

    )
}