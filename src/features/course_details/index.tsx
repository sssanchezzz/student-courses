import styled from '@emotion/styled';
import { Typography, Toolbar, IconButton, TextField } from '@mui/material';
import NotesDrawer from 'features/course_details/features/notes_drawer';
import { toggleDrawer } from 'features/course_details/features/notes_drawer/store';
import { getCourse } from 'features/course_details/store';
import TopicsTable from 'features/course_details/features/topics_table';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CourseTopic } from 'types/course_topic';
import ClearIcon from '@mui/icons-material/Clear';
import {
    filterTopics,
    getFilterQuery,
} from 'features/course_details/features/topics_table/store';
import { formatDate } from 'utils/date-format';

const title = 'Course Topics';

const CourseDetails: FC = () => {
    const course = useSelector(getCourse);
    const dispatch = useDispatch();

    const filterQuery = useSelector(getFilterQuery);

    const handleTopicClick = (topic: CourseTopic) => {
        dispatch(toggleDrawer(topic));
    };

    const handleFilterInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(filterTopics(e.target.value));
    };

    const handleClearFilterInputClick = () => {
        dispatch(filterTopics(''));
    };

    if (!course) return null;

    const dates = course.dateRange.map((d) => formatDate(d));

    return (
        <>
            <TextContainer>
                <Typography variant="h3" fontWeight="500">
                    {course.name.toUpperCase()}
                </Typography>
            </TextContainer>
            <DescriptionContainer>
                <Typography>{course.description}</Typography>
                <Typography>
                    The course runs from {dates[0]} to {dates[1]}
                </Typography>
            </DescriptionContainer>

            <Toolbar disableGutters>
                <ToolbarItemsContainer>
                    <Typography variant="h5">{title.toUpperCase()}</Typography>
                    <FilterContainer>
                        <TextField
                            variant="standard"
                            placeholder="Find topic by name..."
                            onChange={handleFilterInputChange}
                            value={filterQuery}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={handleClearFilterInputClick}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                ),
                            }}
                        />
                    </FilterContainer>
                </ToolbarItemsContainer>
            </Toolbar>
            <TopicsTable onTopicClick={handleTopicClick} />
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

const FilterContainer = styled.div``;

export default CourseDetails;
