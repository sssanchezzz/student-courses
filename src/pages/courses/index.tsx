import CoursesList from 'features/courses_list';
import { fetchCourses } from 'features/courses_list/store';
import { getUser } from 'features/auth/store/login';
import { MOCK_DATA } from 'mock';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CoursesPage: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser);

    useEffect(() => {
        if (user) {
            dispatch(fetchCourses(user.id));
        }
    }, []);
    return <CoursesList />;
};

export default CoursesPage;
