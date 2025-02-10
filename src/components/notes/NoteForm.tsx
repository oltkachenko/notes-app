'use client';

import { useState, FormEvent, useEffect } from 'react';
import { addNote, updateNote } from '@/db';

interface NoteFormProps {
    note?: { id: string; title: string; body: string };
    onSave: () => void;
}

export default function NoteForm({ note, onSave }: NoteFormProps) {
    const [title, setTitle] = useState(note?.title || '');
    const [body, setBody] = useState(note?.body || '');

    useEffect(() => {
        setTitle(note?.title || '');
        setBody(note?.body || '');
    }, [note]);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (note) {
            await updateNote(note.id, title, body);
        } else {
            const id = crypto.randomUUID();
            await addNote(id, title, body, new Date().toISOString());
        }

        setTitle('');
        setBody('');
        onSave();
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 rounded-md border border-gray-200">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                required
            />
            <textarea
                placeholder="Content"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                required
                rows={5}
            />
            <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
                {note ? 'Update Note' : 'Add Note'}
            </button>
        </form>
    );
}
