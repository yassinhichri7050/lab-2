// lib/widgets/note_item.dart
import 'package:flutter/material.dart';
import 'package:appwrite/models.dart';
import '../services/note_service.dart';
import 'edit_note_modal.dart'; // 🔹 Pour la modification

class NoteItem extends StatefulWidget {
  final Document note;
  final Function(String) onNoteDeleted;
  final Function(Document)? onNoteUpdated;

  const NoteItem({
    Key? key,
    required this.note,
    required this.onNoteDeleted,
    this.onNoteUpdated,
  }) : super(key: key);

  @override
  _NoteItemState createState() => _NoteItemState();
}

class _NoteItemState extends State<NoteItem> {
  final NoteService _noteService = NoteService();
  bool _isDeleting = false;

  // 🔹 Formatage de la date
  String _formatDate(String dateString) {
    final date = DateTime.parse(dateString);
    return '${date.day}/${date.month}/${date.year}';
  }

  // 🗑️ Suppression avec confirmation
  Future<void> _handleDelete() async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Supprimer la note'),
        content: const Text('Voulez-vous vraiment supprimer cette note ?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Annuler'),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: const Text(
              'Supprimer',
              style: TextStyle(color: Colors.red),
            ),
          ),
        ],
      ),
    );

    if (confirmed == true) {
      try {
        setState(() => _isDeleting = true);

        await _noteService.deleteNote(widget.note.$id);
        widget.onNoteDeleted(widget.note.$id);

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Note supprimée avec succès'),
            backgroundColor: Colors.green,
          ),
        );
      } catch (e) {
        print('Erreur suppression: $e');
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Erreur lors de la suppression.'),
            backgroundColor: Colors.red,
          ),
        );
      } finally {
        if (mounted) setState(() => _isDeleting = false);
      }
    }
  }

  // ✏️ Édition via une modale
  void _editNote() {
    showDialog(
      context: context,
      builder: (context) => EditNoteModal(
        note: widget.note,
        onNoteUpdated: (updatedNote) {
          if (widget.onNoteUpdated != null) {
            widget.onNoteUpdated!(updatedNote);
          }
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final title = widget.note.data['title'] ?? 'Sans titre';
    final content = widget.note.data['content'] ?? 'Aucun contenu';
    final updatedAt = widget.note.$updatedAt;

    return Card(
      elevation: 3,
      margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 4),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 🧾 Contenu de la note
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors.black87,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Modifiée le : ${_formatDate(updatedAt)}',
                    style: const TextStyle(
                      fontSize: 12,
                      color: Colors.grey,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    content,
                    style: const TextStyle(fontSize: 14, color: Colors.black87),
                    maxLines: 3,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),

            // 🧰 Actions (modifier/supprimer)
            Column(
              children: [
                IconButton(
                  icon: const Icon(Icons.edit, color: Colors.blue),
                  tooltip: 'Modifier',
                  onPressed: _isDeleting ? null : _editNote,
                ),
                IconButton(
                  icon: _isDeleting
                      ? const SizedBox(
                          width: 20,
                          height: 20,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : const Icon(Icons.delete, color: Colors.red),
                  tooltip: 'Supprimer',
                  onPressed: _isDeleting ? null : _handleDelete,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
