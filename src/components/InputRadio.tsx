import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  rightChildren?: JSX.Element;
  disabled?: boolean;
  checked?: boolean;
  onClick?: () => void;
}

const InputRadio = ({ id, name, rightChildren, disabled, checked, onClick }: Props) => {
  return (
    <>
      <Radio id={id} name={name} disabled={disabled} defaultChecked={checked} onClick={onClick} />
      {rightChildren && rightChildren}
    </>
  );
};

export default InputRadio;

const Radio = styled.input.attrs({ type: 'radio' })`
  position: relative;
  width: 20px;
  height: 20px;
  appearance: none;
  border: 1px solid var(--bgContent);
  background-color: var(--white);
  border-radius: 50%;
  cursor: pointer;
  &:checked {
    border-color: var(--primary);
    &:after {
      content: '선택';
      position: absolute;
      top: 4px;
      left: 4px;
      width: 10px;
      height: 10px;
      background-color: var(--primary);
      border-radius: 50%;
      font-size: 0;
      line-height: 0;
      text-indent: 100%;
    }
  }
`;
