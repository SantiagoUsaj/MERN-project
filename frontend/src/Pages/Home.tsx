import { useEffect, useState } from "react";
import type { Note as NoteModel } from "../Models/Note";
import Note from "../Components/Note";
import * as NotesApi from "../services/notes_api";
import AddNoteDialog from "../Components/AddNoteDialog";

export default function Home() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(true);

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

  return (
    <main className="bg-gray-100 min-h-screen flex flex-col items-center p-8 text-justify">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors mb-4"
        onClick={() => setShowAddNoteDialog(true)}
      >
        Add Note
      </button>
      {notes.map((note) => (
        <Note key={note._id} note={note} />
      ))}
      {showAddNoteDialog && (
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
    </main>
  );
}
