import { Tuple } from 'types/tuple';

export type CourseTopic = {
    id: string;
    name: string;
    description: string;
    dateRange: Tuple<Date>;
    type: CourseTopicType;
};

export enum PassedStatus {
    'upcoming',
    'passed',
}

export enum CourseTopicType {
    LECTURE = 'Lecture',
    PRACTICE = 'Practice',
}
