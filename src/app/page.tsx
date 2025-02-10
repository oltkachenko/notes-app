import Notes from '@/components/notes/Notes';
import OfflineMode from '@/components/OfflineMode';

export default function Home() {
    return (
        <div>
            <OfflineMode />
            <Notes />
        </div>
    );
}
