import { ChangeEvent } from 'react';
import styled, { StyledObject } from 'styled-components';

interface Props {
  id: string;
  name: string;
  value: string;
  label: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isChecked?: boolean;
  disabled?: boolean;
  etcStyle?: StyledObject;
}

const InputCheckboxButton = ({ id, name, value, label, onChange, isChecked, disabled, etcStyle }: Props) => {
  return (
    <Wrap $etcStyle={etcStyle}>
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
export default InputCheckboxButton;

const Wrap = styled.span<{ $etcStyle?: StyledObject }>`
  position: relative;
  margin: 2px 5px;
  ${({ $etcStyle }) => $etcStyle && $etcStyle};
`;
const InputRadio = styled.input.attrs({ type: 'checkbox' })`
  z-index: -1;
  position: absolute;
  width: 0;
  height: 0;
`;
const Label = styled.label`
  display: inline-block;
  height: 40px;
  padding: 0 15px;
  border: 1px solid var(--bgContent);
  border-radius: 20px;
  background-color: var(--white);
  font-weight: 500;
  line-height: 40px;
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
