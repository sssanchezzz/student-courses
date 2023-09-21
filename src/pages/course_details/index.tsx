import styled from '@emotion/styled';
import { FilterList } from '@mui/icons-material';
import { IconButton, LinearProgress, Toolbar, Typography } from '@mui/material';
import { MOCK_DATA } from 'mock';
import TopicsTable from 'pages/course_details/components/topics_table';
import React, { FC } from 'react';

const title = 'Course Topics';

const CourseDetailsPage: FC = () => {
    const course = MOCK_DATA[1];
    const isLoading = true;

    return (
        <>
            {isLoading && <LinearProgress />}
            <PageContainer>
                <Typography variant="h3" fontWeight="500">
                    {course.name.toUpperCase()}
                </Typography>
                <Typography>{course.description}</Typography>

                <Toolbar disableGutters>
                    <ToolbaritemsContainer>
                        <Typography variant="h5">
                            {title.toUpperCase()}
                        </Typography>
                        <IconButton>
                            <FilterList />
                        </IconButton>
                    </ToolbaritemsContainer>
                </Toolbar>
                <TopicsTable topics={course.topics} />
            </PageContainer>
        </>
    );
};

const PageContainer = styled.div`
    width: 80%;
    margin: 0 auto;
`;

const ToolbaritemsContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

export default CourseDetailsPage;
