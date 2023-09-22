import db from 'db_courses.json';
import { APIResponse } from 'services/api_request';
import { IAPIService } from 'types/api_service';
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
