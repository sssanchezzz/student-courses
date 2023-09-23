import styled from '@emotion/styled';
import { TextareaAutosize, Button, styled as styledMUI } from '@mui/material';
import {
    createNote,
    getNoteValue,
    updateNote,
} from 'features/course_details/features/notes_drawer/notes_input/store';
import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const NotesInput: FC = () => {
    const dispatch = useDispatch();
    const noteText = useSelector(getNoteValue);

    const handleTextAreaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        dispatch(updateNote(e.target.value));
    };

    const handleAddNoteClick = () => {
        dispatch(createNote());
    };

    return (
        <TextAreaContainer>
            <StyledTextarea
                aria-label="minimum height"
                minRows={3}
                maxRows={3}
                placeholder="Add notes..."
                value={noteText}
                onChange={handleTextAreaChange}
            />
            <AddButton variant="outlined" onClick={handleAddNoteClick}>
                Add
            </AddButton>
        </TextAreaContainer>
    );
};

const StyledTextarea = styledMUI(TextareaAutosize)(
    ({ theme }) => `
    font-family: Roboto;
    font-weight: 400;
    padding: 5px;
    width: 100%;
    resize: none;
  `
);

const TextAreaContainer = styled.div`
    position: fixed;
    bottom: 0;
    width: 40vw;
    min-width: 400px;
    display: flex;
    padding: 15px;
`;

const AddButton = styled(Button)`
    white-space: nowrap;
    margin: 0 0 0 15px;
`;

export default NotesInput;
