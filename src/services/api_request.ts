export type APIResponse = {
    data: any;
};

type Payload = Record<string, any>;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const APIRequest = {
    get: async (path: string): Promise<APIResponse> => {
        return new Promise((resolve) => {
            delay(1000).then(() => {
                resolve({ data: [] });
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
