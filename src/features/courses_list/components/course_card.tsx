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
    const { name, description, date } = course;
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
                    <Typography>{description}</Typography>
                    <Typography>{`${dates[0]} - ${dates[1]}`}</Typography>
                </CardContent>
            </StyledCard>
        </div>
    );
};

const StyledCard = styled(Card)`
    &:hover {
        background-color: #e6e6e6;
    }
`;

export default CourseCard;
