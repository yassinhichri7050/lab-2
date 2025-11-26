import 'package:appwrite/models.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../services/note_service.dart';
import '../widgets/add_note_modal.dart';
import '../widgets/logout_button.dart';
import '../widgets/note_item.dart';

class NotesScreen extends StatefulWidget {
  const NotesScreen({Key? key}) : super(key: key);

  @override
  _NotesScreenState createState() => _NotesScreenState();
}

class _NotesScreenState extends State<NotesScreen> {
  final NoteService _noteService = NoteService();
  List<Document> _notes = [];
  bool _isLoading = true;
  String? _error;
  bool _redirected = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _fetchNotes());
  }

  // Function to fetch notes from the database
  Future<void> _fetchNotes() async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final user = authProvider.user;

    if (user == null) {
      setState(() {
        _notes = [];
        _isLoading = false;
      });
      return;
    }

    try {
      setState(() {
        _isLoading = true;
        _error = null;
      });

      final fetchedNotes = await _noteService.getNotes(user.$id);

      setState(() {
        _notes = fetchedNotes;
        _isLoading = false;
      });
    } catch (e) {
      print('Error fetching notes: $e');
      setState(() {
        _error = 'Failed to load notes. Please try again.';
        _isLoading = false;
      });
    }
  }

  // Show the add note dialog
  void _showAddNoteDialog(String userId) {
    showDialog(
      context: context,
      builder: (context) => AddNoteModal(
        onNoteAdded: _handleNoteAdded,
        userId: userId,
      ),
    );
  }

  // Add the new note to the state without refetching
  void _handleNoteAdded(Document note) {
    setState(() {
      _notes = [note, ..._notes];
    });
  }

  void _handleNoteUpdated(Document updatedNote) {
    setState(() {
      _notes = _notes
          .map((note) => note.$id == updatedNote.$id ? updatedNote : note)
          .toList();
    });
  }

  // Handle note deletion by removing it from the list
  void _handleNoteDeleted(String noteId) {
    setState(() {
      _notes = _notes.where((note) => note.$id != noteId).toList();
    });
  }

  void _redirectIfNeeded(AuthProvider authProvider) {
    if (_redirected) return;
    if (!authProvider.loading && !authProvider.isAuthenticated) {
      _redirected = true;
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) {
          Navigator.pushReplacementNamed(context, 'auth');
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);
    _redirectIfNeeded(authProvider);
    final user = authProvider.user;

    return Scaffold(
      appBar: AppBar(
        title: const Text('My Notes'),
        actions: const [LogoutButton()],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'All Notes',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Colors.black87,
                  ),
                ),
                ElevatedButton(
                  onPressed: user == null
                      ? null
                      : () => _showAddNoteDialog(user.$id),
                  child: const Text('+ Add Note'),
                ),
              ],
            ),
            const SizedBox(height: 16),
            if (_isLoading && _notes.isEmpty)
              const Expanded(
                child: Center(child: CircularProgressIndicator()),
              )
            else if (_error != null && _notes.isEmpty)
              Expanded(
                child: Center(
                  child: Text(
                    _error!,
                    style: const TextStyle(color: Colors.red, fontSize: 16),
                    textAlign: TextAlign.center,
                  ),
                ),
              )
            else if (!_isLoading && _notes.isEmpty)
              Expanded(
                child: RefreshIndicator(
                  onRefresh: _fetchNotes,
                  child: ListView(
                    physics: const AlwaysScrollableScrollPhysics(),
                    children: const [
                      SizedBox(height: 120),
                      Center(
                        child: Text(
                          "You don’t have any notes yet. Tap the button to create your first note!",
                          style: TextStyle(fontSize: 16, color: Colors.black54),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ],
                  ),
                ),
              )
            else
              Expanded(
                child: RefreshIndicator(
                  onRefresh: _fetchNotes,
                  child: ListView.builder(
                    physics: const AlwaysScrollableScrollPhysics(),
                    itemCount: _notes.length,
                    itemBuilder: (context, index) {
                      return NoteItem(
                        note: _notes[index],
                        onNoteDeleted: _handleNoteDeleted,
                        onNoteUpdated: _handleNoteUpdated,
                      );
                    },
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
