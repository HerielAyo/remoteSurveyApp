import React, { useState } from 'react';
import { View, Button,TextInput } from 'react-native';
import {Table, Row, Rows, } from 'react-native-table-component';

export default function TableScreen(){


    return(
        <View style = {{ width:'50%'}}>
        <Table borderStyle = {{ borderWidth:2, borderColor:'gray'}}>
            <Row data = {['Name', 'Age']}/>
            <Rows data = {[['Heriel', 30], ['Juma', 29]]}/>
        </Table>
        </View>
    )
}