import { getDatabase } from '@/db';

export async function syncNotesFromAPI() {
    const db = await getDatabase();
    const existingNotes = await db.notes.find().exec();

    if (existingNotes.length === 0) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            const notes = data.map((note: any) => ({
                id: note.id.toString(),
                title: note.title,
                body: note.body,
                createdAt: new Date().toISOString()
            }));
            await db.notes.bulkInsert(notes);
        } catch (error) {
            console.error('Failed to fetch notes', error);
        }
    }
}
