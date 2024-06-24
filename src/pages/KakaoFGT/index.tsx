import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import InputRadio from 'components/InputRadio';
import SelectBox, { selectItemType } from 'components/SelectBox';
import { useGetMemberList } from 'api/UserQueries';
import { usePostMemberChat } from 'api/FGTQueries';
import useStore from 'store/useStore';
import { MemberListData, MemberInfoPropsType } from 'types';
import ChatHistory from './component/ChatHistory';
import { phoneHyphen } from 'utils/utility';

const SELECT_SORTING: selectItemType[] = [
  { id: 'name_asc', name: 'sorting', text: '이름 오름차순' },
  { id: 'name_desc', name: 'sorting', text: '이름 내림차순' },
  { id: 'chatting_desc', name: 'sorting', text: '최근 대화순' },
  { id: 'chatting_asc', name: 'sorting', text: '오래된 대화순' },
];
const MEMBER_CELL_WIDTH = ['15%', '25%', '20%', 'auto'];

const KakaoFGT = () => {
  const [memberInfo, setMemberInfo] = useState<MemberInfoPropsType | undefined>(undefined);
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const isFirstData = useRef(true);

  const { managerInfo } = useStore();
  const mutation = usePostMemberChat();

  const { data, refetch } = useGetMemberList(!!managerInfo?.token, { orderBy, order });

  useEffect(() => {
    // 첫 진입시 리스트 첫번째 채팅 대화 가져오기
    if (isFirstData.current && data) {
      handleMemberClick(data[0]);
      isFirstData.current = false;
    }
  }, [data]);

  useEffect(() => {
    // 로그인 후 리스트 들고오기
    isFirstData.current && managerInfo?.token && refetch();
  }, [managerInfo?.token, refetch]);

  // 리스트 순서 변경
  const handleSortingChange = (id: string) => {
    const arr: string[] = id ? id.split('_') : ['name', 'asc'];
    setOrderBy(arr[0]);
    setOrder(arr[1]);
    refetch();
  };
  // 리스트 클릭
  const handleMemberClick = (item: MemberListData) => setMemberInfo({ id: item.id, name: item.name });

  const handleChatSubmit = (message: string) => {
    if (memberInfo?.id) {
      const params = { user_id: memberInfo.id, message };
      mutation.mutate(params, {
        onSuccess: (result) => alert(result.message),
      });
    }
  };

  return (
    <Wrap>
      <UserListBox>
        <ScrollWrap>
          <ScrollArea>
            <table>
              <caption className='screen_hide'>사용자 성명, 나이, 전화번호</caption>
              <colgroup>
                <col width={MEMBER_CELL_WIDTH[0]} />
                <col width={MEMBER_CELL_WIDTH[1]} />
                <col width={MEMBER_CELL_WIDTH[2]} />
                <col width={MEMBER_CELL_WIDTH[3]} />
              </colgroup>
              <thead>
                <tr>
                  <th scope='col'>
                    <span className='screen_hide'>선택</span>
                  </th>
                  <th scope='col'>성명</th>
                  <th scope='col'>나이</th>
                  <th scope='col'>전화번호</th>
                </tr>
              </thead>
              {data && (
                <tbody>
                  {data.map((item, index) => (
                    <UserListTbodyTr key={`member_${item.id}`} $isChecked={memberInfo?.id === item.id}>
                      <td>
                        <InputRadio
                          id={`member_${item.id}`}
                          name='member'
                          checked={(isFirstData.current && index === 0) || memberInfo?.id === item.id}
                          onClick={() => handleMemberClick(item)}
                        />
                      </td>
                      <td>
                        <label htmlFor={`member_${item.id}`}>{item.name}</label>
                      </td>
                      <td>
                        <label htmlFor={`member_${item.id}`}>{item.age ? `${item.age}세` : ''}</label>
                      </td>
                      <td>
                        <label htmlFor={`member_${item.id}`}>{phoneHyphen(item.phone)}</label>
                      </td>
                    </UserListTbodyTr>
                  ))}
                </tbody>
              )}
            </table>
          </ScrollArea>
        </ScrollWrap>

        <SelectArea>
          <SelectBox selectList={SELECT_SORTING} activeId={`${orderBy}_${order}`} handleChange={handleSortingChange} />
        </SelectArea>
      </UserListBox>
      {memberInfo && <ChatHistory memberInfo={memberInfo} onChatSubmit={handleChatSubmit} />}
    </Wrap>
  );
};

export default KakaoFGT;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  padding: 0 25px;
  background-color: var(--bg);
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    background-color: var(--white);
    table-layout: fixed;
    border-bottom: 1px solid var(--bgContent);
  }
  thead {
    display: table;
    position: absolute;
    top: -50px;
    left: 0;
    right: 0;
    width: 100%;
    height: 50px;
    tr {
      width: 100%;
    }
  }
  th {
    padding: 15px 8px;
    background-color: var(--primary);
    font-weight: 700;
    color: var(--white);
  }
  td {
    border-top: 1px solid var(--bgContent);
    &:not([class*='text_left']) {
      text-align: center;
    }
  }
`;
const ScrollWrap = styled.div`
  position: relative;
  height: calc(100% - 50px);
  margin-top: 50px;
  padding-bottom: 20px;
  box-sizing: border-box;
`;
const ScrollArea = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
`;
const UserListBox = styled.div`
  position: relative;
  width: 40%;
  min-width: 480px;
  max-width: 550px;
  th {
    &:nth-child(1) {
      width: ${MEMBER_CELL_WIDTH[0]};
    }
    &:nth-child(2) {
      width: ${MEMBER_CELL_WIDTH[1]};
    }
    &:nth-child(3) {
      width: ${MEMBER_CELL_WIDTH[2]};
    }
    &:nth-child(4) {
      width: ${MEMBER_CELL_WIDTH[3]};
    }
  }
  td {
    &:first-child {
      padding: 10px 10px 8px 30px;
      font-size: 0;
      line-height: 0;
    }
    label {
      display: block;
      padding: 10px 8px;
      cursor: pointer;
    }
  }
`;
const UserListTbodyTr = styled.tr<{ $isChecked: boolean }>`
  &:hover {
    background-color: var(--primary1-light);
  }
  ${({ $isChecked }) => $isChecked && 'background-color: var(--primary1-light)'}
`;
const SelectArea = styled.div`
  position: absolute;
  right: 0;
  top: -44px;
`;
