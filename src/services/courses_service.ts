import db from 'db/courses.json';
import usersService from 'services/user_service';
import { Course } from 'types/course';
import { parseCourseJSON } from 'utils/course_parser';
import { delay } from 'utils/delay';

class CoursesService {
    private static _instance: CoursesService;

    static getInstance() {
        if (!this._instance) {
            this._instance = new CoursesService();
        }
        return this._instance;
    }

    getById(id: string): Promise<Course> {
        const course = db.find((course) => course.id === id);
        return new Promise((res, rej) => {
            delay().then(() => {
                if (course) {
                    res(parseCourseJSON(course));
                    return;
                }
                rej('Course not found');
            });
        });
    }

    getByUserId(userId: string): Promise<Course[] | null> {
        return new Promise((resolve) => {
            delay().then(() => {
                usersService.getById(userId).then((res) => {
                    if (res === null) {
                        resolve(null);
                        return;
                    }

                    const courses = db
                        .filter((course) => res.courses.includes(course.id))
                        .map((course) => parseCourseJSON(course));

                    resolve(courses);
                });
            });
        });
    }
}

const coursesService = CoursesService.getInstance();

export default coursesService;
