import { ChangeEvent, FocusEvent, TextareaHTMLAttributes, useRef } from 'react';
import styled from 'styled-components';
import useTextareaAutoHeight from 'hooks/useTextareaAutoHeight';

export interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
}

const TextareaAutoHeightBox = ({ id, label, value, onChange, onBlur, readOnly, ...args }: Props) => {
  const TextareaRef = useRef<HTMLTextAreaElement>(null);
  useTextareaAutoHeight(TextareaRef);

  return (
    <Wrap>
      <Inner>
        <LabelText htmlFor={id}>{label}</LabelText>
        <TextField
          ref={TextareaRef}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          readOnly={readOnly}
          defaultValue={value}
          {...args}
        />
      </Inner>
    </Wrap>
  );
};
export default TextareaAutoHeightBox;

const Wrap = styled.div`
  border-left: 5px solid var(--primary);
  & + & {
    margin-top: 10px;
  }
`;
const Inner = styled.div`
  padding: 15px 20px 15px 23px;
  border: 1px solid var(--bgContent);
  border-left: 0;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;
const LabelText = styled.label`
  display: block;
  padding-bottom: 10px;
  font-size: 14px;
  color: var(--primary);
`;
const TextField = styled.textarea.attrs({ placeholder: '내용을 입력해 주세요.' })`
  width: 100%;
  padding: 0;
  border: 0;
  font-weight: 500;
  line-height: 19px;
  resize: none;
  outline: none;
  &::placeholder {
    color: var(--gray);
  }
`;
