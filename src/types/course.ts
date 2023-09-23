import { CourseTopic } from 'types/course_topic';
import { Tuple } from 'types/tuple';

export type Course = {
    id: string;
    name: string;
    description: string;
    dateRange: Tuple<Date>;
    topics: CourseTopic[];
};
