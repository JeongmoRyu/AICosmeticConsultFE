import { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { SmallTitle } from './Title';
import { media } from 'assets/styles/midea';
import { InfoBoxArrayType } from 'types';

interface Props {
  data1: InfoBoxArrayType[];
  data2: InfoBoxArrayType[];
  title?: string;
  inTitle?: string;
  $firstLabelWidth?: string;
}

const InfoBox = ({ data1, data2, title, inTitle, $firstLabelWidth }: Props) => {
  return (
    <Wrap>
      {title && <SmallTitle text={title} $etcStyle={{ paddingLeft: 15 }} />}
      <ListContent $hasTitle={!!inTitle}>
        {inTitle && <InTitleText>{inTitle}</InTitleText>}
        <ListBox $labelWidth={$firstLabelWidth}>
          {data1.map((item, index) => (
            <List key={`data1_${index}`}>
              <LabelText>{item.label}</LabelText>
              {item.text}
            </List>
          ))}
        </ListBox>
        <ListBox>
          {data2.map((item, index) => (
            <List key={`data2_${index}`}>
              <LabelText>{item.label}</LabelText>
              {item.text}
            </List>
          ))}
        </ListBox>
      </ListContent>
    </Wrap>
  );
};
export default InfoBox;

const Wrap = styled.div``;
const ListContentMedia = css`
  flex-direction: column;
`;
const ListContent = styled.div<{ $hasTitle?: boolean }>`
  display: flex;
  margin-top: 15px;
  padding: 20px 10px;
  border-top: 1px solid var(--bgContent);
  border-bottom: 1px solid var(--bgContent);
  ${({ $hasTitle }) => $hasTitle && 'position: relative; padding-top: 73px;'};
  ${media.small`${ListContentMedia}`}// prettier 실행이 안되어 이런 방식으로 함
`;
const InTitleText = styled.strong`
  position: absolute;
  top: 34px;
  left: 25px;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.7px;
`;
const LabelText = styled.em`
  display: table-cell;
  width: 50%;
  padding-left: 15px;
  padding-right: 7px;
  font-weight: 400;
  color: var(--gray);
  text-align: left;
  letter-spacing: -0.5px;
`;
const ListBoxMedia = css`
  width: 50%;
`;
const ListBox = styled.ul<{ $labelWidth?: string }>`
  flex: 1;
  &:first-of-type {
    ${({ $labelWidth }) => $labelWidth && `${LabelText} {width: ${$labelWidth}}`}
    ${LabelText} {
      ${media.small`${ListBoxMedia}`}
    }
  }
`;
const List = styled.li`
  display: table;
  width: 100%;
  padding: 15px 0;
  font-weight: 500;
`;
