'use client';

import React, { useState } from 'react'
import NoteForm from './NoteForm';
import NotesList from './NotesList';
import Modal from '@/components/modal/Modal';

export default function Notes() {
    const [editingNote, setEditingNote] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fetchNotes, setFetchNotes] = useState<(() => void) | null>(null);

    return (
        <React.Fragment>
            <NoteForm note={editingNote} onSave={() => {
                setEditingNote(null);
                fetchNotes?.();
            }} />

            <NotesList 
                onEdit={(note) => {
                    setEditingNote(note);
                    setIsModalOpen(true);
                }} 
                setFetchNotes={setFetchNotes}
            />

            {isModalOpen && (
                <Modal onClose={() => {setIsModalOpen(false); setEditingNote(null)}}>
                    <NoteForm note={editingNote} onSave={() => {
                        setEditingNote(null);
                        setIsModalOpen(false);
                        fetchNotes?.();
                    }} />
                </Modal>
            )}
        </React.Fragment>
    )
}
