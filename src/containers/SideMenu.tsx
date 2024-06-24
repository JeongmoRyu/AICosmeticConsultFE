import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const PageInfo = [
    { name: 'consulting', title: '상담 기록 및 조회' },
    { name: 'cdp', title: 'CDP 조회' },
    { name: 'pims', title: 'PIMS 조회' },
    { name: 'admin', title: '관리자 페이지' },
  ];

  const handleIsActive = (name: string) => {
    let pathText = location.pathname.replace('/', '');
    if (!pathText) {
      pathText = 'consulting';
    }
    return pathText === name;
  };

  const goPage = (name: string) => {
    navigate(name);
  };

  return (
    <Gnb>
      <Title>MENU</Title>
      <ul>
        {PageInfo.map((item) => (
          <li key={item.name}>
            <MenuButton name={item.name} $isActive={handleIsActive(item.name)} onClick={() => goPage(item.name)}>
              {item.title}
            </MenuButton>
          </li>
        ))}
      </ul>
    </Gnb>
  );
};
export default SideMenu;

const Gnb = styled.nav`
  max-width: 214px;
  padding: 30px 20px;
  background-color: var(--white);
  border-top-right-radius: 59px;
  box-sizing: border-box;
`;
const Title = styled.p`
  margin-bottom: 16px;
  padding: 0 18px;
  font-size: 14px;
  color: var(--gray);
`;
const MenuButton = styled.button<{ $isActive: boolean }>`
  width: 175px;
  height: 40px;
  margin-top: 10px;
  padding: 8px 20px;
  border-radius: 15px;
  text-align: left;
  transition: all 0.3s;
  &:hover {
    font-weight: 700;
  }
  ${({ $isActive }) => $isActive && 'background-color: var(--primary); font-weight: 700; color: var(--white);'}
`;
