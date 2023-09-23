import { Global, css } from '@emotion/react';
import Nav from 'components/nav';
import { Paths } from 'constants/paths';
import CourseDetailsPage from 'pages/course_details';
import CoursesPage from 'pages/courses';
import LoginPage from 'features/auth';
import { Provider, useSelector } from 'react-redux';

import { Navigate, Route, Routes } from 'react-router-dom';
import { store } from 'store';
import { getIsUserLoggedIn } from 'features/auth/store/login';
import { ThemeProvider, createTheme } from '@mui/material';

const globalStyles = css`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#ffab00',
            light: '#ffdf9f',
        },
        secondary: {
            main: '#f50057',
        },
    },
});

function App() {
    return (
        <>
            <Provider store={store}>
                <Global styles={globalStyles} />
                <ThemeProvider theme={theme}>
                    <Nav />
                    <Routes>
                        <Route path={Paths.Login} element={<LoginPage />} />
                        <Route
                            path={Paths.Home}
                            element={
                                <RequireAuth redirectTo={Paths.Login}>
                                    <CoursesPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path={Paths.CourseDetails}
                            element={
                                <RequireAuth redirectTo={Paths.Login}>
                                    <CourseDetailsPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="*"
                            element={<Navigate to={Paths.Home} />}
                        />
                    </Routes>
                </ThemeProvider>
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
    let isAuthenticated = useSelector(getIsUserLoggedIn);
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default App;
