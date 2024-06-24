import styled from 'styled-components';

interface Props {
  isVisible: boolean;
}

const Loading = ({ isVisible }: Props) => {
  if (!isVisible) {
    return null;
  }
  return (
    <Wrap>
      <Spinner />
    </Wrap>
  );
};
export default Loading;

const Wrap = styled.div`
  z-index: 10;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 80px;
  height: 80px;
  margin: auto;
  padding: 25px;
  border: 1px solid var(--bgContent);
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
`;
const Spinner = styled.div`
  width: 100%;
  height: 100%;
  border: 15px solid var(--primary1-light);
  border-top: 15px solid var(--primary);
  border-radius: 50%;
  box-sizing: border-box;
  animation: spin 2s cubic-bezier(0.66, -0.28, 0.45, 1.04) infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
