import { styled } from '@stitches/react';
import Button from '../components/Button';
import Input from '../components/Input';
import Logo from '../components/Logo';

const Container = styled('div', {
  padding: '0 56px',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  justifyContent: 'space-between',
});

const Wrapper = styled('p', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const Text = styled('p', {
  color: '#D9D9D9',
  alignSelf: 'center',
});

const SignIn = () => {
  return (
    <Container>
      <Logo />
      <Wrapper>
        <Input label="username" />
        <Input label="password" />
        <Button>sign in</Button>
      </Wrapper>

      <Text>
        Don’t have an account?
        <span> Sign Up</span>
      </Text>
    </Container>
  );
};

export default SignIn;
