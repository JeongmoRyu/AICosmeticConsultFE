import styled from 'styled-components';
import Images from 'assets/styles/Images';

interface Props {
  activeIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination = ({ activeIndex, total, onPrev, onNext }: Props) => {
  return (
    <Wrap>
      <PrevButton onClick={onPrev} disabled={activeIndex === 1}>
        <span>이전</span>
      </PrevButton>
      <ActivePage>{activeIndex}</ActivePage>/ {total}
      <NextButton onClick={onNext} disabled={activeIndex === total}>
        <span>다음</span>
      </NextButton>
    </Wrap>
  );
};
export default Pagination;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  color: var(--gray);
`;
const ArrowButton = styled.button.attrs({ type: 'button' })`
  overflow: hidden;
  width: 24px;
  height: 24px;
  border: 1px solid var(--white);
  border-radius: 5px;
  background-color: var(--white);
  transition: all 0.3s;
  span {
    display: block;
    height: 100%;
    mask: url(${Images.iconArrow}) no-repeat 50% / 8px 14px;
    background-color: var(--black);
    font-size: 0;
    line-height: 0;
    text-indent: 100%;
  }
  &:not(:disabled)&:hover {
    background-color: var(--primary1-light);
    border-color: var(--bgContent);
  }
  &:disabled {
    cursor: default;
    span {
      background-color: var(--gray);
    }
  }
`;
const PrevButton = styled(ArrowButton)`
  margin-right: 20px;
  transform: rotateY(180deg);
`;
const NextButton = styled(ArrowButton)`
  margin-left: 20px;
`;
const ActivePage = styled.em`
  min-width: 18px;
  margin-right: 4px;
  color: var(--black);
  text-align: center;
`;
