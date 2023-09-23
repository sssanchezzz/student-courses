import { Divider, Drawer, LinearProgress, Typography } from '@mui/material';
import {
    getIsDrawerOpen,
    getSelectedTopic,
    toggleDrawer,
} from 'features/course_details/features/notes_drawer/store';

import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import NotesList from 'features/course_details/features/notes_drawer/notes_list';
import {
    fetchNotes,
    getNotesLoading,
} from 'features/course_details/features/notes_drawer/notes_list/store';
import NotesInput from 'features/course_details/features/notes_drawer/notes_input';

const NotesDrawer: FC = () => {
    const dispatch = useDispatch();
    const isDrawerOpen = useSelector(getIsDrawerOpen);
    const selectedTopic = useSelector(getSelectedTopic);
    const isLoading = useSelector(getNotesLoading);

    useEffect(() => {
        if (selectedTopic) {
            dispatch(fetchNotes(selectedTopic.id));
        }
    }, [selectedTopic]);

    const handleDrawerClose = () => {
        dispatch(toggleDrawer(null));
    };

    return (
        <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={handleDrawerClose}
            // PaperProps={{ style: { height: '100vh' } }}
        >
            {isLoading && <LinearProgress />}
            <DrawerContent>
                <Title variant="h5">{selectedTopic?.name}</Title>
                <Title variant="h6" fontWeight={400}>
                    NOTES
                </Title>
                <Divider />
                <NotesList />
                <NotesInput />
            </DrawerContent>
        </Drawer>
    );
};

const DrawerContent = styled.div`
    width: 40vw;
    min-width: 400px;
    text-align: center;
`;

const Title = styled(Typography)`
    margin: 15px 0;
`;

export default NotesDrawer;
