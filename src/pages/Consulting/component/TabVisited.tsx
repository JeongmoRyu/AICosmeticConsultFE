import { ChangeEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Images from 'assets/styles/Images';
import { dateToYYYYmmDD, dateToHHmm } from 'utils/utility';
import Button from 'components/Button';
import { SmallTitle } from 'components/Title';
import InputRadioButton from 'components/InputRadioButton';
import InputTextProduct from 'components/InputTextProduct';
import Textarea from 'components/Textarea';
import InfoBox from 'components/InfoBox';
import FeatureDetail from './FeatureDetail';
import NotData from './NotData';
import { ConsultDirectData, ConsultDirectPrams, Feature } from 'types';
import { useGetConsultDirect, usePutConsultGroup } from 'api/ConsultQueries';

interface prodRecommendType {
  id: string;
  value: string;
}
// 추천 제품 리스트
const PROD_RECOMMEND_DEFAULT: prodRecommendType[] = [{ id: 'product1', value: '' }];
// 상담 기본정보
const CONSULT_INFO_DEFAULT = [
  [
    { id: 'time', label: '상담 시각', text: '' },
    { id: 'manager_name', label: '담당자', text: '' },
  ],
  [
    { id: 'concern1', label: '문진 피부고민1', text: '' },
    { id: 'concern2', label: '문진 피부고민2', text: '' },
  ],
];

interface Props {
  paramsProps: ConsultDirectPrams;
  groupAllList: Feature[] | null;
}

const TabVisited = memo(({ paramsProps, groupAllList }: Props) => {
  const [activeRoundId, setActiveRoundId] = useState<number>(paramsProps.consultNumber); // 선택 된 회차
  const [consultList, setConsultList] = useState<number[] | null>(null); // 방문 회차 (n회)
  const [recommendList, setRecommendList] = useState<prodRecommendType[]>(PROD_RECOMMEND_DEFAULT); // 추천 제품 list
  const [recommendArrId, setRecommendArrId] = useState(1); // 추천 제품 list ID (id가 꼬일수 있어서 따로 관리)
  const [consultInfoDetail, setConsultInfoDetail] = useState(CONSULT_INFO_DEFAULT); // 상단 상담 정보
  const [isModify, setIsModify] = useState(false); // 수정 여부
  const [isAllList, setIsAllList] = useState(false); // 특징 세분화 > 수정 > 펼쳐보기 여부
  const [putData, setPutData] = useState<ConsultDirectData | null>(null); // 수정시 서버에 보낼 값

  const historyIdRef = useRef<number | null>(paramsProps.memberId); // 이전 memberId
  const isFirstData = useRef(true); // 첫 진입 여부
  const scrollRef = useRef<HTMLDivElement>(null); // 회차 컨텐츠 ref (전체)
  const consultDataRef = useRef<HTMLTextAreaElement>(null); // 특징 ref

  const { data, refetch } = useGetConsultDirect({
    memberId: paramsProps.memberId,
    consultNumber: activeRoundId,
  });
  const mutation = usePutConsultGroup();

  useEffect(() => {
    if (!!paramsProps.memberId && !!activeRoundId) {
      setIsModify(false);
      refetch();
    }
  }, [paramsProps.memberId, activeRoundId, refetch]);

  const handleRoundRadio = useCallback((id: number) => setActiveRoundId(id), []);
  useEffect(() => {
    if (isFirstData.current || historyIdRef.current !== paramsProps.memberId) {
      const array: number[] = [];
      for (let i = 1; i <= paramsProps.consultNumber; i++) array.push(i);
      setConsultList(array);
      handleRoundRadio(paramsProps.consultNumber);
      historyIdRef.current = paramsProps.memberId;
      isFirstData.current = false;
    }
  }, [paramsProps, handleRoundRadio]);

  useEffect(() => {
    if (data && !!data.length) {
      // 방문 회차 데이터
      const obj = Object.keys(data[0]);
      const _data1: any[] = [];
      const _data2: any[] = [];

      CONSULT_INFO_DEFAULT[0].map((i) =>
        _data1.push({
          ...i,
          text: i.id === 'time' ? (data[0] ? dateToHHmm(data[0].consult_date) : '-') : data[0].manager || '-',
        }),
      );
      CONSULT_INFO_DEFAULT[1].map((i) => obj.map((o) => i.id == o && _data2.push({ ...i, text: data[i.id] || '-' })));
      setConsultInfoDetail([_data1, _data2]);

      // 추천제품
      if (data[0].product) {
        const arrProduct = data[0].product.split('\n');
        const arrTemp: prodRecommendType[] = [];
        arrProduct.map((item, index) => arrTemp.push({ id: `product${index + 1}`, value: item }));
        setRecommendList(arrTemp);
        setRecommendArrId(arrProduct.length);
      } else {
        setRecommendList(PROD_RECOMMEND_DEFAULT);
        setRecommendArrId(1);
      }

      const _list = groupAllList;
      if (data[0].feature_list) {
        const hashMap = new Map();
        data[0].feature_list.forEach((item) => {
          hashMap.set(item.value, item.description);
        });

        _list?.forEach((item) => {
          if (hashMap.has(item.value)) {
            item.description = hashMap.get(item.value);
            item.isChecked = !!hashMap.get(item.value);
          }
        });
      }

      scrollRef.current?.scrollTo(0, 0);
      consultDataRef.current?.scrollTo(0, 0);

      setPutData({ ...data[0], feature_list: _list });
    }
  }, [data, groupAllList]);

  const handleProductAdd = () => {
    setRecommendArrId(recommendArrId + 1);
    setRecommendList([...recommendList, { id: `product${recommendArrId + 1}`, value: '' }]);
  };
  const handleProductDelete = (id: string) => {
    if (recommendList.length > 1) {
      setRecommendList(recommendList.filter((item) => item.id !== id));
    }
  };

  // 수정
  const handleModify = () => setIsModify(true);

  // 저장
  const handleSave = useCallback(() => {
    setIsModify(false);
    if (putData) {
      const _putData = {
        ...putData,
        feature_list: putData.feature_list?.filter((item) => !!item.description && item) ?? null,
      };

      mutation.mutate(_putData, {
        onSuccess: () => refetch(),
      });
    }
  }, [mutation, putData, refetch]);

  const handleAllList = () => setIsAllList(!isAllList);

  // 수정데이터 공통 함수
  const handleDataUpdate = (key: string, value: string | Feature[]) => {
    putData && setPutData({ ...putData, [key]: value });
  };
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>, item: Feature) => {
    const newList = putData?.feature_list?.map((v) =>
      v.value === item.value ? { ...v, isChecked: e.target.checked, description: '' } : v,
    );
    handleDataUpdate('feature_list', newList as Feature[]);
  };
  const handleChangeListText = (e: ChangeEvent<HTMLTextAreaElement>, item: Feature) => {
    const newList = putData?.feature_list?.map((v) =>
      v.value === item.value ? { ...v, description: e.target.value } : v,
    );
    handleDataUpdate('feature_list', newList as Feature[]);
  };

  if (!paramsProps.consultNumber || (!isFirstData && (!data || !data?.length))) {
    return <NotData />;
  }
  return (
    <Wrap>
      <RoundBox>
        <SmallTitle text='방문 회차' />
        <RoundList>
          {consultList?.map((item) => (
            <InputRadioButton
              key={`round${item}`}
              id={`round${item}`}
              name='round'
              value={`${item}회차`}
              label={`${item}회차`}
              isChecked={activeRoundId === item}
              onChange={() => handleRoundRadio(item)}
            />
          ))}
        </RoundList>
      </RoundBox>

      <ScrollBox ref={scrollRef}>
        <InfoBox
          data1={consultInfoDetail[0]}
          data2={consultInfoDetail[1]}
          title={data && data[0] ? dateToYYYYmmDD(data[0].consult_date) : ''}
        />

        <MySolution>
          <BunddleHead>
            <SmallTitle text='마이 스킨 솔루션' />
            <div>
              <Button styleType='mySkin' buttonText='피부 측정 결과' />
              <Button styleType='mySkin' buttonText='두피 모발 측정 결과' />
              <Button styleType='mySkin' buttonText='마이 스킨 DNA 결과' />
            </div>
          </BunddleHead>

          <MySolutionComment>
            <CommentTitle>
              <span>Comment 1</span>
            </CommentTitle>
            제품 추천 루틴 내용이 들어갑니다.
          </MySolutionComment>
          <MySolutionComment>
            <CommentTitle>
              <span>Comment 2</span>
            </CommentTitle>
            생활 습관 루틴 내용이 들어갑니다.
          </MySolutionComment>
          <MySolutionComment>
            <CommentTitle>
              <span>Comment 3</span>
            </CommentTitle>
            추가 정보를 기록합니다.
          </MySolutionComment>
        </MySolution>

        <Hr />

        {isModify ? (
          <Button buttonText='저장' rightChildren={<IconDownload />} onClick={handleSave} />
        ) : (
          <Button buttonText='수정' styleType='white' rightChildren={<IconEdit />} onClick={handleModify} />
        )}

        <BunddleBox>
          <SmallTitle text='추천 제품' $etcStyle={{ marginTop: 33, paddingBottom: 10 }} />
          {recommendList.map((item, index) => (
            <InputTextProduct
              key={item.id}
              id={item.id}
              value={item.value}
              onChange={() => {}}
              placeholder='내용을 입력해 주세요.'
              title={item.id}
              marginTop={index !== 0 ? 5 : undefined}
              onDeleteChange={handleProductDelete}
              readOnly={!isModify}
            />
          ))}
          {isModify && (
            <div className='box_button'>
              <Button
                styleType='white'
                buttonText='추가'
                onClick={handleProductAdd}
                leftChildren={<IconAdd src={Images.iconAdd} alt='' />}
              />
            </div>
          )}
        </BunddleBox>
        <BunddleBox>
          <Textarea
            ref={consultDataRef}
            id='feature'
            label='특징'
            labelType='title'
            value={putData?.consult_data || ''}
            readOnly={!isModify}
            onChange={(e) => handleDataUpdate('consult_data', e.target.value)}
          />
        </BunddleBox>
        <BunddleBox>
          <SmallTitle text='특징 세분화' $etcStyle={{ paddingBottom: 15 }} />
          {putData && (
            <FeatureDetail
              featureAllList={putData.feature_list}
              isModify={isModify}
              isAllList={isAllList}
              onCheckboxChange={handleCheckboxChange}
              onChangeListText={handleChangeListText}
            />
          )}
          {isModify && (
            <div className='box_button'>
              <Button onClick={handleAllList} buttonText={isAllList ? '한줄로 보기' : '펼쳐보기'} />
            </div>
          )}
        </BunddleBox>

        <BottomButtonBox>
          {isModify ? (
            <Button buttonText='저장' rightChildren={<IconDownload />} onClick={handleSave} />
          ) : (
            <Button buttonText='수정' styleType='white' rightChildren={<IconEdit />} onClick={handleModify} />
          )}
        </BottomButtonBox>
      </ScrollBox>
    </Wrap>
  );
});
export default TabVisited;

const Wrap = styled.div`
  height: 100%;
  box-sizing: border-box;
`;
const RoundBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 22px 35px 25px;
`;
const RoundList = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
`;
const ScrollBox = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(100% - 77px);
  padding: 25px 35px 45px;
  box-sizing: border-box;
`;
const MySolutionComment = styled.p`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid var(--bgContent);
  border-radius: 6px;
  background-color: var(--white);
  font-weight: 500;
  & + & {
    margin-top: 5px;
  }
`;
const CommentTitle = styled.em`
  display: table;
  margin: -10px 10px -10px -10px;
  padding: 12px 10px;
  background-color: var(--primary2-light);
  font-weight: 500;
  white-space: nowrap;
  align-self: stretch;
  span {
    display: table-cell;
    vertical-align: middle;
  }
`;
const Hr = styled.hr`
  margin: 30px 0;
  border: none;
  border-top: 1px solid var(--bgContent);
`;
const Icon = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: 4px;
  vertical-align: top;
`;
const IconDownload = styled(Icon)`
  mask-size: cover;
  mask-image: url(${Images.iconDownload});
  background-color: var(--white);
`;
const IconEdit = styled(Icon)`
  background: url(${Images.iconEdit}) no-repeat 0 0 / cover;
`;
const IconAdd = styled.img`
  width: 12px;
  height: 12px;
  margin-top: 2px;
  margin-right: 5px;
  vertical-align: top;
`;
const BunddleBox = styled.div`
  position: relative;
  .box_button {
    position: absolute;
    right: 0;
    top: -3px;
  }
  & + & {
    margin-top: 50px;
  }
`;
const BunddleHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  button {
    margin-left: 5px;
  }
`;
const MySolution = styled(BunddleBox)`
  margin-top: 30px;
`;
const BottomButtonBox = styled.div`
  margin-top: 20px;
  text-align: right;
`;
