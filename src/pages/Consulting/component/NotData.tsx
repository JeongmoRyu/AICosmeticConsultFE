import styled from 'styled-components';

interface Props {
  paddingTop?: number;
  paddingBottom?: number;
}

const NotData = ({ paddingTop = 20, paddingBottom = 120 }: Props) => {
  return (
    <Wrap $paddingTop={paddingTop} $paddingBottom={paddingBottom}>
      <Text>조회된 내용이 없습니다.</Text>
    </Wrap>
  );
};

export default NotData;

const Wrap = styled.div<{ $paddingTop: number; $paddingBottom: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  ${({ $paddingTop, $paddingBottom }) => `padding: ${$paddingTop}px 50px ${$paddingBottom}px;`}
  box-sizing: border-box;
`;
const Text = styled.p`
  min-width: 100px;
  padding-top: 120px;
  background: url('/images/img_notdata.png') no-repeat 50% 0 / 100px;
  font-weight: 500;
`;
