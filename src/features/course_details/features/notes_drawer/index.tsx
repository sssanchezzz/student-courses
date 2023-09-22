import { Drawer, Typography, styled as styledMUI } from '@mui/material';
import {
    getIsDrawerOpen,
    getSelectedTopic,
    toggleDrawer,
} from 'features/course_details/features/notes_drawer/store';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';

const NotesDrawer: FC = () => {
    const dispatch = useDispatch();
    const isDrawerOpen = useSelector(getIsDrawerOpen);
    const selectedTopic = useSelector(getSelectedTopic);

    const handleDrawerClose = () => {
        dispatch(toggleDrawer(null));
    };

    return (
        <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
            <DrawerContent>
                <Typography variant="h6">{selectedTopic?.name}</Typography>
                <Typography variant="h6">Notes</Typography>

                <StyledTextarea
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Add notes..."
                />
            </DrawerContent>
        </Drawer>
    );
};

const DrawerContent = styled.div`
    width: 40vw;
    min-width: 400px;
    text-align: center;
`;

const StyledTextarea = styledMUI(TextareaAutosize)(
    ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
  `
);

export default NotesDrawer;
