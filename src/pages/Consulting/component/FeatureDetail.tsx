import styled from 'styled-components';
import InputCheckboxButton from 'components/InputCheckboxButton';
import TextareaAutoHeightBox from 'components/TextareaAutoHeightBox';
import { ChangeEvent } from 'react';
import { Feature } from 'types';

interface Props {
  featureAllList: Feature[] | null;
  isModify: boolean; // 수정 여부
  isAllList: boolean; // 펼쳐보기 여부

  onCheckboxChange: (e: ChangeEvent<HTMLInputElement>, item: Feature) => void;
  onChangeListText: (e: ChangeEvent<HTMLTextAreaElement>, item: Feature) => void;
}

const FeatureDetail = ({ featureAllList, isModify, isAllList, onCheckboxChange, onChangeListText }: Props) => {
  return (
    <>
      {isModify && (
        <>
          <FeatureChoiceBox>
            <FeatureChoicTitle>특징</FeatureChoicTitle>
            <ScrollX>
              <BgLeft />
              <ScrollXInner $isAllList={isAllList}>
                {featureAllList?.map(
                  (item) =>
                    item.value < 100 && (
                      <InputCheckboxButton
                        key={`featureType_${item.value}`}
                        id={`featureType_${item.value}`}
                        name={`featureType_${item.value}`}
                        value={`featureType_${item.value}`}
                        isChecked={item.isChecked}
                        label={item.label}
                        etcStyle={{ flex: '0 0 auto' }}
                        onChange={(e) => onCheckboxChange(e, item)}
                      />
                    ),
                )}
              </ScrollXInner>
              <BgRight />
            </ScrollX>
          </FeatureChoiceBox>
          <FeatureChoiceBox>
            <FeatureChoicTitle>유전자</FeatureChoicTitle>
            <ScrollX>
              <BgLeft />
              <ScrollXInner $isAllList={isAllList}>
                {featureAllList?.map(
                  (item) =>
                    item.value > 99 &&
                    item.value < 200 && (
                      <InputCheckboxButton
                        key={`featureType_${item.value}`}
                        id={`featureType_${item.value}`}
                        name={`featureType_${item.value}`}
                        value={`featureType_${item.value}`}
                        isChecked={item.isChecked}
                        label={item.label}
                        etcStyle={{ flex: '0 0 auto' }}
                        onChange={(e) => onCheckboxChange(e, item)}
                      />
                    ),
                )}
              </ScrollXInner>
              <BgRight />
            </ScrollX>
          </FeatureChoiceBox>
          <FeatureChoiceBox $isLastItem={true}>
            <FeatureChoicTitle>제품 추천</FeatureChoicTitle>
            <ScrollX>
              <BgLeft />
              <ScrollXInner $isAllList={isAllList}>
                {featureAllList?.map(
                  (item) =>
                    item.value > 199 && (
                      <InputCheckboxButton
                        key={`featureType_${item.value}`}
                        id={`featureType_${item.value}`}
                        name={`featureType_${item.value}`}
                        value={`featureType_${item.value}`}
                        isChecked={item.isChecked}
                        label={item.label}
                        etcStyle={{ flex: '0 0 auto' }}
                        onChange={(e) => onCheckboxChange(e, item)}
                      />
                    ),
                )}
              </ScrollXInner>
              <BgRight />
            </ScrollX>
          </FeatureChoiceBox>
        </>
      )}

      {featureAllList?.map(
        (item) =>
          (item.isChecked || item.description.length > 0) && (
            <TextareaAutoHeightBox
              key={`detail_${item.value}`}
              id={`detail_${item.value}`}
              readOnly={!isModify}
              label={item.label}
              value={item.description}
              onChange={(e) => onChangeListText(e, item)}
            />
          ),
      )}
    </>
  );
};
export default FeatureDetail;

const FeatureChoiceBox = styled.div<{ $isLastItem?: boolean }>`
  display: flex;
  & + & {
    margin-top: 7px;
  }
  ${({ $isLastItem }) => $isLastItem && 'margin-bottom: 38px'}
`;
const FeatureChoicTitle = styled.em`
  width: 75px;
  padding-top: 13px;
  font-weight: 500;
`;
const ScrollX = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  padding: 0 3px 7px;
`;
const ScrollXInner = styled.div<{ $isAllList?: boolean }>`
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  padding-bottom: 2px;
  &:hover {
    overflow-x: scroll;
    margin-bottom: -7px;
  }
  &::-webkit-scrollbar {
    height: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--bgContentHover);
    border-radius: 20px;
    cursor: pointer;
    &:hover {
      background-color: var(--bgContent);
    }
  }
  &::-webkit-scrollbar-track {
    background-color: var(--white);
  }
  ${({ $isAllList }) => $isAllList && 'flex-wrap: wrap'}
`;
const Bg = styled.span`
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 7px;
  width: 8px;
`;
const BgLeft = styled(Bg)`
  left: 0;
  background: linear-gradient(-90deg, transparent, var(--white) 100%);
`;
const BgRight = styled(Bg)`
  right: 0;
  background: linear-gradient(90deg, transparent, var(--white) 100%);
`;
