import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const games = [
  { id: 'fortnite', name: 'Fortnite', emoji: '🎯', color: '#6366f1', desc: 'Wins, K/D, Win Rate...' },
  { id: 'minecraft', name: 'Minecraft', emoji: '⛏️', color: '#4ade80', desc: 'UUID, Username...' },
  { id: 'valorant', name: 'Valorant', emoji: '🔫', color: '#ef4444', desc: 'Bientôt disponible' },
];

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎮 Game Tracker</Text>
      <Text style={styles.subtitle}>Sélectionne un jeu pour voir tes stats</Text>

      {games.map((game) => (
        <TouchableOpacity
          key={game.id}
          style={[styles.card, { borderLeftColor: game.color }]}
          onPress={() => navigation.navigate('Recherche', { gameId: game.id })}>
          <Text style={styles.emoji}>{game.emoji}</Text>
          <View style={styles.cardContent}>
            <Text style={styles.gameName}>{game.name}</Text>
            <Text style={styles.gameDesc}>{game.desc}</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>💡 Tips</Text>
        <Text style={styles.tipsText}>• Clique sur un jeu pour rechercher un joueur</Text>
        <Text style={styles.tipsText}>• Tes recherches sont sauvegardées dans l'historique</Text>
        <Text style={styles.tipsText}>• Ajoute des objectifs dans l'onglet 🎯</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', padding: 20 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 20, marginBottom: 8 },
  subtitle: { color: '#888', fontSize: 14, marginBottom: 30 },
  card: { backgroundColor: '#0f0f0f', borderRadius: 12, padding: 20, marginBottom: 16, flexDirection: 'row', alignItems: 'center', borderLeftWidth: 4, borderWidth: 1, borderColor: '#1a1a1a' },
  emoji: { fontSize: 32, marginRight: 16 },
  cardContent: { flex: 1 },
  gameName: { color: '#fff', fontSize: 18, fontWeight: '600' },
  gameDesc: { color: '#888', fontSize: 13, marginTop: 4 },
  arrow: { color: '#888', fontSize: 18 },
  tipsCard: { backgroundColor: '#0f0f0f', borderRadius: 12, padding: 20, marginTop: 10, borderWidth: 1, borderColor: '#1a1a1a' },
  tipsTitle: { color: '#fff', fontSize: 16, fontWeight: '600', marginBottom: 12 },
  tipsText: { color: '#888', fontSize: 13, marginBottom: 8 },
});
