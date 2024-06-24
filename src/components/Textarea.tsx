import { ChangeEvent, FocusEvent, TextareaHTMLAttributes, forwardRef } from 'react';
import styled, { StyledObject } from 'styled-components';
import { SmallLabelTitle } from './Title';

export interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  value?: string;
  label?: string;
  labelType?: 'title' | 'text';
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  etcStyle?: StyledObject;
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ id, value, label, labelType = 'text', onChange, onBlur, readOnly, etcStyle, ...args }, ref) => {
    return (
      <Wrap $etcStyle={etcStyle}>
        {label &&
          (labelType === 'title' ? (
            <SmallLabelTitle text={label} htmlFor={id} $etcStyle={{ paddingBottom: 10 }} />
          ) : (
            <LabelText htmlFor={id}>{label}</LabelText>
          ))}
        <TextField
          ref={ref}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          readOnly={readOnly}
          defaultValue={value}
          {...args}
        />
      </Wrap>
    );
  },
);

export default Textarea;

const Wrap = styled.div<{ $etcStyle?: StyledObject }>`
  & + & {
    margin-top: 30px;
  }
  ${({ $etcStyle }) => $etcStyle && $etcStyle}
`;
const LabelText = styled.label`
  display: block;
  padding-bottom: 10px;
  font-weight: 500;
`;
const TextField = styled.textarea`
  width: 100%;
  max-width: 100%;
  min-height: 110px;
  padding: 16px 23px;
  border: 1px solid var(--bgContent);
  border-radius: 6px;
  background-color: var(--white);
  resize: vertical;
  box-sizing: border-box;
  line-height: 1.25;
`;
