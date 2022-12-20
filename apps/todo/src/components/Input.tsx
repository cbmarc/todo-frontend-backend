import { styled } from '@stitches/react';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '24px',
});

const StyledLabel = styled('label', {
  color: '#D9D9D9',
  marginBottom: '4px',
});

const StyledInput = styled('input', {
  height: '46px',
  backgroundColor: '#D9D9D9',
});

const Input = ({ label }: { label: string }) => {
  return (
    <Container>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput type="text" />
    </Container>
  );
};

export default Input;
