import React, { PropsWithChildren, FC } from 'react';
import { TableSortLabel } from '@mui/material';
import { TopicSortingProperty } from 'features/course_details/features/topics_table/store';
import { Order } from 'types/order';

type SortLabelProps = PropsWithChildren & {
    onClick: (
        e: React.MouseEvent<HTMLSpanElement>,
        sortingProperty: TopicSortingProperty
    ) => void;
    sortingProperty: TopicSortingProperty;
    activeSortingProperty: TopicSortingProperty;
    order: Order;
};

const SortLabel: FC<SortLabelProps> = ({
    children,
    onClick,
    sortingProperty,
    activeSortingProperty,
    order,
}) => {
    return (
        <TableSortLabel
            active={activeSortingProperty === sortingProperty}
            onClick={(e) => onClick(e, sortingProperty)}
            direction={
                activeSortingProperty === sortingProperty ? order : 'asc'
            }
        >
            {children}
        </TableSortLabel>
    );
};

export default SortLabel;
