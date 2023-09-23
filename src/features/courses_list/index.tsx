import styled from '@emotion/styled';
import { Paths } from 'constants/paths';
import { getCoursesLoading, getCourses } from 'features/courses_list/store';
import CourseCard from 'features/courses_list/components/course_card';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LinearProgress } from '@mui/material';

const CoursesList: FC = () => {
    const navigate = useNavigate();
    const courses = useSelector(getCourses);
    const isLoading = useSelector(getCoursesLoading);
    const handleCourseItemClick = (courseItemId: string) => {
        navigate(`${Paths.Courses}/${courseItemId}`);
    };

    return (
        <>
            {isLoading && <LinearProgress />}
            <CoursesContainer>
                {courses.map((c, i) => (
                    <StyledCourseItem
                        key={c.id}
                        course={c}
                        onClick={() => handleCourseItemClick(c.id)}
                    />
                ))}
            </CoursesContainer>
        </>
    );
};

const CoursesContainer = styled.div`
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 1fr;
`;

const StyledCourseItem = styled(CourseCard)`
    padding: 5px;
    cursor: pointer;
`;

export default CoursesList;
