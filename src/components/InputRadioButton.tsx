import { ChangeEvent } from 'react';
import styled from 'styled-components';

interface Props {
  id: string;
  name: string;
  value: string;
  label: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isChecked?: boolean;
  disabled?: boolean;
}

const InputRadioButton = ({ id, name, value, label, onChange, isChecked, disabled }: Props) => {
  return (
    <Wrap>
      <InputRadio
        id={id}
        name={name}
        value={value}
        checked={isChecked}
        onChange={(e) => onChange && onChange(e)}
        disabled={disabled}
      />
      <Label htmlFor={id}>{label}</Label>
    </Wrap>
  );
};
export default InputRadioButton;

const Wrap = styled.span`
  position: relative;
  margin-left: 10px;
`;
const InputRadio = styled.input.attrs({ type: 'radio' })`
  z-index: -1;
  position: absolute;
  width: 0;
  height: 0;
`;
const Label = styled.label`
  display: inline-block;
  min-width: 59px;
  height: 30px;
  border: 1px solid var(--bgContent);
  border-radius: 4px;
  background-color: var(--white);
  font-size: 14px;
  font-weight: 500;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
  &:hover {
    text-decoration: underline;
  }
  ${InputRadio}:checked + & {
    background-color: var(--primary1-light);
  }
`;
