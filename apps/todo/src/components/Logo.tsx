import { styled } from '@stitches/react';
import DoItLogo from '../assets/images/logo.png';

const StyledLogo = styled('img', {
  width: '92px',
  alignSelf: 'center',
  paddingTop: '24px',
});

const Logo = () => {
  return <StyledLogo src={DoItLogo} alt="logo" />;
};

export default Logo;
