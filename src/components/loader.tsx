import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';
import { FC } from 'react';

const Loader: FC = () => {
    return (
        <LoaderContainer>
            <CircularProgress />
        </LoaderContainer>
    );
};

const LoaderContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export default Loader;
