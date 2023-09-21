import { Global, css } from '@emotion/react';
import { Paths } from 'constants/paths';
import HomePage from 'pages';
import CourseDetailsPage from 'pages/course_details';
import CoursesPage from 'pages/courses';
import LoginPage from 'pages/login';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const globalStyles = css`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

const router = createBrowserRouter([
    { path: Paths.Home, element: <HomePage /> },
    { path: Paths.Login, element: <LoginPage /> },
    { path: Paths.Courses, element: <CoursesPage /> },
    { path: Paths.CourseDetails, element: <CourseDetailsPage /> },
]);

function App() {
    return (
        <>
            <Global styles={globalStyles} />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
