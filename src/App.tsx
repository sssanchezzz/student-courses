import { Global, ThemeProvider } from '@emotion/react';
import Nav from 'features/nav';
import { Paths } from 'utils/paths';
import CourseDetailsPage from 'pages/course_details';
import CoursesPage from 'pages/courses';
import LoginPage from 'pages/login';
import { Provider, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { store } from 'store';
import { getIsUserLoggedIn } from 'features/login_form/store/login';
import { appTheme, globalStyles } from 'theme';

function App() {
    return (
        <>
            <Provider store={store}>
                <Global styles={globalStyles} />
                <ThemeProvider theme={appTheme}>
                    <Nav />
                    <Routes>
                        <Route path={Paths.Login()} element={<LoginPage />} />
                        <Route
                            path={Paths.Home()}
                            element={
                                <RequireAuth redirectTo={Paths.Login()}>
                                    <CoursesPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path={Paths.Courses.Details()}
                            element={
                                <RequireAuth redirectTo={Paths.Login()}>
                                    <CourseDetailsPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="*"
                            element={<Navigate to={Paths.Home()} />}
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
