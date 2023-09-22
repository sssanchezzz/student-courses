import { delay } from 'utils/delay';
import db from 'db/courses.json';
export type APIResponse = {
    data: any;
};

type Payload = Record<string, any>;

export const APIRequest = {
    get: async (path: string): Promise<APIResponse> => {
        return new Promise((resolve) => {
            delay(1000).then(() => {
                resolve({ data: db });
            });
        });
    },
    post: async (path: string, payload: Payload): Promise<APIResponse> => {
        return new Promise((resolve) => {
            delay(1000).then(() => {
                resolve({ data: [] });
            });
        });
    },

    put: async (path: string, payload: Payload): Promise<APIResponse> => {
        return new Promise((resolve) => {
            delay(1000).then(() => {
                resolve({ data: [] });
            });
        });
    },

    remove: async (path: string): Promise<APIResponse> => {
        return new Promise((resolve) => {
            delay(1000).then(() => {
                resolve({ data: [] });
            });
        });
    },
};
