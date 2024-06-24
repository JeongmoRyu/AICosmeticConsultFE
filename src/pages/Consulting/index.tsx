import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useStore from 'store/useStore';
import { Title } from 'components/Title';
import InfoBox from 'components/InfoBox';
import TabMenu, { TabType } from 'components/TabMenu';
import TabVisited from './component/TabVisited';
import UserSearch from './component/UserSearch';
import TabUnvisited from './component/TabUnvisited';
import { useGetMemberList } from 'api/UserQueries';
import { MemberListData } from 'types';
import { categorizeData, phoneHyphen } from 'utils/utility';
import { useGetConsultGroup } from 'api/ConsultQueries';

const TAB_MENU: TabType[] = [
  { id: 'tabVisited', text: '대면 상담 내역' },
  { id: 'tabUnvisited', text: '비대면 상담 내역' },
];

const MEMBER_DETAIL_DEFAULT = [
  [
    { id: 'age', label: '나이', text: '' },
    { id: 'extracted_year', label: '생년', text: '' },
    { id: 'sex', label: '성별', text: '' },
    { id: 'phone', label: '연락처', text: '' },
  ],
  [
    { id: 'concern1', label: '인지 피부고민1', text: '' },
    { id: 'concern2', label: '인지 피부고민2', text: '' },
    { id: 'consult_count', label: '방문회수', text: '' },
    { id: 'site', label: '거주지역', text: '' },
  ],
];

const Consulting = () => {
  const [activeTabId, setActiveTabId] = useState('tabVisited');
  const [memberDetail, setMemberDetail] = useState(MEMBER_DETAIL_DEFAULT);
  const [memberInfo, setMemberInfo] = useState<MemberListData | null>(null);
  const isFirstData = useRef(true);

  const { managerInfo } = useStore();
  const { data } = useGetMemberList(!!managerInfo?.token);
  const { data: groupData } = useGetConsultGroup();

  useEffect(() => {
    // 첫 진입시 리스트 첫번째 data 가져오기
    if (isFirstData.current && data) {
      setMemberInfo(data[0]);
      isFirstData.current = false;
    }
  }, [data]);

  useEffect(() => {
    if (memberInfo) {
      const obj = Object.keys(memberInfo);
      const _data1: any[] = [];
      const _data2: any[] = [];

      // 순서 이슈로 default부터 map 돌림
      MEMBER_DETAIL_DEFAULT[0].map((i) =>
        obj.map(
          (o) =>
            i.id == o &&
            (i.id === 'sex'
              ? _data1.push({ ...i, text: memberInfo[i.id] === 'F' ? '여성' : '남성' })
              : i.id === 'phone'
                ? _data1.push({ ...i, text: phoneHyphen(memberInfo[i.id]) })
                : _data1.push({ ...i, text: memberInfo[i.id] || '-' })),
        ),
      );
      MEMBER_DETAIL_DEFAULT[1].map((i) =>
        obj.map((o) => i.id == o && _data2.push({ ...i, text: memberInfo[i.id] || '-' })),
      );

      setMemberDetail([_data1, _data2]);
    }
  }, [memberInfo]);

  const handleTabMenu = (id: string) => setActiveTabId(id);
  const handleMemberClick = (data: MemberListData) => {
    setMemberInfo(data);
    activeTabId !== 'tabVisited' && setActiveTabId('tabVisited'); // 비대면탭일때 대면탭으로 이동
  };

  return (
    <Wrap>
      <UserInfoContent>
        <Title text='고객 조회' />
        <UserSearch memberInfo={memberInfo ? memberInfo : undefined} onMemberClick={handleMemberClick} />
        <InfoBox
          data1={memberDetail[0]}
          data2={memberDetail[1]}
          title='고객 정보'
          inTitle={memberInfo?.name}
          $firstLabelWidth='35%'
        />
      </UserInfoContent>
      <UserInfoContent>
        <TabMenu tabMenu={TAB_MENU} activeTabId={activeTabId} onClick={handleTabMenu} />
        <TabContent>
          {activeTabId === 'tabVisited' && (
            <TabVisited
              paramsProps={{ memberId: memberInfo?.id || 0, consultNumber: memberInfo?.consult_count || 0 }}
              groupAllList={groupData ? categorizeData(groupData) : null}
            />
          )}
          {activeTabId === 'tabUnvisited' && <TabUnvisited memberId={memberInfo?.id || 0} />}
        </TabContent>
      </UserInfoContent>
    </Wrap>
  );
};

export default Consulting;

const Wrap = styled.div`
  display: flex;
  height: 100%;
`;
const UserInfoContent = styled.div`
  overflow: auto;
  flex: 1;
  padding: 30px 35px;
  background-color: var(--white);
  border-top-left-radius: 30px;
  &:not(:only-child):nth-child(1) {
    flex-grow: 0.7;
    max-width: 700px;
    border-top-right-radius: 30px;
    box-sizing: border-box;
  }
  &:not(:first-child) {
    margin-left: 20px;
  }
`;
const TabContent = styled.div`
  height: calc(100% - 57px + 30px);
  margin: 0 -35px -30px;
  box-sizing: border-box;
`;
