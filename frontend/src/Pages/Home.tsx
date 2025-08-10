import { useEffect, useState } from "react";
import type { Note as NoteModel } from "../Models/Note";
import Note from "../Components/Note";
import * as NotesApi from "../services/notes_api";
import AddEditNoteDialog from "../Components/AddEditNoteDialog";
import { FaPlus } from "react-icons/fa";

export default function Home() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        alert("Failed to load notes. Please try again later.");
      }
    }
    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <main className="bg-gray-100 min-h-screen flex flex-col items-center p-8 text-justify">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors mb-4"
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus className="inline-block mr-1" />
        Add Note
      </button>
      {notes.map((note) => (
        <Note
          key={note._id}
          note={note}
          onDeleteNoteClick={deleteNote}
          onNoteClicked={setNoteToEdit}
        />
      ))}
      {showAddNoteDialog && (
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </main>
  );
}
