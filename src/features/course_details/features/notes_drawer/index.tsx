import { Divider, Drawer, Typography } from '@mui/material';
import {
    getIsDrawerOpen,
    getSelectedTopic,
    toggleDrawer,
} from 'features/course_details/features/notes_drawer/store';

import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import NotesList from 'features/course_details/features/notes_drawer/notes_list';
import {
    fetchNotes,
    getNotesLoading,
} from 'features/course_details/features/notes_drawer/notes_list/store';
import NotesInput from 'features/course_details/features/notes_drawer/notes_input';
import { getIsCreatingNote } from 'features/course_details/features/notes_drawer/notes_input/store';
import Loader from 'components/loader';

const NotesDrawer: FC = () => {
    const dispatch = useDispatch();
    const isDrawerOpen = useSelector(getIsDrawerOpen);
    const selectedTopic = useSelector(getSelectedTopic);
    const areNotesLoading = useSelector(getNotesLoading);
    const isCreatingNotes = useSelector(getIsCreatingNote);

    const isLoading = areNotesLoading || isCreatingNotes;
    useEffect(() => {
        if (selectedTopic) {
            dispatch(fetchNotes(selectedTopic.id));
        }
    }, [selectedTopic]);

    const handleDrawerClose = () => {
        dispatch(toggleDrawer(null));
    };

    return (
        <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
            <DrawerContent>
                <TitleContainer>
                    <Typography variant="h5">{selectedTopic?.name}</Typography>
                    <Title variant="h6" fontWeight={400}>
                        NOTES
                    </Title>
                    <Divider />
                </TitleContainer>
                {!areNotesLoading && <NotesList />}

                <NotesInput />
            </DrawerContent>
            {isLoading && <Loader />}
        </Drawer>
    );
};

const DrawerContent = styled.div`
    width: 40vw;
    min-width: 400px;
    text-align: center;
    margin-bottom: 74px;
`;

const Title = styled(Typography)`
    margin: 15px 0;
`;

const TitleContainer = styled.div`
    position: sticky;
    top: 0;
    padding: 15px 0 0 0;
    background-color: white;
    z-index: 1;
`;

export default NotesDrawer;
