import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from 'containers/Header';
import SideMenu from 'containers/SideMenu';

export default function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <Wrap>
      <Header />
      <Container>
        {!isHome && <SideMenu />}
        <Content $isHome={isHome}>
          <Outlet />
        </Content>
      </Container>
    </Wrap>
  );
}

const Wrap = styled.div`
  min-width: var(--minWidth);
  min-height: 100vh;
  background-color: var(--bg);
`;
const Container = styled.section`
  display: flex;
  flex-direction: row;
  height: calc(100vh - var(--headerHeight));
`;
const Content = styled.div<{ $isHome: boolean }>`
  flex: 1;
  height: 100%;
  ${({ $isHome }) => !$isHome && 'margin-left: 20px; overflow: hidden;'}
`;
