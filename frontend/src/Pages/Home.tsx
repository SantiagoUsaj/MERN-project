import { useEffect, useState } from "react";
import type { Note as NoteModel } from "../Models/Note";
import Note from "../Components/Note";
import * as NotesApi from "../services/notes_api";
import AddEditNoteDialog from "../Components/AddEditNoteDialog";
import { FaPlus } from "react-icons/fa";

export default function Home() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
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

  const notesGrid = (
    <>
      {notes.map((note) => (
        <Note
          key={note._id}
          note={note}
          onDeleteNoteClick={deleteNote}
          onNoteClicked={setNoteToEdit}
        />
      ))}
    </>
  );

  return (
    <main className="bg-gray-100 min-h-screen flex flex-col items-center p-8 text-justify">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors mb-4"
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus className="inline-block mr-1" />
        Add Note
      </button>
      {notesLoading && <div>Loading notes...</div>}
      {showNotesLoadingError && (
        <div className="text-red-500">
          Failed to load notes. Please try again later.
        </div>
      )}
      {!notesLoading && !showNotesLoadingError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {notes.length > 0 ? notesGrid : <div>No notes available.</div>}
        </div>
      )}
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
