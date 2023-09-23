import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    styled,
    Tooltip,
} from '@mui/material';
import { isBefore } from 'date-fns';
import SortLabel from 'features/course_details/features/topics_table/components/sort_label';
import {
    getSortOrder,
    getSortedTopics,
    getSortingProperty,
    sortTopics,
} from 'features/course_details/features/topics_table/store';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CourseTopic, PassedStatus } from 'types/course_topic';
import { formatDate } from 'utils/date-format';

type Props = {
    onTopicClick: (topic: CourseTopic) => void;
};
const TODAY = new Date().setHours(0, 0, 0, 0);

const TopicsTable: FC<Props> = ({ onTopicClick }) => {
    const topics = useSelector(getSortedTopics);
    const dispatch = useDispatch();
    const order = useSelector(getSortOrder);
    const sortingProperty = useSelector(getSortingProperty);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Pick<CourseTopic, 'name' | 'dateRange'>
    ) => {
        const isAsc = sortingProperty === property && order === 'asc';
        const sortOrder = isAsc ? 'desc' : 'asc';

        dispatch(sortTopics(property, sortOrder));
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sortDirection={order}>
                            <SortLabel
                                activeSortingProperty={sortingProperty}
                                sortingProperty="name"
                                onClick={handleRequestSort}
                                order={order}
                            >
                                Topic
                            </SortLabel>
                        </TableCell>
                        <TableCell sortDirection={order}>
                            <SortLabel
                                activeSortingProperty={sortingProperty}
                                sortingProperty="dateRange"
                                onClick={handleRequestSort}
                                order={order}
                            >
                                When
                            </SortLabel>
                        </TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {topics.map((topic) => {
                        const dates = topic.dateRange.map((date) =>
                            formatDate(date)
                        );

                        const status = isBefore(TODAY, topic.dateRange[1])
                            ? PassedStatus.upcoming
                            : PassedStatus.passed;

                        return (
                            <Tooltip
                                title="Сlick on the row to show the notes"
                                key={topic.id}
                            >
                                <StyledTableRow
                                    onClick={() => onTopicClick(topic)}
                                >
                                    <TableCell>{topic.name}</TableCell>
                                    <TableCell>{`${dates[0]} - ${dates[1]}`}</TableCell>
                                    <TableCell>{topic.description}</TableCell>
                                    <TableCell>{topic.type}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={PassedStatus[status]}
                                            variant="outlined"
                                            color={
                                                status === PassedStatus.upcoming
                                                    ? 'success'
                                                    : 'error'
                                            }
                                        />
                                    </TableCell>
                                </StyledTableRow>
                            </Tooltip>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    cursor: 'pointer',
    ':hover': {
        backgroundColor: theme.palette.primary.light,
    },
}));

export default TopicsTable;
