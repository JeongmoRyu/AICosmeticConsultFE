import { InputHTMLAttributes, forwardRef } from 'react';
import styled, { StyledObject } from 'styled-components';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  value: string;
  register?: any;
  type?: string;
  isEssential?: boolean; // label 뒤에 붙여짐
  inputWidth?: string;
  isInputFullWidth?: boolean;
  label?: string;
  labelWidth?: string;
  boxStyle?: StyledObject;
}

const InputText = forwardRef<HTMLInputElement, Props>(
  (
    { id, value, register, type, isEssential, inputWidth, isInputFullWidth, label, labelWidth, boxStyle, ...args },
    ref,
  ) => {
    return (
      <Wrap $inputFullWidth={isInputFullWidth} $boxStyle={boxStyle}>
        {label && (
          <LabelText htmlFor={id} $labelWidth={labelWidth}>
            {label}
            {isEssential && <Essential>필수</Essential>}
          </LabelText>
        )}
        <InputBox
          ref={ref}
          type={type || 'text'}
          id={id}
          defaultValue={value}
          $inputWidth={inputWidth}
          $inputFullWidth={isInputFullWidth}
          {...args}
        />
      </Wrap>
    );
  },
);
export default InputText;

const Wrap = styled.span<{ $inputFullWidth?: boolean; $boxStyle?: StyledObject }>`
  ${({ $inputFullWidth }) => $inputFullWidth && 'display: flex; align-items: center;'}
  ${({ $boxStyle }) => $boxStyle && $boxStyle}
`;
const LabelText = styled.label<{ $labelWidth?: string }>`
  display: inline-block;
  padding: 2px 20px 2px 5px;
  font-weight: 500;
  ${({ $labelWidth }) => $labelWidth && `width: ${$labelWidth}`}
`;
const Essential = styled.em`
  &:before {
    content: '*';
    font-size: 16px;
    font-weight: 500;
    color: var(--error);
  }
  font-size: 0;
`;
const InputBox = styled.input<{ $inputWidth?: string; $inputFullWidth?: boolean }>`
  width: ${({ $inputWidth }) => ($inputWidth ? `${$inputWidth};` : '130px')};
  height: 35px;
  padding: 2px 12px;
  border: 1px solid var(--bgContent);
  border-radius: 6px;
  background-color: var(--white);
  font-weight: 500;
  line-height: 35px;
  box-sizing: border-box;
  ${({ $inputFullWidth }) => $inputFullWidth && 'flex: 1'}
`;
