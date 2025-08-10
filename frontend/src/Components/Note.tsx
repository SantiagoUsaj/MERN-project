import type { Note as NoteModel } from "../Models/Note";

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  return (
    <div className="bg-[#fcf6e3] border border-[#e5e5c9] rounded-lg p-4 m-2 min-w-[220px] shadow-md flex flex-col justify-between h-40">
      <div>
        <div className="font-bold text-[1.1rem] mb-1">{title}</div>
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
