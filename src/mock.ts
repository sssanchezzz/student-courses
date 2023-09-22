import { isBefore } from 'date-fns';
import { Course } from 'types/course';
import { CourseTopic, CourseTopicType, PassedStatus } from 'types/course_topic';
import { User } from 'types/user';
import { formatDate } from 'utils/date-format';
import bcrypt from 'bcryptjs';
import { UserTopicNotes } from 'types/user_course_topic_notes';

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

const generateMockUsers = (numUsers: number, courseCount: number): User[] => {
    const users: User[] = [];

    const courses = Array.from(
        { length: courseCount },
        (_, i) => `course-${i}`
    );

    for (let i = 0; i < numUsers; i++) {
        const userId = `user-${i}`;
        const userName = `User ${i + 1}`;
        const userSurname = `Surname ${i + 1}`;
        const userLogin = `user${i}@example.com`; // Adjust as needed

        // Generate a random password for the user
        const rawPassword = 'password'; // Replace with your desired default password
        const saltRounds = 10; // Adjust the salt rounds as needed
        const hashedPassword = bcrypt.hashSync(rawPassword, saltRounds);

        // Select a random subset of courses for the user
        const userCourses = courses
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.random() * 5); // Adjust the number of courses as needed

        const user: User = {
            id: userId,
            name: userName,
            surname: userSurname,
            login: userLogin,
            password: hashedPassword,
            courses: userCourses,
        };

        users.push(user);
    }

    return users;
};

// Usage example:
const numUsers = 5;
const courseCount = 25; // Number of courses available
export const mockUsers = generateMockUsers(numUsers, courseCount);

// Print the generated users

const generateMockUserTopicNotes = (
    courseCount: number,
    maxNotesPerTopic: number,
    userCount: number
): UserTopicNotes[] => {
    const userTopicNotes: UserTopicNotes[] = [];

    for (let courseId = 0; courseId < courseCount; courseId++) {
        for (let topicId = 0; topicId < 6; topicId++) {
            for (let userId = 0; userId < userCount; userId++) {
                // Generate a random number of notes for the topic (0 to maxNotesPerTopic)
                const numNotes = Math.floor(
                    Math.random() * (maxNotesPerTopic + 1)
                );

                for (let i = 0; i < numNotes; i++) {
                    const note: UserTopicNotes = {
                        courseId: `course-${courseId}`,
                        topicId: `course-${courseId}-topic-${topicId}`,
                        userId: `user-${userId}`,
                        notes: `User ${
                            userId + 1
                        }'s note on ${courseId}-topic-${topicId}: ${generateMeaningfulNote()}`,
                    };
                    userTopicNotes.push(note);
                }
            }
        }
    }

    return userTopicNotes;
};

const generateMeaningfulNote = () => {
    // You can modify this function to generate meaningful notes as needed
    const phrases = [
        'This topic was really helpful!',
        'I struggled a bit with this, but I got it eventually.',
        'Great explanation in this topic!',
        'I need more practice on this one.',
        'Can someone help me understand this better?',
        'I found a useful resource related to this topic.',
        "I'm looking for a study group for this topic.",
        'I enjoyed learning about this!',
        'I recommend watching this video for extra clarity.',
    ];

    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
};

// Usage example:
const maxNotesPerTopic = 2; // Maximum number of notes per topic
const userCount = 5; // Number of users

export const mockUserTopicNotes = generateMockUserTopicNotes(
    courseCount,
    maxNotesPerTopic,
    userCount
);

// Print the generated user topic notes
