import React, { useEffect, useState } from 'react';

import {db} from './config';
import { View, StyleSheet, Text, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Table, Row, Rows, TableWrapper,} from 'react-native-table-component';
import {  } from 'react-native-gesture-handler';

export default function ViewResponses({navigation}){
    const [responses, setResponses] = useState({})
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        var listerner = db.ref('/responces/');
        listerner.on('value', snapshot=>{
            let responsesData = snapshot.val()? snapshot.val():{};
            setResponses({...responsesData});
            setLoading(false)
        })
        return ()=>{
            listerner.off('value');
        }
    },[])
    let responsesKeys = Object.keys(responses);
    let responsesList = <Text></Text>
    let responsesListTable = []
    if(loading){
        responsesList = <Text>Loading...</Text>
    }
    else if(responsesKeys.length>1){
        responsesKeys.map((key, index)=>
        responsesListTable.push([index+1, responses[key].name,responses[key].age,responses[key].gender,responses[key].languages, 
            <TouchableOpacity onPress = {()=>navigation.navigate('EditResponse', {key:key})}>
            <View style = {{ width:50, height:40, borderRadius:2, backgroundColor:'lightgreen'}}>
            <Text>Edit?</Text>
            </View>
        </TouchableOpacity>]))
        // <View style = {styles.responsesListStyle}>
        // <Text style = {styles.responsesText}>{index+1}: {responses[key].name}</Text>
        // <Button title = "Edit" color = 'lightgreen' onPress = {()=>navigation.navigate('EditResponse', {key:key})}/>
        
        // </View>
        responsesList =
        (<ScrollView horizontal = {true}>
            <View>
        <Table borderStyle = {{ borderWidth:2, borderColor:'gray'}}>
        <Row data = {['S/N','Name','Age', 'Gender', 'Languages', ' ']} textStyle = {{ height:40}}/>
        {/* <Rows data = {responsesListTable}/> */}
        </Table> 
        <ScrollView style = {{marginTop:-1}}>
            <Table borderStyle = {{ borderWidth:1, borderColor:'gray'}}>
                {
                    responsesListTable.map((rowData, index)=>(
                        <Row key = {index}
                        data = {rowData}
                        style = {{ height:60, backgroundColor: index%2?'#F7F6E1':'#F7F6E7' }}
                        textStyle = {{ textAlign:'center', fontWeight:'100'}}
                        />
                    ))
                }
            </Table>
        </ScrollView>
        </View>
        </ScrollView>)
       
    }
    else{
        responsesList = <Text>No respondent</Text>
    } 
    return(
        <View style = {{display:'flex', flex:1}}>
        <View style = {styles.container}>
            
            {responsesList}
           
        </View>
        <View style = {{margin:15, paddingTop:0, width:'100%',alignItems:'center', justifyContent:'center', flex:1}}>
            <Button title = "Add new response" color = 'blue' onPress = {()=>navigation.navigate('Questionnaire')}/>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:8,
        alignItems:'center',
        justifyContent:'center',
    },
    responsesText:{
        fontFamily:'arial',
        fontSize:20,
        margin:10
    },
    responsesListStyle:
    {
        display:'flex', 
        flexDirection:'row', 
        margin:15,
        alignItems:'flex-start'
    },
    textView:{
        flex:1,
        width:'80%',
        alignItems:'flex-start',
        justifyContent:'center'
    }
});