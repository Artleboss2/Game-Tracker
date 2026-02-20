import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GAMES = [
  { id: 'fortnite', name: 'Fortnite', emoji: '🎯' },
  { id: 'minecraft', name: 'Minecraft', emoji: '⛏️' },
  { id: 'valorant', name: 'Valorant', emoji: '🔫' },
];

const FORTNITE_API_KEY = 'YOUR_API_KEY';

export default function SearchScreen({ route }) {
  const gameIdFromHome = route?.params?.gameId;
  const [selectedGame, setSelectedGame] = useState(gameIdFromHome || 'fortnite');
  const [username, setUsername] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (gameIdFromHome) {
      setSelectedGame(gameIdFromHome);
      setStats(null);
      setError(null);
      setUsername('');
    }
  }, [gameIdFromHome]);

  async function saveToHistory(stats) {
    try {
      const existing = await AsyncStorage.getItem('searchHistory');
      const history = existing ? JSON.parse(existing) : [];
      const entry = {
        username,
        emoji: GAMES.find(g => g.id === selectedGame).emoji,
        stats,
        date: new Date().toLocaleDateString('fr-CA'),
      };
      const updated = [entry, ...history].slice(0, 20);
      await AsyncStorage.setItem('searchHistory', JSON.stringify(updated));
    } catch (e) {
      console.log(e);
    }
  }

  async function searchPlayer() {
    if (!username.trim()) return;
    setLoading(true);
    setError(null);
    setStats(null);

    try {
      let result = null;

      if (selectedGame === 'fortnite') {
        const res = await axios.get(
          `https://fortnite-api.com/v2/stats/br/v2?name=${username}`,
          { headers: { 'Authorization': FORTNITE_API_KEY } }
        );
        result = {
          Wins: res.data.data.stats.all.overall.wins,
          Kills: res.data.data.stats.all.overall.kills,
          Matches: res.data.data.stats.all.overall.matches,
          'K/D': res.data.data.stats.all.overall.kd,
          'Win Rate': res.data.data.stats.all.overall.winRate + '%',
        };

      } else if (selectedGame === 'minecraft') {
        const res = await axios.get(
          `https://api.minetools.eu/uuid/${username}`
        );
        if (res.data.status !== 'OK') {
          setError('Joueur Minecraft introuvable.');
          setLoading(false);
          return;
        }
        result = {
          Username: res.data.name,
          UUID: res.data.id,
        };

      } else if (selectedGame === 'valorant') {
        const parts = username.split('#');
        if (parts.length !== 2) {
          setError('Format requis: NomJoueur#TAG (ex: Pseudo#1234)');
          setLoading(false);
          return;
        }
        const [name, tag] = parts;
        const res = await axios.get(
          `https://api.henrikdev.xyz/valorant/v1/account/${name}/${tag}`
        );
        result = {
          Username: res.data.data.name,
          Tag: res.data.data.tag,
          Region: res.data.data.region.toUpperCase(),
          Level: res.data.data.account_level,
        };
      }

      setStats(result);
      await saveToHistory(result);

    } catch (e) {
      setError('Joueur introuvable ou erreur API.');
    }
    setLoading(false);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🔍 Recherche</Text>

      <View style={styles.gameSelector}>
        {GAMES.map((g) => (
          <TouchableOpacity
            key={g.id}
            style={[styles.gameBtn, selectedGame === g.id && styles.gameBtnActive]}
            onPress={() => { setSelectedGame(g.id); setStats(null); setError(null); setUsername(''); }}>
            <Text style={styles.gameEmoji}>{g.emoji}</Text>
            <Text style={[styles.gameName, selectedGame === g.id && styles.gameNameActive]}>{g.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedGame === 'valorant' && (
        <Text style={styles.hint}>Format: NomJoueur#TAG</Text>
      )}

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder={selectedGame === 'valorant' ? 'Pseudo#TAG...' : 'Nom du joueur...'}
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
          onSubmitEditing={searchPlayer}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={searchPlayer}>
          <Text style={styles.searchBtnText}>Go</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator color="#4ade80" style={{ marginTop: 30 }} />}
      {error && <Text style={styles.error}>{error}</Text>}

      {stats && (
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>
            {GAMES.find(g => g.id === selectedGame).emoji} Stats de {username}
          </Text>
          {Object.entries(stats).map(([key, value]) => (
            <View key={key} style={styles.statRow}>
              <Text style={styles.statKey}>{key}</Text>
              <Text style={styles.statValue}>{value}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', padding: 20 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 20, marginBottom: 20 },
  gameSelector: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  gameBtn: { flex: 1, backgroundColor: '#0f0f0f', borderWidth: 1, borderColor: '#1a1a1a', borderRadius: 10, padding: 12, alignItems: 'center' },
  gameBtnActive: { borderColor: '#4ade80' },
  gameEmoji: { fontSize: 22 },
  gameName: { color: '#888', fontSize: 12, marginTop: 4 },
  gameNameActive: { color: '#4ade80' },
  hint: { color: '#888', fontSize: 12, marginBottom: 10, marginLeft: 4 },
  searchRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  input: { flex: 1, backgroundColor: '#0f0f0f', borderWidth: 1, borderColor: '#1a1a1a', borderRadius: 10, padding: 14, color: '#fff', fontSize: 16 },
  searchBtn: { backgroundColor: '#4ade80', borderRadius: 10, paddingHorizontal: 20, justifyContent: 'center' },
  searchBtnText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  error: { color: '#ef4444', textAlign: 'center', marginTop: 20 },
  statsCard: { backgroundColor: '#0f0f0f', borderRadius: 12, padding: 20, borderWidth: 1, borderColor: '#1a1a1a' },
  statsTitle: { color: '#fff', fontSize: 18, fontWeight: '600', marginBottom: 16 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#1a1a1a' },
  statKey: { color: '#888', fontSize: 14 },
  statValue: { color: '#4ade80', fontSize: 14, fontWeight: '600' },
});
