import db from 'db/courses.json';
import { APIResponse } from 'services/api_request';
import usersService from 'services/user_service';
import { IAPIService } from 'types/api_service';
import { Course } from 'types/course';
import { Tuple } from 'types/tuple';
import { delay } from 'utils/delay';

class CoursesService implements IAPIService<APIResponse> {
    private static _instance: CoursesService;

    static getInstance() {
        if (!this._instance) {
            this._instance = new CoursesService();
        }
        return this._instance;
    }

    getById(id: string): Promise<any> {
        const course = db.find((course) => course.id === id);
        return new Promise((resolve) => {
            delay(1000).then(() => {
                resolve({ data: course } as APIResponse);
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

    async getAll(): Promise<APIResponse> {
        return new Promise((resolve) => {
            delay(1000).then(() => {
                resolve({ data: db } as APIResponse);
            });
        });
    }
    create(data: APIResponse): void {
        throw new Error('Method not implemented.');
    }

    update(id: string, updateValue: APIResponse) {}
    delete(id: string): Promise<APIResponse> {
        throw new Error('Method not implemented.');
    }
}

const coursesService = CoursesService.getInstance();

export default coursesService;
