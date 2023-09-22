import styled from '@emotion/styled';
import { LinearProgress } from '@mui/material';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCourse,
    getCourse,
    getCourseLoading,
} from 'features/course_details/store';
import CourseDetails from 'features/course_details';

const CourseDetailsPage: FC = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const course = useSelector(getCourse);
    const isLoading = useSelector(getCourseLoading);
    useEffect(() => {
        dispatch(fetchCourse(params['id']!));
    }, []);

    return (
        <>
            {isLoading && <LinearProgress />}
            <PageContainer>
                <CourseDetails />
            </PageContainer>
        </>
    );
};

const PageContainer = styled.div`
    width: 80%;
    margin: 0 auto;
`;

export default CourseDetailsPage;
