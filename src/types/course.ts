import { CourseTopic } from 'types/course_topic';
import { Tuple } from 'types/tuple';

export type Course = {
    id: string;
    name: string;
    description: string;
    date: Tuple<Date>;
    topics: CourseTopic[];
};
