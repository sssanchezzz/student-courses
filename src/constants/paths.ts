export const Paths = {
    Home: () => '/',
    Login: () => '/login',
    Courses: {
        Main: () => '/courses',
        Details: (id: string = ':id') => `/courses/${id}`,
    },
};
