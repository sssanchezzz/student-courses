import {
    Divider,
    List,
    ListItem,
    ListItemText,
    styled as styledMUI,
} from '@mui/material';
import { getNotes } from 'features/course_details/features/notes_drawer/features/notes_list/store';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

const NotesList: FC = () => {
    const notes = useSelector(getNotes);

    return (
        <List>
            {notes.map((note, i) => (
                <React.Fragment key={i}>
                    <StyledListItem>
                        <ListItemText primary={note.noteText} />
                    </StyledListItem>
                    <Divider />
                </React.Fragment>
            ))}
        </List>
    );
};

const StyledListItem = styledMUI(ListItem)(({ theme }) => ({
    color: theme.palette.grey[600],
    padding: 15,
}));

export default NotesList;
