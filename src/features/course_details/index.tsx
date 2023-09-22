import styled from '@emotion/styled';
import { FilterList } from '@mui/icons-material';
import { Typography, Toolbar, IconButton, Divider } from '@mui/material';
import NotesDrawer from 'features/course_details/features/notes_drawer';
import { toggleDrawer } from 'features/course_details/features/notes_drawer/store';
import { getCourse } from 'features/course_details/store';
import TopicsTable from 'features/course_details/features/topics_table';

import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CourseTopic } from 'types/course_topic';
const title = 'Course Topics';

const CourseDetails: FC = () => {
    const course = useSelector(getCourse);
    const dispatch = useDispatch();

    const handleTopicClick = (topic: CourseTopic) => {
        dispatch(toggleDrawer(topic));
    };

    if (!course) return null;

    return (
        <>
            <TextContainer>
                <Typography variant="h3" fontWeight="500">
                    {course.name.toUpperCase()}
                </Typography>
            </TextContainer>
            <DescriptionContainer>
                <Typography>{course.description}</Typography>
            </DescriptionContainer>
            <Divider />
            <Toolbar disableGutters>
                <ToolbarItemsContainer>
                    <Typography variant="h5">{title.toUpperCase()}</Typography>
                    <IconButton>
                        <FilterList />
                    </IconButton>
                </ToolbarItemsContainer>
            </Toolbar>
            <TopicsTable
                topics={course.topics}
                onTopicClick={handleTopicClick}
            />
            <NotesDrawer />
        </>
    );
};

const ToolbarItemsContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

const TextContainer = styled.div`
    padding: 10px 0;
`;

const DescriptionContainer = styled.div`
    padding: 0 0 20px 0;
    color: #515151;
`;

export default CourseDetails;
