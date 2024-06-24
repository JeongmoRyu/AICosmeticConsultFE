import styled, { StyledObject, css } from 'styled-components';

interface Props {
  text: string;
  $etcStyle?: StyledObject;
}
interface LabelProps extends Props {
  htmlFor: string;
}

// h3
export const Title = ({ text }: Props) => {
  return <TitleH3>{text}</TitleH3>;
};

// h4
export const SmallTitle = ({ text, ...$etcStyle }: Props) => {
  return <SmallTitleH4 {...$etcStyle}>{text}</SmallTitleH4>;
};

// h4 + label
export const SmallLabelTitle = ({ text, htmlFor, ...$etcStyle }: LabelProps) => {
  return (
    <SmallTitleH4 {...$etcStyle}>
      <label htmlFor={htmlFor}>{text}</label>
    </SmallTitleH4>
  );
};

// 접근성을 위한 헤딩태그 (화면에서는 나타나지 않음)
export const HideSmallTitle = ({ text }: Props) => {
  return <HideSmallTitleH4>{text}</HideSmallTitleH4>;
};

const TitleStyle = css`
  font-weight: 700;
  letter-spacing: -0.7px;
`;

const TitleH3 = styled.h3`
  padding: 0 10px 20px;
  border-bottom: 1px solid var(--gray);
  font-size: 24px;
  ${TitleStyle}
`;
const SmallTitleH4 = styled.h4<{ $etcStyle?: StyledObject }>`
  font-size: 20px;
  ${TitleStyle}
  ${({ $etcStyle }) => $etcStyle && $etcStyle};
`;
const HideSmallTitleH4 = styled.h4`
  overflow: hidden;
  font-size: 0;
  line-height: 0;
  text-indent: 100%;
`;
