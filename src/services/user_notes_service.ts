import { UserTopicNote } from 'types/user_course_topic_note';
import { delay } from 'utils/delay';
import notes from 'db/notes.json';

class UserNotesService {
    private static _instance: UserNotesService;

    private db: UserTopicNote[] = notes;

    static getInstance() {
        if (!this._instance) {
            this._instance = new UserNotesService();
        }
        return this._instance;
    }

    getUserNotesForTopic(
        userId: string,
        courseId: string,
        topicId: string
    ): Promise<UserTopicNote[]> {
        return new Promise((resolve) => {
            delay().then(() => {
                const notes = this.db.filter(
                    (note) =>
                        note.userId === userId &&
                        note.courseId === courseId &&
                        note.topicId === topicId
                );

                resolve(notes);
            });
        });
    }

    createNoteForTopic(
        note: Omit<UserTopicNote, 'id'>
    ): Promise<UserTopicNote> {
        return new Promise((resolve) => {
            delay().then(() => {
                this.getUserNotesForTopic(
                    note.userId,
                    note.courseId,
                    note.topicId
                ).then((notes) => {
                    const noteId = `${note.userId}-${note.topicId}-note-${notes.length}`;
                    const createdNote = { ...note, id: noteId };

                    this.db.push(createdNote);

                    resolve(createdNote);
                });
            });
        });
    }
}

const userNotesService = UserNotesService.getInstance();

export default userNotesService;
