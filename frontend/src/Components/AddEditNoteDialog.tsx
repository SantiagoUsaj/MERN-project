import { useForm } from "react-hook-form";
import type { Note } from "../Models/Note";
import type { NoteInput } from "../services/notes_api";
import * as NotesApi from "../services/notes_api";

interface AddEditNoteDialogProps {
  noteToEdit?: Note;
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

const AddEditNoteDialog = ({
  noteToEdit,
  onDismiss,
  onNoteSaved,
}: AddEditNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await NotesApi.createNote(input);
      }
      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {noteToEdit ? "Edit Note" : "Add Note"}
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title" className="mb-2 font-semibold">
            Title
          </label>
          <input
            type="text"
            placeholder="Title"
            className="border border-gray-300 p-2 mb-4 rounded"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm mb-2">
              {errors.title.message}
            </span>
          )}
          <label htmlFor="text" className="mb-2 font-semibold">
            Text
          </label>
          <textarea
            placeholder="Text"
            className="border border-gray-300 p-2 mb-4 rounded"
            {...register("text")}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors mb-4"
            disabled={isSubmitting}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600 transition-colors"
            onClick={onDismiss}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditNoteDialog;
