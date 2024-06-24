import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useStore from 'store/useStore';
import { usePostLogin } from 'api/UserQueries';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const SCHEMA = yup
  .object({
    managerId: yup.string().required('아이디를 입력해주세요.'),
    Pwd: yup.string().required('비밀번호를 입력해주세요.'),
  })
  .required();

const PopupLogin = ({ isVisible, onClose }: Props) => {
  const [textError, setTextError] = useState<string | null>(null);
  const { isLoading, hideLoading, setManagerInfo } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(SCHEMA),
  });

  useEffect(() => {
    isVisible && isLoading && hideLoading(); // isLoading 켜진 상태에서 로그인 화면 나오면 계속 돌고 있음
  }, [hideLoading, isLoading, isVisible]);

  const mutation = usePostLogin();

  if (!isVisible) {
    return null;
  }

  const onSubmit = (data: { managerId: string; Pwd: string }) => {
    setTextError(null);
    const params = { manager_id: data.managerId, pwd: data.Pwd };
    mutation.mutate(params, {
      onError: () => setTextError('아이디 또는 비밀번호를 잘못 입력했습니다.'),
      onSuccess: (result) => {
        if (result) {
          setManagerInfo({ id: data.managerId, token: result.token });
          onClose();
          reset();
        }
      },
    });
  };

  return (
    <Wrap>
      <LoginBox>
        <LoginInner>
          <Title>Log in to your Account</Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <LoginInputBox>
              <Label htmlFor='managerId'>ID</Label>
              <Input {...register('managerId')} id='managerId' type='text' />
              <Label htmlFor='Pwd'>Password</Label>
              <Input {...register('Pwd')} id='Pwd' type='password' />
              <TextError>{errors.managerId?.message || errors.Pwd?.message || textError}</TextError>
              <ButtonLogin type='submit'>Login</ButtonLogin>
            </LoginInputBox>
          </form>
        </LoginInner>
      </LoginBox>
    </Wrap>
  );
};
export default PopupLogin;

const Wrap = styled.div`
  z-index: 10;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px);
`;
const LoginBox = styled.div`
  overflow: hidden;
  position: relative;
  width: 90%;
  max-width: 1100px;
  height: 80%;
  max-height: 600px;
  background-color: var(--white);
  border-radius: 4px;
  border-radius: 20px;
  box-sizing: border-box;
  text-align: center;
  &:before {
    content: '';
    float: left;
    width: 45.5%;
    height: 100%;
    background: url('/images/bg_login.png') no-repeat 50% / cover;
  }
`;
const LoginInner = styled.div`
  overflow: auto;
  float: left;
  width: 54.5%;
  height: 100%;
  padding: 5% 4%;
  box-sizing: border-box;
`;
const Title = styled.h1`
  margin-bottom: 56px;
  padding-top: 82px;
  background: url('/images/img_heart.png') no-repeat 50% 0 / auto 50px;
  font-size: 30px;
  font-weight: 700;
  color: var(--primary);
`;
const Label = styled.label`
  display: block;
  margin-top: 20px;
  padding-bottom: 6px;
  font-size: 15px;
  font-weight: 500;
`;
const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 5px 15px;
  border: 1px solid var(--bgContent);
  border-radius: 10px;
  background-color: var(--white);
  font-weight: 500;
  line-height: 40px;
  box-sizing: border-box;
`;
const ButtonLogin = styled.button.attrs({ type: 'submit' })`
  width: 100%;
  height: 50px;
  background-color: var(--primary);
  border-radius: 10px;
  font-size: 20px;
  font-weight: 700;
  color: var(--white);
  &:hover {
    text-decoration: underline;
  }
`;
const LoginInputBox = styled.div`
  max-width: 350px;
  margin: 0 auto;
  text-align: left;
`;
const TextError = styled.p`
  height: 44px;
  padding-top: 15px;
  color: var(--error);
  box-sizing: border-box;
`;
const BtnClose = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 8px;
  line-height: 0;
  img {
    width: 30px;
  }
`;
