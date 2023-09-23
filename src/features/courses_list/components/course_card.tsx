import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    styled,
} from '@mui/material';
import React, { FC } from 'react';
import { Course } from 'types/course';
import { formatDate } from 'utils/date-format';

type Props = {
    course: Omit<Course, 'id'>;
} & React.HTMLAttributes<HTMLDivElement>;

const CourseCard: FC<Props> = ({ course, ...props }) => {
    const { name, description, dateRange: date } = course;
    const dates = date.map((d) => formatDate(d));

    return (
        <div {...props}>
            <StyledCard>
                <CardHeader
                    title={
                        <Typography fontSize={20} fontWeight="bold">
                            {name.toUpperCase()}
                        </Typography>
                    }
                />
                <CardContent>
                    <Description>{description}</Description>
                    <Typography>{`${dates[0]} - ${dates[1]}`}</Typography>
                </CardContent>
            </StyledCard>
        </div>
    );
};

const StyledCard = styled(Card)`
    height: 100%;
    &:hover {
        background-color: #e6e6e6;
    }
`;

const Description = styled(Typography)`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4; /* number of lines to show */
    line-clamp: 4;
    -webkit-box-orient: vertical;
    margin-bottom: 20px;
`;

export default CourseCard;
