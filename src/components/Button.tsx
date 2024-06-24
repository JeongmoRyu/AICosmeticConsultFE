import { MouseEvent, ButtonHTMLAttributes, forwardRef } from 'react';
import styled from 'styled-components';

type buttonStyleType = 'mySkin' | 'white';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  width?: string;
  height?: string;
  styleType?: buttonStyleType; // default: 파랑버튼 , mySkin: 분홍버튼, white: 흰색버튼
  leftChildren?: JSX.Element;
  rightChildren?: JSX.Element;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { buttonText, type, width, height, styleType, leftChildren, rightChildren, disabled, onClick } = props;

  return (
    <Btn
      type={type || 'button'}
      disabled={!!disabled}
      onClick={onClick}
      ref={ref}
      $styleType={styleType}
      $width={width}
      $height={height}
    >
      {leftChildren && leftChildren}
      {buttonText}
      {rightChildren && rightChildren}
    </Btn>
  );
});

export default Button;

const Btn = styled.button<{ $styleType?: buttonStyleType; $width?: string; $height?: string }>`
  ${({ $width }) => ($width ? `width: ${$width};` : 'min-width: 75px')};
  ${({ $height }) => ($height ? `height: ${$height};` : 'min-height: 30px')};
  padding: 5px 15px;
  background-color: ${({ $styleType }) =>
    $styleType === 'mySkin' ? 'var(--primary2)' : $styleType === 'white' ? 'var(--white)' : 'var(--primary)'};
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: ${({ $styleType }) => ($styleType === 'mySkin' || $styleType === 'white' ? 'var(--black)' : 'var(--white)')};
  letter-spacing: -0.5px;
  word-break: keep-all;
  &:hover {
    text-decoration: underline;
  }
  ${({ $styleType }) => $styleType === 'white' && 'border: 1px solid var(--bgContent)'};
  & + button {
    margin-left: 5px;
  }
`;
