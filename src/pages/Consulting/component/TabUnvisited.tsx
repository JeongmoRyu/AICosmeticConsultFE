import { useState } from 'react';
import styled from 'styled-components';
import SelectBox, { selectItemType } from 'components/SelectBox';
import Button from 'components/Button';
import InfoBox from 'components/InfoBox';
import InputText from 'components/InputText';
import Textarea from 'components/Textarea';
import NotData from './NotData';
import { ConsultIndirectData, InfoBoxArrayType } from 'types';
import { dateToHHmm, dateToYYYYmmDD } from 'utils/utility';
import { useGetConsultIndirect } from 'api/ConsultQueries';

const SELECT_YEAR: selectItemType[] = [
  { id: 'year_2024', name: 'year', text: '2024년' },
  { id: 'year_2023', name: 'year', text: '2023년' },
  { id: 'year_2022', name: 'year', text: '2022년' },
  { id: 'year_2021', name: 'year', text: '2021년' },
  { id: 'year_2020', name: 'year', text: '2020년' },
  { id: 'year_2019', name: 'year', text: '2019년' },
  { id: 'year_2018', name: 'year', text: '2018년' },
  { id: 'year_2017', name: 'year', text: '2017년' },
  { id: 'year_2016', name: 'year', text: '2016년' },
];
const SELECT_MONTH: selectItemType[] = [
  { id: 'month_1', name: 'month', text: '1월' },
  { id: 'month_2', name: 'month', text: '2월' },
  { id: 'month_3', name: 'month', text: '3월' },
  { id: 'month_4', name: 'month', text: '4월' },
  { id: 'month_5', name: 'month', text: '5월' },
  { id: 'month_6', name: 'month', text: '6월' },
  { id: 'month_7', name: 'month', text: '7월' },
  { id: 'month_8', name: 'month', text: '8월' },
  { id: 'month_9', name: 'month', text: '9월' },
  { id: 'month_10', name: 'month', text: '10월' },
  { id: 'month_11', name: 'month', text: '11월' },
  { id: 'month_12', name: 'month', text: '12월' },
];
const SELECT_SORTING: selectItemType[] = [
  { id: '0', name: 'sorting', text: '오름차순 정렬' },
  { id: '1', name: 'sorting', text: '내림차순 정렬' },
];

interface Props {
  memberId: number;
}

const TabUnvisited = ({ memberId }: Props) => {
  const [activeSelected, setActiveSelected] = useState({ year: 'year_2024', month: 'month_1', sorting: '0' });

  const { data, refetch } = useGetConsultIndirect(memberId);

  const handleSortingChange = (type: string, id: string) => {
    setActiveSelected((prev) => ({ ...prev, [type]: id }));
  };

  if (!memberId || !data || !data?.length) {
    return <NotData />;
  }

  return (
    <>
      <SearchBox>
        <SearchInner>
          <SelectBox
            selectList={SELECT_YEAR}
            activeId={activeSelected.year}
            labelText='검색조건'
            handleChange={(id) => handleSortingChange('year', id)}
          />
          <SelectBox
            selectList={SELECT_MONTH}
            activeId={activeSelected.month}
            handleChange={(id) => handleSortingChange('month', id)}
          />
        </SearchInner>
        <Button buttonText='조회' />
      </SearchBox>
      <SortingBox>
        <SelectBox
          selectList={SELECT_SORTING}
          activeId={activeSelected.sorting}
          handleChange={(id) => handleSortingChange('sorting', id)}
        />
      </SortingBox>
      {data.map((item, index) => {
        const data1: any[] = [
          { id: 'time', label: '시각', text: dateToHHmm(item.consult_date) },
          { id: 'product', label: '사용/구매 제품', text: item.product || '-' },
          { id: 'manager', label: '담당자', text: item.manager || '-' },
        ];
        const data2: any[] = [
          { id: 'concern1', label: '문진 피부고민1', text: item.concern1 || '-' },
          { id: 'concern2', label: '문진 피부고민2', text: item.concern2 || '-' },
        ];

        return (
          <DetailBox key={`unvisited${index}`}>
            <InfoBox data1={data1} data2={data2} title={dateToYYYYmmDD(item.consult_date)} />
            <DetailInnerBox>
              <InputText
                id={`caseType${index}`}
                value={item.case_type}
                isInputFullWidth={true}
                readOnly={true}
                label='케이스 분류'
              />
            </DetailInnerBox>
            <DetailInnerBox>
              <Textarea id={`consultContent${index}`} label='상담내용' value={item.consult_info} readOnly={true} />
              <Textarea id={`significant${index}`} label='특이사항' value={item.significant} readOnly={true} />
            </DetailInnerBox>
          </DetailBox>
        );
      })}
    </>
  );
};
export default TabUnvisited;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -37px;
  padding: 15px 5px;
  border-bottom: 1px solid var(--bgContent);
`;
const SearchInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const SortingBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 7px;
`;
const DetailBox = styled.div`
  & + & {
    margin-top: 80px;
  }
`;

const DetailInnerBox = styled.div`
  margin-top: 30px;
`;
