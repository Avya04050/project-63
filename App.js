import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      definition: '',
      lexicalCategory: '',
      isSearchPressed: false,
      word: 'Loading....',
      examples: [],
      color: 'white',
    };
  }
  getWord = async (word) => {
    //console.log(word)

    var searchKeyword = word.toLowerCase();
    //console.log(searchKeyword);
    var url =
      'https://rupinwhitehatjr.github.io/dictionary/' + searchKeyword + '.json';
    //console.log(url);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        var data = responseJson.definitions[0].description;
        var lex = responseJson.definitions[0].wordtype;
        this.setState({
          definition: data,
          lexicalCategory: lex,
          color: 'black',
        });
        console.log(this.state.definition);
        console.log(this.state.lexicalCategory);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={styles.headerBackground}>
          <Text style={styles.header}> Pocket Dictionary </Text>
        </View>
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
            });
          }}
          value={this.state.text}></TextInput>
        <TouchableOpacity
  
          onPress={() => {
            this.getWord(this.state.text);
          }}>
          <Image style={styles.searchImage} source = {require('./searchButton.png')}/>
          </TouchableOpacity>

        <Text style={[styles.displayInfo, { color: this.state.color, marginTop:60 }]}>
          WORD: "{this.state.text}"
        </Text>
        <Text style={[styles.displayInfo, { color: this.state.color }]}>
          TYPE:{this.state.lexicalCategory}
        </Text>
        <Text style={[styles.displayInfo, { color: this.state.color }]}>
          DEFENITION:{this.state.definition}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBackground: {
    backgroundColor: 'red',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  header: {
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
  },
  button: {
    borderColor: 'yellow',
    alignSelf: 'center',
    height: 20,
    width: 20,
    backgroundColor: 'yellow',
    marginTop: -30,
    marginLeft: 220,
  },
  searchImage:{
    alignSelf: 'center',
    height: 50,
    width: 50,
    marginTop: -40,
    marginLeft: "75%",

  },

  inputBox: {
    width: '80%',
    alignSelf: 'left',
    height: 40,
    borderWidth: 2,
    marginLeft: 10,
  },
  displayInfo:{
    marginTop:10,
    marginLeft:40,
    marginBottom:10

  }
});

