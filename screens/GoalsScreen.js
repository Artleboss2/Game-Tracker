import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GoalsScreen() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  useEffect(() => {
    loadGoals();
  }, []);

  async function loadGoals() {
    try {
      const data = await AsyncStorage.getItem('goals');
      if (data) setGoals(JSON.parse(data));
    } catch (e) {
      console.log(e);
    }
  }

  async function saveGoals(updatedGoals) {
    await AsyncStorage.setItem('goals', JSON.stringify(updatedGoals));
    setGoals(updatedGoals);
  }

  async function addGoal() {
    if (!newGoal.trim()) return;
    const goal = {
      id: Date.now().toString(),
      text: newGoal,
      completed: false,
      date: new Date().toLocaleDateString('fr-CA'),
    };
    await saveGoals([...goals, goal]);
    setNewGoal('');
  }

  async function toggleGoal(id) {
    const updated = goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g);
    await saveGoals(updated);
  }

  async function deleteGoal(id) {
    Alert.alert('Supprimer', 'Supprimer cet objectif?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: async () => {
        await saveGoals(goals.filter(g => g.id !== id));
      }},
    ]);
  }

  const completed = goals.filter(g => g.completed).length;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎯 Objectifs</Text>

      <View style={styles.progressCard}>
        <Text style={styles.progressText}>{completed} / {goals.length} complétés</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: goals.length > 0 ? `${(completed / goals.length) * 100}%` : '0%' }]} />
        </View>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Nouvel objectif... ex: 10 wins ce mois"
          placeholderTextColor="#888"
          value={newGoal}
          onChangeText={setNewGoal}
          onSubmitEditing={addGoal}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addGoal}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      {goals.length === 0 && (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🏆</Text>
          <Text style={styles.emptyText}>Aucun objectif pour l'instant</Text>
          <Text style={styles.emptySubtext}>Ajoute ton premier objectif !</Text>
        </View>
      )}

      {goals.map((goal) => (
        <TouchableOpacity
          key={goal.id}
          style={[styles.goalCard, goal.completed && styles.goalCardDone]}
          onPress={() => toggleGoal(goal.id)}
          onLongPress={() => deleteGoal(goal.id)}>
          <Text style={styles.checkbox}>{goal.completed ? '✅' : '⬜'}</Text>
          <View style={styles.goalContent}>
            <Text style={[styles.goalText, goal.completed && styles.goalTextDone]}>{goal.text}</Text>
            <Text style={styles.goalDate}>{goal.date}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Text style={styles.hint}>Appui long pour supprimer un objectif</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', padding: 20 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 20, marginBottom: 20 },
  progressCard: { backgroundColor: '#0f0f0f', borderRadius: 12, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#1a1a1a' },
  progressText: { color: '#fff', fontSize: 16, fontWeight: '600', marginBottom: 12 },
  progressBar: { height: 6, backgroundColor: '#1a1a1a', borderRadius: 3 },
  progressFill: { height: 6, backgroundColor: '#4ade80', borderRadius: 3 },
  inputRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  input: { flex: 1, backgroundColor: '#0f0f0f', borderWidth: 1, borderColor: '#1a1a1a', borderRadius: 10, padding: 14, color: '#fff', fontSize: 15 },
  addBtn: { backgroundColor: '#4ade80', borderRadius: 10, width: 50, justifyContent: 'center', alignItems: 'center' },
  addBtnText: { color: '#000', fontSize: 24, fontWeight: 'bold' },
  empty: { alignItems: 'center', marginTop: 40 },
  emptyEmoji: { fontSize: 48, marginBottom: 16 },
  emptyText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  emptySubtext: { color: '#888', fontSize: 14, marginTop: 8 },
  goalCard: { backgroundColor: '#0f0f0f', borderRadius: 12, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#1a1a1a' },
  goalCardDone: { borderColor: '#4ade80', opacity: 0.6 },
  checkbox: { fontSize: 22, marginRight: 12 },
  goalContent: { flex: 1 },
  goalText: { color: '#fff', fontSize: 15 },
  goalTextDone: { textDecorationLine: 'line-through', color: '#888' },
  goalDate: { color: '#888', fontSize: 12, marginTop: 4 },
  hint: { color: '#333', fontSize: 12, textAlign: 'center', marginTop: 10, marginBottom: 30 },
});
