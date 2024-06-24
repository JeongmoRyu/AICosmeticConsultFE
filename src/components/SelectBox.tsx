import styled from 'styled-components';
import Images from 'assets/styles/Images';
import { ChangeEvent, useCallback, useState } from 'react';

export interface selectItemType {
  id: string;
  name: string;
  text: string;
}

interface Props {
  selectList: selectItemType[];
  activeId: string;
  handleChange: (id: string) => void;
  labelText?: string;
  minWidth?: number;
}

const SelectBox = ({ selectList, activeId, labelText, handleChange, minWidth }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeText = selectList.find((item) => item.id === activeId)?.text;

  const onOpen = () => setIsOpen(!isOpen);

  const onChange = (id: string) => {
    setIsOpen(false);
    handleChange(id);
  };

  return (
    <Wrap>
      {labelText && <LabelText onClick={onOpen}>{labelText}</LabelText>}

      <SelectWrap $minWidth={minWidth}>
        <SelectButton $isOpen={isOpen} onClick={onOpen}>
          {activeText}
          <Icon>{isOpen ? '닫힘' : '열림'}</Icon>
        </SelectButton>
        {isOpen && (
          <SelectListBox>
            {selectList.map((item) => (
              <SelectList key={item.id}>
                <input type='radio' id={item.id} name={item.name} onChange={() => onChange(item.id)} />
                <label htmlFor={item.id}>{item.text}</label>
              </SelectList>
            ))}
          </SelectListBox>
        )}
      </SelectWrap>
    </Wrap>
  );
};

export default SelectBox;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & + & {
    margin-left: 10px;
  }
`;
const LabelText = styled.span`
  padding-right: 20px;
  font-weight: 500;
  cursor: pointer;
`;
const SelectWrap = styled.div<{ $minWidth?: number }>`
  position: relative;
  width: ${({ $minWidth }) => ($minWidth ? `${$minWidth}px` : 'fit-content')};
  height: 35px;
`;
const Icon = styled.span`
  position: absolute;
  right: 15px;
  top: 11px;
  width: 8px;
  height: 14px;
  background: url(${Images.iconArrow}) no-repeat 0 0 / 100%;
  transform: rotate(90deg);
  font-size: 0;
  line-height: 0;
  text-indent: 100%;
  transition: transform 0.3s;
`;
const SelectButton = styled.button.attrs({ type: 'button' })<{ $isOpen: boolean }>`
  overflow: hidden;
  display: block;
  font-weight: 500;
  padding: 8px 52px 8px 15px;
  border: 1px solid var(--bgContent);
  background-color: var(--white);
  border-radius: 6px;
  ${({ $isOpen }) => $isOpen && 'border-bottom-left-radius: 0; border-bottom-right-radius: 0;'}
  ${Icon} {
    ${({ $isOpen }) => $isOpen && 'transform: rotate(270deg)'}
  }
`;
const SelectListBox = styled.ul`
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  left: 0;
  right: 0;
  max-height: 223px;
  border: 1px solid var(--bgContent);
  border-top: 0;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: var(--white);
  &::-webkit-scrollbar {
    position: absolute;
    right: 0;
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(17, 17, 17, 0.2);
  }
`;
const SelectList = styled.li`
  overflow: hidden;
  font-weight: 500;
  text-align: left;
  &:first-child label {
    border-top: 0;
  }
  input {
    z-index: -1;
    position: absolute;
  }
  label {
    display: block;
    padding: 8px 15px;
    border-top: 1px solid var(--bgContent);
    background-color: var(--white);
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      background-color: var(--primary1-light);
    }
  }
`;
