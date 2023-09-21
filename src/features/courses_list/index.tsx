import styled from '@emotion/styled';
import { Paths } from 'constants/paths';
import { getCoursesLoading, getCourses } from 'features/courses_list/store';
import CourseCard from 'features/courses_list/components/course_card';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CoursesList: FC = () => {
    const navigate = useNavigate();
    const courses = useSelector(getCourses);
    const isLoading = useSelector(getCoursesLoading);

    const handleCourseItemClick = (courseItemId: string) => {
        navigate(`${Paths.Courses}/${courseItemId}`);
    };

    return (
        <CoursesContainer>
            {courses.map((c, i) => (
                <StyledCourseItem
                    key={c.id}
                    course={c}
                    onClick={() => handleCourseItemClick(c.id)}
                />
            ))}
        </CoursesContainer>
    );
};

const CoursesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const StyledCourseItem = styled(CourseCard)`
    flex-grow: 0;
    max-width: 33.3%;
    flex-basis: 33.3%;
    min-width: 300px;
    padding: 5px;
    cursor: pointer;
`;

export default CoursesList;
