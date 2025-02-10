import { deleteNote } from '@/db';

interface DeleteButtonProps {
    noteId: string;
    onDelete: () => void;
}

export default function DeleteButton({ noteId, onDelete }: DeleteButtonProps) {
    const handleDelete = async () => {
        await deleteNote(noteId);
        onDelete();
    };

    return (
        <button 
            onClick={handleDelete} 
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
            Delete
        </button>
    );
}
