import db from 'db/courses.json';
import usersService from 'services/user_service';
import { Course } from 'types/course';
import { Tuple } from 'types/tuple';
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
        return new Promise((resolve) => {
            delay(1000).then(() => {
                resolve(course as unknown as Course); // TODO: implement course parser to make the dates a proper Tuple<Date> type
            });
        });
    }

    getByUserId(userId: string): Promise<Course[] | null> {
        return new Promise((resolve) => {
            delay(1000).then(() => {
                usersService.getById(userId).then((res) => {
                    if (res === null) {
                        resolve(null);
                        return;
                    }

                    const courses = db
                        .filter((course) => res.courses.includes(course.id))
                        .map((courses) => ({
                            ...courses,
                            date: courses.date.map(
                                (d) => new Date(d)
                            ) as Tuple<Date>,
                            topics: courses.topics.map((t) => ({
                                ...t,
                                dateRange: t.dateRange.map(
                                    (d) => new Date(d)
                                ) as Tuple<Date>,
                            })),
                        })) as Course[];

                    resolve(courses);
                });
            });
        });
    }
}

const coursesService = CoursesService.getInstance();

export default coursesService;
