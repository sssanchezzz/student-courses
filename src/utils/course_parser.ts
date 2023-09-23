import { Course } from 'types/course';
import { CourseTopic, CourseTopicType } from 'types/course_topic';
import { Tuple } from 'types/tuple';

type TopicsJSON = Pick<CourseTopic, 'id' | 'name' | 'description'> & {
    dateRange: string[];
    type: string;
};

type CourseJSON = Pick<Course, 'id' | 'name' | 'description'> & {
    dateRange: string[];
    topics: TopicsJSON[];
};

export const parseCourseJSON = (json: CourseJSON): Course => {
    const course = {
        ...json,
        dateRange: json.dateRange.map((d) => new Date(d)) as Tuple<Date>,
        topics: json.topics.map((t) => ({
            ...t,
            dateRange: t.dateRange.map((d) => new Date(d)) as Tuple<Date>,
            type: t.type as CourseTopicType,
        })),
    } as Course;
    return course;
};
