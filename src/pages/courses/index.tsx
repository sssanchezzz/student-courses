import CoursesList from 'features/courses_list';
import { fetchCourses, getCoursesLoading } from 'features/courses_list/store';
import { getUser } from 'features/auth/store/login';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageContainer from 'components/page_container';
import Loader from 'components/loader';

const CoursesPage: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const isLoading = useSelector(getCoursesLoading);

    useEffect(() => {
        if (user) {
            dispatch(fetchCourses(user.id));
        }
    }, [user]);

    return (
        <>
            {isLoading && <Loader />}
            <PageContainer>
                <CoursesList />
            </PageContainer>
        </>
    );
};

export default CoursesPage;
