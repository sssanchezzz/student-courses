import { isBefore } from 'date-fns';
import { Course } from 'types/course';
import { CourseTopic, CourseTopicType, PassedStatus } from 'types/course_topic';
import { formatDate } from 'utils/date-format';

const randomDate = (start: Date, end: Date): Date => {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
};

const words = [
    'Got',
    'ability',
    'shop',
    'recall',
    'fruit',
    'easy',
    'food',
    'math',
    'potential',
    'exception',
    'giant',
    'shaking',
    'ground',
    'weather',
    'lesson',
    'almost',
    'square',
    'forward',
    'bend',
    'cold',
    'broken',
    'distant',
    'adjective.',
];
function getRandomWord(firstLetterToUppercase = false) {
    const word = words[randomNumber(0, words.length - 1)];
    return firstLetterToUppercase
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word;
}
function generateWords(length = 10) {
    return (
        [...Array(length)]
            .map((_, i) => getRandomWord(i === 0))
            .join(' ')
            .trim() + '.'
    );
}
function randomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
}

const generateMockCourse = (i: number): Course => {
    const today = new Date();
    const startDate = new Date();

    startDate.setDate(startDate.getDate() - randomNumber(1, 30));
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + randomNumber(1, 30));

    const course: Course = {
        id: `course-${i}`,
        name: generateWords(3),
        description: generateWords(35 + i),
        date: [startDate, endDate],
        topics: [],
    };

    let currentDate = startDate; // Initialize currentDate with the course start date

    const numTopics = Math.floor(Math.random() * 10) + 5;

    for (let i = 0; i < numTopics; i++) {
        const topicStartDate = currentDate; // Use the current date as the topic start date
        const topicEndDate = new Date(
            currentDate.getTime() + randomNumber(1, 21) * 24 * 60 * 60 * 1000
        ); // Add a random number of days to the current date for the end date

        const topic: CourseTopic = {
            id: `${course.id}-topic-${i}`,
            name: `Topic ${i + 1} - ${generateWords(5)}`,
            description: generateWords(20 + i),
            dateRange: [topicStartDate, topicEndDate],
            type:
                i % 2 === 0
                    ? CourseTopicType.LECTURE
                    : CourseTopicType.PRACTICE,
        };

        course.topics.push(topic);

        // Update currentDate to the day after the current topic's end date
        currentDate = new Date(topicEndDate.getTime() + 1);
    }
    course.date[1] = course.topics[course.topics.length - 1].dateRange[1];

    return course;
};

const generateMockCourses = (numCourses: number): Course[] => {
    const courses: Course[] = [];
    for (let i = 0; i < numCourses; i++) {
        courses.push(generateMockCourse(i));
    }
    return courses;
};

export const MOCK_DATA: Course[] = generateMockCourses(25);
