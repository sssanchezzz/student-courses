import { Global, css } from '@emotion/react';
import Nav from 'components/nav';
import { Paths } from 'constants/paths';
import CourseDetailsPage from 'pages/course_details';
import CoursesPage from 'pages/courses';
import LoginPage from 'pages/login';
import { Provider } from 'react-redux';

import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from 'react-router-dom';
import { store } from 'store';

const globalStyles = css`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

const router = createBrowserRouter([
    { path: Paths.Login, element: <LoginPage /> },
    {
        path: Paths.Home,
        element: (
            <RequireAuth redirectTo={Paths.Login}>
                <CoursesPage />
            </RequireAuth>
        ),
    },
    {
        path: Paths.CourseDetails,
        element: (
            <RequireAuth redirectTo={Paths.Login}>
                <CourseDetailsPage />
            </RequireAuth>
        ),
    },
]);

function App() {
    return (
        <>
            <Provider store={store}>
                <Global styles={globalStyles} />
                <Nav />
                <RouterProvider router={router} />
            </Provider>
        </>
    );
}

function RequireAuth({
    children,
    redirectTo,
}: {
    children: JSX.Element | null;
    redirectTo: string;
}) {
    let isAuthenticated = !!localStorage.getItem('user');
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default App;
