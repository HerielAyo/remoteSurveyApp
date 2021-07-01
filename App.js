import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './src/home';
import QuestionnaireScreen from './src/questionnaire';
import TodosScreen from './src/todos';
import ViewResponses from './src/viewResponses';
import EditResponse from './src/editResponseScreen';
import TableScreen from './src/table';
import ShortTextQuestion from './src/questionsTypeScreens/shortTextQuestion';
import ExplanationQuestion from './src/questionsTypeScreens/explanationQuestion';
import RegisteredQuestions from './src/registeredQuestionsScreen';
import MultipleChoice from './src/questionsTypeScreens/multipleChoice';
import Chat from './src/chatRoom';

export default function App() {
  
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName = "Home">
          <Stack.Screen name = "Home" component = {HomeScreen} options={{ title:'Remote Survey Tool', headerTitleAlign:'center'}}/>
          <Stack.Screen name = "Todos" component = {TodosScreen} options = {{title:'Todos'}}/>
          <Stack.Screen name = "Questionnaire" component = {QuestionnaireScreen} options = {{title:'Questions'}}/>
          <Stack.Screen name = "ViewResponses" component = {ViewResponses} />
          <Stack.Screen name = 'EditResponse' component = {EditResponse}/>
          <Stack.Screen name = 'Table' component = {TableScreen}/>
          <Stack.Screen name = 'ShortTextQuestion' component = {ShortTextQuestion}/>
          <Stack.Screen name = "ExplanationQuestion" component = {ExplanationQuestion}/>
          <Stack.Screen name = "RegisteredQuestions" component = {RegisteredQuestions}/>
          <Stack.Screen name = "MultipleChoice" component = {MultipleChoice}/>
          <Stack.Screen name = 'Chat' component = {Chat}/>
        </Stack.Navigator>
      </NavigationContainer>

    );
}

const Stack = createStackNavigator();
