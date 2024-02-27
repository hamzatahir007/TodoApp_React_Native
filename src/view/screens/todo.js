import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  FlatList,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../consts/Colors';



function Todo() {
  const [todos, setTodos] = React.useState([]);
  const [tempTodos, setTempTodos] = React.useState([]);
  const [sort, setSort] = React.useState(false)
  const [textInput, setTextInput] = React.useState('');
  const [search, setSearch] = React.useState('');

  useEffect(() => {
    getTodosFromUserDevice();
  }, []);
  useEffect(() => {
    saveTodoToUserDevice(todos);
  }, [todos]);

  const onDelete = index => {
    setListTodo(listTodo.filter((e, i) => i !== index));
  };


  const addTodo = () => {
    if (textInput == '') {
      Alert.alert('Error', 'Please input todo');
    } else {
      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false,
        timeStamp: new Date().toISOString(),
      };
      setTodos([...todos, newTodo]);
      setTextInput('');
    }
  };

  const saveTodoToUserDevice = async todos => {
    try {
      const stringifyTodos = JSON.stringify(todos);
      await AsyncStorage.setItem('todos', stringifyTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodosFromUserDevice = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      if (todos != null) {
        setTodos(JSON.parse(todos));
        setTempTodos(JSON.parse(todos))
      }
    } catch (error) {
      console.log(error);
    }
  };

  const markTodoComplete = todoId => {
    const newTodosItem = todos.map(item => {
      if (item.id == todoId) {
        return { ...item, completed: true };
      }
      return item;
    });

    setTodos(newTodosItem);
  };

  const deleteTodo = todoId => {
    const newTodosItem = todos.filter(item => item.id != todoId);
    setTodos(newTodosItem);
  };

  const searchFilterFunction = async (text) => {
    if (text) {
      const newData = tempTodos?.filter((item) => {
        const itemData = item?.task ? item?.task?.toUpperCase()
          : ''.toUpperCase();
        const textData = text?.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setTodos(newData);
      setSearch(text);
    } else {
      setTodos(tempTodos);
      setSearch(text);
    }
  };

  const clearAllTodos = () => {
    Alert.alert('Confirm', 'Clear todos?', [
      {
        text: 'Yes',
        onPress: () => setTodos([]),
      },
      {
        text: 'No',
      },
    ]);
  };


  const ListItem = ({ todo }) => {
    // console.log(todo.timeStamp);
    return (
      <View style={[styles.listItem, {
        borderWidth: todo.completed ? 1 : 0,
        borderColor: COLORS.green
      }]}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              color: COLORS.primary,
              textDecorationLine: todo?.completed ? 'line-through' : 'none',
            }}>
            {todo?.task}
          </Text>
          <Text style={{ fontSize: 10, color: COLORS.gray }}>{new Date(todo.timeStamp).toLocaleString()}</Text>
        </View>
        {!todo?.completed && (
          <TouchableOpacity onPress={() => markTodoComplete(todo.id)}>
            <View style={[styles.actionIcon, { backgroundColor: 'green' }]}>
              <Image source={require('../../assets/done.png')} resizeMode='contain' style={{
                width: 20,
                height: 20,
                tintColor: COLORS.white
              }} />
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
          <View style={styles.actionIcon}>
            <Image source={require('../../assets/delete.png')} resizeMode='contain' style={{
              width: 20,
              height: 20,
              tintColor: COLORS.white
            }} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const SortData = () => {
    setSort(!sort);

    const sortedTodos = [...todos].sort((a, b) => {
      if (sort) {
        return new Date(a.timeStamp) - new Date(b.timeStamp); // Ascending order
      } else {
        return new Date(b.timeStamp) - new Date(a.timeStamp); // Descending order
      }
    });

    setTodos(sortedTodos);
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View style={styles.header}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: COLORS.primary,
          }}>
          TODO APP
        </Text>
        <TouchableOpacity onPress={() => clearAllTodos()}>
          <Image source={require('../../assets/delete.png')} resizeMode='contain' style={{
            width: 20,
            height: 20,
            tintColor: 'red'
          }} />
        </TouchableOpacity>
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}>
        <View style={[styles.inputContainer, { marginVertical: 0 }]}>
          <TextInput
            value={search}
            placeholder="Search"
            placeholderTextColor={COLORS.gray}
            style={{
              color: COLORS.black
            }}
            onChangeText={text => searchFilterFunction(text)}
          />
        </View>
        <TouchableOpacity onPress={() => SortData()}>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/filter.png')} resizeMode='contain' style={{
              width: 20,
              height: 20,
              tintColor: COLORS.white
            }} />
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        data={todos}
        renderItem={({ item }) => <ListItem todo={item} />}
      />

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            value={textInput}
            placeholder="Add Todo"
            placeholderTextColor={COLORS.gray}
            onChangeText={text => setTextInput(text)}
            style={{
              color: COLORS.black
            }}
          />
        </View>
        <TouchableOpacity onPress={addTodo}>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/add.png')} resizeMode='contain' style={{
              width: 20,
              height: 20,
              tintColor: COLORS.white
            }} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    height: 50,
    paddingHorizontal: 20,
    elevation: 40,
    backgroundColor: COLORS.white,
    flex: 1,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.gray2
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.primary,
    elevation: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listItem: {
    padding: 20,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginLeft: 5,
    borderRadius: 3,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Todo