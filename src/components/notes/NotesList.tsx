'use client';

import { useState, useEffect } from 'react';
import { getDatabase } from '@/db';
import DeleteButton from '@/components/notes/DeleteButton';
import { syncNotesFromAPI } from '@/services/notesService';
import EditButton from './EditButton';

interface NotesListProps {
    onEdit: (note: any) => void;
    setFetchNotes: (fetchNotes: () => void) => void;
}

export default function NotesList({ onEdit, setFetchNotes }: NotesListProps) {
    const [notes, setNotes] = useState<any[]>([]);

    async function fetchNotes() {
        await syncNotesFromAPI();
        const db = await getDatabase();
        const storedNotes = await db.notes.find().exec();
        storedNotes.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setNotes(storedNotes);
    }

    useEffect(() => {
        fetchNotes();
        setFetchNotes(() => fetchNotes);
    }, []);

    return (
        <ul>
            {notes.map(note => (
                <li key={note.id}>
                    <div className='bg-white p-4 my-4 rounded-md border border-gray-200'>
                        <h2 className='text-2xl font-bold mb-2'>{note.title}</h2>
                        <p>{note.body}</p>
                        <div className='flex gap-2 mt-4'>
                            <EditButton onEdit={() => onEdit(note)} />
                            <DeleteButton noteId={note.id} onDelete={fetchNotes} />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
