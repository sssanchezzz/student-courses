import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourse, getCourseLoading } from 'features/course_details/store';
import CourseDetails from 'features/course_details';
import PageContainer from 'components/page_container';
import Loader from 'components/loader';

const CourseDetailsPage: FC = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const isLoading = useSelector(getCourseLoading);

    useEffect(() => {
        dispatch(fetchCourse(params['id']!));
    }, []);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <PageContainer>
                    <CourseDetails />
                </PageContainer>
            )}
        </>
    );
};

export default CourseDetailsPage;
