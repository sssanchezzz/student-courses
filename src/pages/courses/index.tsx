import styled from '@emotion/styled';
import { MOCK_DATA } from 'mock';
import CourseCard from 'pages/courses/components/course_card';
import React, { FC } from 'react';

const CoursesPage: FC = () => {
    const handleCourseItemClick = (courseItemId: string) => {
        console.log('click course item', courseItemId);
    };

    return (
        <CoursesContainer>
            {MOCK_DATA.map((c, i) => (
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
`;

export default CoursesPage;
