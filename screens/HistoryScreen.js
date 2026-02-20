import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const data = await AsyncStorage.getItem('searchHistory');
      if (data) setHistory(JSON.parse(data));
    } catch (e) {
      console.log(e);
    }
  }

  async function clearHistory() {
    await AsyncStorage.removeItem('searchHistory');
    setHistory([]);
  }

  if (history.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>📭</Text>
        <Text style={styles.emptyText}>Aucun historique</Text>
        <Text style={styles.emptySubtext}>Recherche un joueur pour commencer !</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📊 Historique</Text>
        <TouchableOpacity onPress={clearHistory} style={styles.clearBtn}>
          <Text style={styles.clearText}>Effacer</Text>
        </TouchableOpacity>
      </View>

      {history.map((item, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.gameEmoji}>{item.emoji}</Text>
            <View>
              <Text style={styles.playerName}>{item.username}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
          {Object.entries(item.stats).map(([key, value]) => (
            <View key={key} style={styles.statRow}>
              <Text style={styles.statKey}>{key.toUpperCase()}</Text>
              <Text style={styles.statValue}>{value}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', padding: 20 },
  emptyContainer: { flex: 1, backgroundColor: '#0a0a0a', justifyContent: 'center', alignItems: 'center' },
  emptyEmoji: { fontSize: 48, marginBottom: 16 },
  emptyText: { color: '#fff', fontSize: 20, fontWeight: '600' },
  emptySubtext: { color: '#888', fontSize: 14, marginTop: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 20 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  clearBtn: { backgroundColor: '#1a1a1a', padding: 8, paddingHorizontal: 14, borderRadius: 8 },
  clearText: { color: '#ef4444', fontSize: 13 },
  card: { backgroundColor: '#0f0f0f', borderRadius: 12, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: '#1a1a1a' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  gameEmoji: { fontSize: 28, marginRight: 12 },
  playerName: { color: '#fff', fontSize: 16, fontWeight: '600' },
  date: { color: '#888', fontSize: 12, marginTop: 2 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#1a1a1a' },
  statKey: { color: '#888', fontSize: 13 },
  statValue: { color: '#4ade80', fontSize: 13, fontWeight: '600' },
});
