import { UserTopicNote } from 'types/user_course_topic_note';
import { delay } from 'utils/delay';
import db from 'db/notes.json';
import coursesService from 'services/courses_service';

class UserNotesService {
    private static _instance: UserNotesService;

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
            delay(1000).then(() => {
                const notes = db.filter(
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
            delay(1000).then(() => {
                this.getUserNotesForTopic(
                    note.userId,
                    note.courseId,
                    note.topicId
                ).then((notes) => {
                    const noteId = `${note.userId}-${note.topicId}-note-${notes.length}`;
                    resolve({ ...note, id: noteId });
                });
            });
        });
    }
}

const userNotesService = UserNotesService.getInstance();

export default userNotesService;
