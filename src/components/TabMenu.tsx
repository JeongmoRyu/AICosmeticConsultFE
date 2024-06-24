import styled from 'styled-components';

export interface TabType {
  id: string;
  text: string;
}

interface Props {
  tabMenu: TabType[];
  activeTabId: string;
  onClick: (id: string) => void;
}

const TabMenu = ({ tabMenu, activeTabId, onClick }: Props) => {
  return (
    <Wrap>
      <ul>
        {tabMenu.map((item) => (
          <li key={item.id}>
            <TabButton $activeTabId={item.id === activeTabId} onClick={() => onClick(item.id)}>
              {item.text}
            </TabButton>
          </li>
        ))}
      </ul>
    </Wrap>
  );
};

export default TabMenu;

const Wrap = styled.div`
  height: 57px;
  margin-right: 16px;
  ul {
    display: flex;
    z-index: 0;
    position: relative;
    border-bottom: 1px solid var(--gray);
  }
`;
const TabButton = styled.button.attrs({ type: 'button' })<{ $activeTabId: boolean }>`
  z-index: 1;
  position: relative;
  bottom: -1px;
  padding: 5px 20px 20px 20px;
  border-bottom-width: 2px;
  border-style: solid;
  font-size: 24px;
  font-weight: 700;
  color: ${({ $activeTabId }) => ($activeTabId ? 'var(--black)' : 'var(--gray)')};
  border-color: ${({ $activeTabId }) => ($activeTabId ? 'var(--black)' : 'transparent')};
`;
