import React, { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
};

const initialTodos: TodoItem[] = [
  { id: '1', text: 'Eggs 🥚', completed: false },
  { id: '2', text: 'Cheese 🧀', completed: false },
  { id: '3', text: 'Oreos', completed: false },
  { id: '4', text: 'Wine gums', completed: false },
  { id: '5', text: 'Mint thins', completed: false },
  { id: '6', text: 'Tomatoes 🍅', completed: false },
  { id: '7', text: 'Cucumber 🥒', completed: false },
];

export default function TodoScreen() {
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const renderItem = ({ item }: { item: TodoItem }) => (
    <TouchableOpacity onPress={() => toggleTodo(item.id)} style={styles.todoItem}>
      <Ionicons
        name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
        size={24}
        color={item.completed ? '#007AFF' : '#999'}
      />
      <ThemedText style={[styles.todoText, item.completed && styles.completedText]}>
        {item.text}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        12
      </ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>
        Grocery List
      </ThemedText>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  todoText: {
    marginLeft: 10,
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
});
