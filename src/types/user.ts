import { Course } from 'types/course';
import { UserNotes } from 'types/user_course_topic_notes';

export type User = {
    id: string;
    name: string;
    login: string;
    password: string;
    courses: Course[];
    notes: UserNotes;
};
