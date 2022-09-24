import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import styled from 'styled-components';
import LogoAppChat from '../assets/images/Avatar__user.png';

const StyleContainer = styled.div`
	display: grid;
	place-items: center;
	height: 100vh;
`;
const StyledImageWrapper = styled.div`
	margin-bottom: 50px;
`;
const Loading = () => {
	return (
		<StyleContainer>
			<StyledImageWrapper>
				<Image 
                src={LogoAppChat}
                height="200px"
                width="200px"
                alt=""
                />
			</StyledImageWrapper>
            <CircularProgress />
		</StyleContainer>
	);
};

export default Loading;
