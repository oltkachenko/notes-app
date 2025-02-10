import { notesSchema } from '@/schema/notesSchema';
import { addRxPlugin, createRxDatabase, RxDatabase } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';

addRxPlugin(RxDBDevModePlugin);

interface DatabaseCollections {
    notes: any;
}

let dbPromise: Promise<RxDatabase<DatabaseCollections>> | null = null;

export async function getDatabase(): Promise<RxDatabase<DatabaseCollections>> {
    if (!dbPromise) {
        dbPromise = createRxDatabase<DatabaseCollections>({
            name: 'notesdb',
            storage: wrappedValidateAjvStorage({
                storage: getRxStorageDexie()
            })
        }).then(async (db) => {
            await db.addCollections({
                notes: { schema: notesSchema }
            });
            return db;
        });
    }
    return dbPromise;
}

export async function addNote(id: string, title: string, body: string, createdAt: string) {
    const db = await getDatabase();
    return db.notes.insert({ id, title, body, createdAt });
}

export async function updateNote(id: string, title: string, body: string) {
    const db = await getDatabase();
    const note = await db.notes.findOne({ selector: { id } }).exec();
    if (note) {
        await note.patch({ title, body });
    }
}

export async function deleteNote(id: string) {
    const db = await getDatabase();
    const note = await db.notes.findOne({ selector: { id } }).exec();
    if (note) {
        await note.remove();
    }
}

export async function getAllNotes() {
    const db = await getDatabase();
    return db.notes.find().exec();
}