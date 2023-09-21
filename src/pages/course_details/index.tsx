import { FilterList } from '@mui/icons-material';
import { IconButton, Toolbar, Typography } from '@mui/material';
import { MOCK_DATA } from 'mock';
import TopicsTable from 'pages/course_details/components/topics_table';
import React, { FC } from 'react';

const title = 'Course Topics';

const CourseDetailsPage: FC = () => {
    const course = MOCK_DATA[1];
    return (
        <div>
            <Typography variant="h3" fontWeight="500">
                {course.name.toUpperCase()}
            </Typography>
            <Typography>{course.description}</Typography>

            <Toolbar>
                <Typography variant="h5">{title.toUpperCase()}</Typography>
                <IconButton>
                    <FilterList />
                </IconButton>
            </Toolbar>
            <TopicsTable topics={course.topics} />
        </div>
    );
};

export default CourseDetailsPage;
