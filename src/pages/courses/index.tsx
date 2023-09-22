import CoursesList from 'features/courses_list';
import { fetchCourses } from 'features/courses_list/store';
import { MOCK_DATA } from 'mock';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const CoursesPage: FC = () => {
    const dispatch = useDispatch();
    const userId = localStorage.getItem('user');
    const d = MOCK_DATA;

    useEffect(() => {
        if (userId) {
            dispatch(fetchCourses(userId));
        }
    }, []);
    return <CoursesList />;
};

export default CoursesPage;
