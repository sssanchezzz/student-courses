import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel,
    TableBody,
    Chip,
} from '@mui/material';
import { isBefore } from 'date-fns';
import React, { FC, useState } from 'react';
import { CourseTopic, PassedStatus } from 'types/course_topic';
import { Order } from 'types/order';
import { formatDate } from 'utils/date-format';

type Props = {
    topics: CourseTopic[];
    onTopicClick: (topic: CourseTopic) => void;
};
const TODAY = new Date().setHours(0, 0, 0, 0);

const TopicsTable: FC<Props> = ({ topics, onTopicClick }) => {
    const [order, setOrder] = React.useState<Order>('asc');

    const [sortTopic, setSortTopic] =
        useState<keyof Pick<CourseTopic, 'name' | 'dateRange'>>('name');

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Pick<CourseTopic, 'name' | 'dateRange'>
    ) => {
        const isAsc = sortTopic === property && order === 'asc';

        setOrder(isAsc ? 'desc' : 'asc');
        setSortTopic(property);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sortDirection={order}>
                            <TableSortLabel
                                active={sortTopic === 'name'}
                                onClick={(e) => handleRequestSort(e, 'name')}
                                direction={
                                    sortTopic === 'name' ? order : 'desc'
                                }
                            >
                                Topic
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sortDirection={order}>
                            <TableSortLabel
                                active={sortTopic === 'dateRange'}
                                onClick={(e) =>
                                    handleRequestSort(e, 'dateRange')
                                }
                                direction={
                                    sortTopic === 'dateRange' ? order : 'desc'
                                }
                            >
                                When
                            </TableSortLabel>
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

                        const status = isBefore(
                            TODAY,
                            new Date(topic.dateRange[1])
                        )
                            ? PassedStatus.upcoming
                            : PassedStatus.passed;

                        return (
                            <TableRow
                                key={topic.id}
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
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TopicsTable;
