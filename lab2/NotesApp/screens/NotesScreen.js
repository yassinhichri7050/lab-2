// src/screens/NotesScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { getNotes, deleteNote } from "../services/note-service";
import { useAuth } from "../contexts/AuthContext";
import NoteItem from "../components/NoteItem";
import AddNoteModal from "../components/AddNoteModal";

const NotesScreen = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    fetchNotes();
  }, [user]);

  // Fetch notes depuis Appwrite
  const fetchNotes = async () => {
    if (!user) {
      return;
    }

    try {
      setLoading(true);
      const fetchedNotes = await getNotes(user.$id);
      setNotes(fetchedNotes);
      setError(null);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to load notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Ajouter une nouvelle note à l'état
  const handleNoteAdded = (newNote) => {
    setNotes((currentNotes) => [newNote, ...currentNotes]);
  };

  // Supprimer une note
  const handleNoteDeleted = async (noteId) => {
    try {
      await deleteNote(noteId); // Supprimer côté Appwrite
      setNotes((currentNotes) => currentNotes.filter((note) => note.$id !== noteId));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  // Mettre à jour une note
  const handleNoteUpdated = (updatedNote) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) => (note.$id === updatedNote.$id ? updatedNote : note))
    );
  };

  // Loader
  if (loading && notes.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  // Message d'erreur
  if (error && notes.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Notes</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add Note</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des notes */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <NoteItem
            note={item}
            onNoteDeleted={handleNoteDeleted}
            onNoteUpdated={handleNoteUpdated}
          />
        )}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No notes yet</Text>
              <Text style={styles.emptyText}>
                You don't have any notes yet.
              </Text>
              <Text style={styles.emptyText}>
                Tap the "+ Add Note" button to create your first note.
              </Text>
            </View>
          )
        }
        contentContainerStyle={notes.length === 0 ? styles.emptyListContent : styles.listContent}
        refreshing={loading}
        onRefresh={fetchNotes}
      />

      {/* Modal pour ajouter une note */}
      <AddNoteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onNoteAdded={handleNoteAdded}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#95a5a6",
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: "#95a5a6",
    textAlign: "center",
    marginBottom: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});

export default NotesScreen;
