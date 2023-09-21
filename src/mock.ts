import { isBefore } from 'date-fns';
import { Course } from 'types/course';
import { CourseTopic, CourseTopicType, PassedStatus } from 'types/course_topic';

const randomDate = (start: Date, end: Date): Date => {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
};

const generateMockCourse = (i: number): Course => {
    const today = new Date();
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30);

    const course: Course = {
        id: `course-${i}`,
        name: 'Course Name',
        description: 'Course Description',
        date: [startDate, endDate],
        topics: [],
    };

    const numTopics = Math.floor(Math.random() * 10) + 5;

    for (let i = 0; i < numTopics; i++) {
        const topicStartDate = randomDate(startDate, endDate);
        const topicEndDate = randomDate(topicStartDate, endDate);

        const topic: CourseTopic = {
            id: `${course.name}-topic-${i}`,
            name: `Topic ${i + 1}`,
            description: `Short description ${i + 1}`,
            status: isBefore(today, topicEndDate)
                ? PassedStatus.upcoming
                : PassedStatus.passed,
            dateRange: [topicStartDate, topicEndDate],
            type:
                i % 2 === 0
                    ? CourseTopicType.LECTURE
                    : CourseTopicType.PRACTICE,
        };

        course.topics.push(topic);
    }

    return course;
};

const generateMockCourses = (numCourses: number): Course[] => {
    const courses: Course[] = [];
    for (let i = 0; i < numCourses; i++) {
        courses.push(generateMockCourse(i));
    }
    return courses;
};

export const MOCK_DATA: Course[] = generateMockCourses(15);
