import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import InputText from 'components/InputText';
import Button from 'components/Button';
import Pagination from 'components/Pagination';
import { HideSmallTitle } from 'components/Title';
import { arrayChunk } from 'utils/utility';
import { MemberListData, MemberListParams } from 'types';
import { useGetMemberList } from 'api/UserQueries';
import useStore from 'store/useStore';
import NotData from './NotData';

interface Props {
  onMemberClick: (item: MemberListData) => void;
  memberInfo?: MemberListData;
}

const UserSearch = ({ onMemberClick, memberInfo }: Props) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [searchParams, setSearchParams] = useState<MemberListParams>({ name: undefined, age: undefined });
  const [memberList, setMemberList] = useState<any[] | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);

  const { managerInfo } = useStore();
  const { data } = useGetMemberList(!!managerInfo?.token, searchParams);

  useEffect(() => {
    data && setMemberList(arrayChunk(data, 3));
  }, [data]);

  const handlePaginationPrev = () => setActiveIndex(activeIndex - 1);
  const handlePaginationNext = () => setActiveIndex(activeIndex + 1);

  const handleSearchButton = () => {
    if (nameRef.current?.value) {
      activeIndex !== 1 && setActiveIndex(1);
      setSearchParams({ name: nameRef.current?.value, age: ageRef.current?.value });
    } else {
      alert('검색할 성명을 입력해주세요.');
    }
  };

  return (
    <Wrap>
      <SearchBox>
        <InputText ref={nameRef} id='userName' value='' label='성명' isEssential={true} name='userName' />
        <InputText ref={ageRef} id='userAge' value='' label='나이' />
        <Button buttonText='조회' onClick={handleSearchButton} />
      </SearchBox>

      <MemberResultBox>
        <HideSmallTitle text='고객 조회 검색결과' />
        {memberList && !!memberList.length ? (
          <>
            <ul>
              {memberList[activeIndex - 1].map((item: MemberListData, index: number) =>
                item.id ? (
                  <UserList key={`user_${item.id}`}>
                    <ResultRadio
                      id={`user_${item.id}`}
                      name='user'
                      onChange={() => onMemberClick(item)}
                      checked={memberInfo?.id === item.id}
                    />
                    <Label htmlFor={`user_${item.id}`} $checked={memberInfo?.id === item.id}>
                      <ResultBox>{item.name}</ResultBox>
                      <ResultBox>{item.age}세</ResultBox>
                      <ResultBox>{item.sex === 'F' ? '여성' : '남성'}</ResultBox>
                    </Label>
                  </UserList>
                ) : (
                  <UserList key={`user_temp_${index}`}>
                    <ResultRadio id={`user_temp_${index}`} name='user' disabled />
                  </UserList>
                ),
              )}
            </ul>
            <Pagination
              activeIndex={activeIndex}
              total={memberList?.length || 0}
              onPrev={handlePaginationPrev}
              onNext={handlePaginationNext}
            />
          </>
        ) : (
          <NotData paddingTop={0} paddingBottom={25} />
        )}
      </MemberResultBox>
    </Wrap>
  );
};
export default UserSearch;

const Wrap = styled.div`
  margin-bottom: 40px;
`;
const SearchBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 33px;
  padding: 15px 10px 15px 15px;
  border-bottom: 1px solid var(--bgContent);
`;
const MemberResultBox = styled.div`
  overflow: hidden;
  height: 190px;
  ul {
    border-top: 1px solid var(--bgContent);
  }
`;
const UserList = styled.li`
  position: relative;
  height: 50px;
  border-bottom: 1px solid var(--bgContent);
  box-sizing: border-box;
  &:hover {
    background-color: var(--primary1-light);
  }
`;
const Label = styled.label<{ $checked: boolean }>`
  display: flex;
  flex-direction: row;
  padding: 15px 20px 15px 60px;
  cursor: pointer;
`;
const ResultRadio = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  left: 20px;
  top: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  appearance: none;
  border: 1px solid var(--bgContent);
  background-color: var(--white);
  border-radius: 50%;
  cursor: pointer;
  &:checked {
    border-color: var(--primary);
    &:after {
      content: '선택';
      position: absolute;
      top: 4px;
      left: 4px;
      width: 10px;
      height: 10px;
      background-color: var(--primary);
      border-radius: 50%;
      font-size: 0;
      line-height: 0;
      text-indent: 100%;
    }
    + ${Label} {
      background-color: var(--primary1-light);
    }
  }
`;
const ResultBox = styled.span`
  overflow: hidden;
  flex: 1;
  padding-left: 10px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  &:first-child {
    flex: 1.5;
  }
`;
