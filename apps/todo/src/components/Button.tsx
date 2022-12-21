import { styled } from '@stitches/react';
import { PropsWithChildren } from 'react';

const StyledButton = styled('button', {
  backgroundColor: '#E9D540',
  borderRadius: '8px',
  color: '#2F3740',
  padding: '8px 46px',
  border: 'none',
  fontSize: '24px',
  fontWeight: 'light',
  fontFamily: 'Montserrat',
  alignSelf: 'center',
  marginTop: '24px',
});

const Button: React.FC<PropsWithChildren> = ({ children }) => {
  return <StyledButton>{children}</StyledButton>;
};

export default Button;
