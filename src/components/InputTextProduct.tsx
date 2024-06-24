import { ChangeEvent, FocusEvent, InputHTMLAttributes, forwardRef } from 'react';
import styled from 'styled-components';
import Images from 'assets/styles/Images';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDeleteChange: (id: string) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  placeholder?: string;
  title?: string;
  marginTop?: number;
}

const InputTextProduct = forwardRef<HTMLInputElement, Props>(
  ({ id, value, onChange, onDeleteChange, onBlur, readOnly, placeholder, title, marginTop, ...args }, ref) => {
    return (
      <Wrap $marginTop={marginTop}>
        <InputBox
          ref={ref}
          id={id}
          defaultValue={value}
          onChange={onChange}
          onBlur={onBlur}
          readOnly={readOnly}
          placeholder={placeholder}
          title={title}
          {...args}
        />
        {!readOnly && <ButtonDelete onClick={() => onDeleteChange(id)}>삭제</ButtonDelete>}
      </Wrap>
    );
  },
);
export default InputTextProduct;

const Wrap = styled.div<{ $marginTop?: number }>`
  overflow: hidden;
  position: relative;
  border: 1px solid var(--bgContent);
  border-radius: 6px;
  background-color: var(--white);
  ${({ $marginTop }) => $marginTop && `margin-top: ${$marginTop}px;`}
`;
const InputBox = styled.input.attrs({ type: 'text' })`
  width: calc(100% - 48px);
  height: 100%;
  height: 48px;
  padding: 2px 23px;
  border-radius: 6px;
  border: 0;
  font-weight: 500;
  line-height: 48px;
  box-sizing: border-box;
  &:read-only {
    width: 100%;
  }
  &::placeholder {
    color: var(--gray);
  }
`;
const ButtonDelete = styled.button.attrs({ type: 'button' })`
  width: 48px;
  height: 48px;
  background: url(${Images.iconClose}) no-repeat 50% / 20px;
  font-size: 0;
  line-height: 0;
  text-indent: 100%;
  border-left: 1px solid var(--bgContent);
`;
