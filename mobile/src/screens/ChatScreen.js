import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [status, setStatus] = useState('Đang hoạt động'); // Trạng thái mặc định

  const handleSendMessage = (sender) => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: sender,
        timestamp: new Date().toLocaleString()
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  useEffect(() => {
    exampleMessages();
  }, []);

  const exampleMessages = () => {
    const examples = [
      { id: 1, text: 'Hello', sender: 'friend', timestamp: "21:13:25 4/4/2024" },
      { id: 2, text: 'How are you?', sender: 'user', timestamp: "21:15:36 4/4/2024" },
      { id: 3, text: 'I am fine', sender: 'friend', timestamp: "21:17:10 4/4/2024" }
    ];
    setMessages(examples);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Image source={require("../assets/avt.jpg")} style={styles.avatar} />
          <View style={{ flexDirection:"column", marginLeft: 10 }}>
            <Text style={styles.headerText}>Nguyễn Văn A</Text>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={() => console.log("Call")}>
            <Ionicons name="call-outline" size={24} color="#566573" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Videocall")} style={styles.videocallButton}>
            <Ionicons name="videocam-outline" size={24} color="#566573" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Setting")} style={styles.settingButton}>
            <Ionicons name="list-outline" size={24} color="#566573" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.chatContainer}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.sender === 'user' ? styles.userMessage : styles.otherMessage,
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
            <Text style={styles.timestampText}>{message.timestamp}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputMessage}
          onChangeText={setInputMessage}
          onSubmitEditing={() => handleSendMessage('friend')}
        />
        <TouchableOpacity onPress={() => handleSendMessage('user')}>
          <Ionicons name="send" size={24} color="#33D1FF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#eaeaea',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
  rightIcons: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 10,
  },
  videocallButton: {
    marginLeft: 15,
  },
  settingButton: {
    marginLeft: 15,
  },
  chatContainer: {
    flexGrow: 1,
    padding: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#95E7FF',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  messageText: {
    fontSize: 16,
  },
  timestampText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  }
});

export default ChatScreen;
