import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useStore from 'store/useStore';
import { HOME } from 'data/routers';
import Images from 'assets/styles/Images';
import PopupLogin from 'components/PopupLogin';

const Header = () => {
  const { managerInfo, setManagerInfo } = useStore();
  const [isVisibleLogin, setIsVisibleLogin] = useState(!managerInfo);

  useEffect(() => {
    !managerInfo && setIsVisibleLogin(true);
  }, [managerInfo]);

  const handleLogin = () => {
    managerInfo && setManagerInfo(undefined);
    setIsVisibleLogin(true);
  };
  const handlePopupClose = () => setIsVisibleLogin(false);

  return (
    <Wrap>
      <HeaderInner>
        <MyLogo>
          <HomeLink to={HOME}>HOME</HomeLink>
        </MyLogo>
        <Title>HELLO</Title>
      </HeaderInner>

      <HeaderInner>
        {managerInfo && (
          <>
            <UserId>{managerInfo.id} 님</UserId>
            <UserNotProfile src={Images.iconDefaultUser} alt='' />
          </>
        )}

        <BtnLogout onClick={handleLogin}>
          <BtniconLogout src={Images.iconLogout} alt='' />
          {managerInfo ? '로그아웃' : '로그인'}
        </BtnLogout>
      </HeaderInner>

      <PopupLogin isVisible={isVisibleLogin} onClose={handlePopupClose} />
    </Wrap>
  );
};
export default Header;

const Wrap = styled.header`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-width: var(--minWidth);
  height: var(--headerHeight);
  padding: 15px 25px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;
const MyLogo = styled.h1`
  overflow: hidden;
  width: 143px;
  height: 16px;
  background: url(${Images.logo}) no-repeat 0 / 100%;
  font-size: 0;
  line-height: 0;
  text-indent: 100%;
`;
const HomeLink = styled(Link)`
  display: block;
  height: 100%;
`;
const Title = styled.h2`
  margin-left: 20px;
  padding: 1px 0 1px 20px;
  border-left: 1px solid var(--darkGray);
  font-weight: 500;
  color: var(--darkGray);
  line-height: 19px;
`;
const HeaderInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const UserId = styled.p`
  margin-right: 17px;
  font-size: 14px;
  font-weight: 500;
`;
const UserProfile = styled.img`
  width: 35px;
  height: 35px;
`;
const UserNotProfile = styled(UserProfile)``;
const BtnLogout = styled.button`
  margin-left: 7px;
  padding: 10px 17px;
  border: 1px solid transparent;
  border-radius: 4px;
  font-weight: 500;
  box-sizing: border-box;
  transition: all 0.3s;
  &:hover {
    border-color: var(--bgContent);
    background-color: var(--primary1-light);
  }
`;
const BtniconLogout = styled.img`
  margin-right: 8px;
  vertical-align: middle;
`;
