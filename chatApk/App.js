import React, { Component } from "react";
import { TextInput, StyleSheet, Text, View , Dimensions, ScrollView } from "react-native";
import io from "socket.io-client";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: []
    };
  }

  componentDidMount() {
    this.socket = io("http://192.168.0.167:3000");
    this.socket.on("chat message", msg => {
      this.setState({ chatMessages: [...this.state.chatMessages, msg] });
    });
  }

  submitChatMessage() {
    this.socket.emit("chat message", this.state.chatMessage);
    this.setState({ chatMessage: "" });
  }

  
  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <View style={styles.view}>
      <Text key={Math.random().toString()}
      style={styles.message}
      >
      {chatMessage}
      </Text></View>
    ));

    return (
      <View style={styles.container}>

    <ScrollView>
        {chatMessages}
    </ScrollView>

      <View style={styles.inPut}>
        <TextInput
          autoCorrect={false}
          value={this.state.chatMessage}
          placeholder='message'
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={chatMessage => {
            this.setState({ chatMessage });
          }}
        />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  inPut:{
    bottom: 0,
    backgroundColor: 'white',
    height: 40, borderWidth: 2,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset:{width: 2, height: 2},
    shadowColor: '#D50000',
    shadowOpacity: 0.8,
  },
  view:{
    backgroundColor: '#11ddcc',
    marginLeft:10,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
    width:200,
  },
    message:{
    marginLeft:20,
    alignItems: 'center',
    justifyContent: 'center',
    color:'white',
  }
});