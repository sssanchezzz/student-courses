import styled from '@emotion/styled';
import { TextareaAutosize, Button } from '@mui/material';
import {
    createNote,
    getIsCreatingNote,
    getNoteValue,
    updateNote,
} from 'features/course_details/features/notes_drawer/features/notes_input/store';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const NotesInput: FC = () => {
    const dispatch = useDispatch();
    const noteText = useSelector(getNoteValue);
    const isLoading = useSelector(getIsCreatingNote);

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
                minRows={2}
                maxRows={2}
                placeholder="Add notes..."
                value={noteText}
                onChange={handleTextAreaChange}
            />
            <AddButton
                variant="outlined"
                onClick={handleAddNoteClick}
                disabled={noteText.trim() === '' || isLoading}
            >
                Add
            </AddButton>
        </TextAreaContainer>
    );
};

const StyledTextarea = styled(TextareaAutosize)`
    font-family: Roboto;
    font-weight: 400;
    padding: 5px;
    width: 100%;
    resize: none;
`;

const TextAreaContainer = styled.div`
    position: fixed;
    bottom: 0;
    width: 40vw;
    min-width: 400px;
    display: flex;
    padding: 15px;
    background-color: white;
`;

const AddButton = styled(Button)`
    white-space: nowrap;
    margin: 0 0 0 15px;
`;

export default NotesInput;
