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
import React, { FC } from 'react';
import { CourseTopic, PassedStatus } from 'types/course_topic';
import { formatDate } from 'utils/date-format';

type Props = {
    topics: CourseTopic[];
};

const TopicsTable: FC<Props> = ({ topics }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel>Topic</TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel>When</TableSortLabel>
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
                        return (
                            <TableRow key={topic.id}>
                                <TableCell>{topic.name}</TableCell>
                                <TableCell>{`${dates[0]} - ${dates[1]}`}</TableCell>
                                <TableCell>{topic.description}</TableCell>
                                <TableCell>{topic.type}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={PassedStatus[topic.status]}
                                        variant="outlined"
                                        color={
                                            topic.status ===
                                            PassedStatus.upcoming
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
