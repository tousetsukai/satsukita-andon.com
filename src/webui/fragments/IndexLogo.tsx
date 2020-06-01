import styled, { keyframes } from 'styled-components';

export const IndexLogo = () => (
  <Wrapper>
    <Img src="/logo.png" alt="行灯職人への道" />
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const animation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const Img = styled.img`
  animation-name: ${animation};
  animation-iteration-count: 1;
  animation-duration: 5s;
  animation-timing-function: linear;
`;
