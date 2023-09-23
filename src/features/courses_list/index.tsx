import styled from '@emotion/styled';
import { Paths } from 'constants/paths';
import { getCourses } from 'features/courses_list/store';
import CourseCard from 'features/courses_list/components/course_card';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CoursesList: FC = () => {
    const courses = useSelector(getCourses);

    return (
        <CoursesContainer>
            {courses.map((c, i) => (
                <StyledLink to={Paths.Courses.Details(c.id)} key={c.id}>
                    <StyledCourseItem course={c} />
                </StyledLink>
            ))}
        </CoursesContainer>
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

const StyledLink = styled(Link)`
    display: contents;
`;

export default CoursesList;
