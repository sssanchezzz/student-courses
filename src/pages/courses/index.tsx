import CoursesList from 'features/courses_list';
import { fetchCourses } from 'features/courses_list/store';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const CoursesPage: FC = () => {
    const dispatch = useDispatch();
    const userId = localStorage.getItem('user');

    useEffect(() => {
        if (userId) {
            dispatch(fetchCourses(userId));
        }
    }, []);
    return <CoursesList />;
};

export default CoursesPage;
