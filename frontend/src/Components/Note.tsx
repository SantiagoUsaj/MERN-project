import type { Note as NoteModel } from "../Models/Note";
import { MdDelete } from "react-icons/md";

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClick: (note: NoteModel) => void;
}

const Note = ({ note, onNoteClicked, onDeleteNoteClick }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  return (
    <div
      className="bg-[#fcf6e3] border border-[#e5e5c9] rounded-lg p-4 m-2 min-w-[220px] shadow-md flex flex-col justify-between h-40"
      onClick={() => onNoteClicked(note)}
    >
      <div>
        <div className="font-bold text-[1.1rem] mb-1">
          {title}
          <MdDelete
            className="inline-block ml-2 cursor-pointer text-red-500"
            onClick={(e) => {
              onDeleteNoteClick(note);
              e.stopPropagation();
            }}
          />
        </div>
        {text && (
          <div className="text-gray-700 text-[0.98rem] mb-2">{text}</div>
        )}
      </div>
      <div className="text-xs text-gray-500 mt-auto">
        {updatedAt
          ? `Updated: ${new Date(updatedAt).toLocaleString()}`
          : createdAt
          ? `Created: ${new Date(createdAt).toLocaleString()}`
          : null}
      </div>
    </div>
  );
};

export default Note;
