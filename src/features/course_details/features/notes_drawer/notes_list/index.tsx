import {
    Button,
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography,
    styled as styledMUI,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes } from 'features/course_details/features/notes_drawer/notes_list/store';
import styled from '@emotion/styled';

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
}));

export default NotesList;
