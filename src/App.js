import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Firebase from 'firebase';
import AceEditor from 'react-ace';

var brace = import('brace');

import('brace/mode/sh');

import('brace/theme/chrome');






const config = {
  apiKey: "AIzaSyCoJDWMZkSzyBAalJv-g94MqiycK3MqUgg",
  authDomain: "firepaddemo-25d55.firebaseapp.com",
  databaseURL: "https://firepaddemo-25d55.firebaseio.com",
};

var firebase = Firebase.initializeApp(config);


class App extends Component {

  // componentDidMount() {
  //   this.refs.ace.editor.focus();
  // }  

  componentDidMount() {
    //// Initialize Firebase.
    //// TODO: replace with your Firebase project configuration.

    //// Get Firebase Database reference.
    var firepadRef = this.getExampleRef();
    console.log("REF~~~", window.ace)

    debugger
    var firepad = window.Firepad.fromACE(firepadRef, this.refs.ace.editor);

    //// Initialize contents.
    firepad.on('ready', function () {
      if (firepad.isHistoryEmpty()) {
        firepad.setHtml('<span style="font-size: 24px;">Rich-text editing with <span style="color: red">Firepad!</span></span><br/><br/>Collaborative-editing made easy.\n');
      }
    });
  }

  // Helper to get hash from end of URL or generate a random one.
  getExampleRef() {
    var ref = firebase.database().ref();
    ref = ref.push(); // generate unique location.
    if (typeof console !== 'undefined') {
      console.log('Firebase data: ', ref.toString());
    }
    return ref;
  }

  render() {
    return (
      <AceEditor
        mode="sh"
        theme="chrome"
        name="code"
        width="100%"
        maxLines={50}
        ref="ace"
        fontSize={18}
        value="#type your code here"
        editorProps={{ $blockScrolling: Infinity }}
        onLoad={(editor) => {
          editor.focus();
          editor.getSession().setUseWrapMode(true);
        }}
      />
    );
  }
}

export default App;

