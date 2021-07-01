import React from 'react';
import {CheckBox, StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import CheckBox from 'react-native-check-box';

import {db} from './config';

export default function TodosScreen({navigation}) {
  const [todos, setTodos]= React.useState({});
  const [presentTodo, setPresentTodo] = React.useState("")
  const [doneState, setDoneState] = React.useState(false);

   React.useEffect(()=>{
        var dbListerner = db.ref('/todos');
        dbListerner.on('value', querySnapShot=>{
            let data = querySnapShot.val()? querySnapShot.val():{};
            let todoItems = {...data};
            setTodos(todoItems);
            console.log(todos)
        })
        return ()=>{
          dbListerner.off('value');
        }
      }
      )

      function addNewTodo(){
        db.ref('/todos').push({
            done: doneState,
            todoItem:presentTodo,
        });
        Alert.alert('Action', 'A new todo was created');
        setPresentTodo("")
    }

    const onClick = (id)=>{
      // setDoneState(!doneState);
      db.ref('/todos/'+id).update({done:true})
  }

    function clearTodos(){
        db.ref('/todos').remove();
        Alert.alert('Action', 'All todos have been cleared');
    }

    function deleteTodo(key){
      db.ref('/todos/'+key).remove();
    }

    let todoKeys = Object.keys(todos);
    return(
      <ScrollView style = {styles.container} contentContainerStyle = {styles.contentContainerStyle}>
      <View style = {styles.toDocontainer}>
      {todoKeys.length>0? (
        todoKeys.map(key=>(
          <>
          <ToDoItem onClick = {(id)=>onClick(id)} key = {key} id = {key} todoItem = {todos[key]}/>
        <Button title="Delete" color ="red" onPress={()=>deleteTodo(key)}/> 
        </>))
      ):(
        <Text>No any todo </Text>
      )}
      </View>
          <TextInput
          placeholder='Add new todo'
          value = {presentTodo}
          style = {styles.textInput}
          onChangeText = {(e)=>setPresentTodo(e)}
          onSubmitEditing = {addNewTodo}
          />
          <Button title = "Add new to do Item"
          onPress = {addNewTodo}
          color = "lightgreen"
          />
          <View style = {{marginTop:20}}>
              <Button title = "Clear todos"
              onPress = {clearTodos}
              color = 'red'
              />
      </View>
      <Button title = "Add respondent"
      color = 'blue' onPress = {()=>navigation.navigate('Questionnaire')}
      />

  </ScrollView>
    );
}

function ToDoItem({onClick, todoItem: {todoItem: name, done}, id}){
  // const [doneState, setDoneState] = React.useState(done);
  // const onClick = ()=>{
  //     setDoneState(!doneState);
  // }

  return(
      <View style = {styles.todoItem}>
          <CheckBox  onValueChange = {()=>onClick(id)} value = {done} disabled={done}/>
  <Text style = {[styles.todoText, {opacity:done?0.2:1}]}>{name}</Text>
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#afafaf',
    width: '80%',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    fontSize: 20,
  },
  todoItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  todoText: {
    borderColor: '#afafaf',
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    minWidth: '50%',
    textAlign: 'center',
  },
  toDocontainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column'
},
});
