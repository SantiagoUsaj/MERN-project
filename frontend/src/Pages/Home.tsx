import { useEffect, useState } from "react";
import type { Note } from "../Models/Note";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("/api/notes", {
          method: "GET",
        });
        const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        alert("Failed to load notes. Please try again later.");
      }
    }
    loadNotes();
  }, []);

  return (
    <main className="bg-gray-100 min-h-screen flex flex-col items-center pb-8 text-justify">
      {JSON.stringify(notes)}
    </main>
  );
}
