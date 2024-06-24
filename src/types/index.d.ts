export interface LoginParams {
  manager_id: string;
  pwd: string;
}
export interface ManagerInfoType {
  token: string;
  id: string;
}

export interface MemberInfoPropsType {
  id: number;
  name: string;
}

export interface InfoBoxArrayType {
  id: string;
  label: string;
  text: string;
}
export interface MemberListParams {
  orderBy?: string; // name(이름) / chatting(대화)
  order?: string; // asc(오름차순) / desc(내림차순)
  name?: string; // 검색 (이름 :필수)
  age?: string; // 검색 (나이)
}
export interface MemberListData {
  id: number; // member ID
  name: string; // 이름
  sex: string; // 성별
  age: number; // 나이
  birthday: string; // 생년월일
  concern1: string; // 인지 피부고민1
  concern2: string; // 인지 피부고민2
  consult_count: number; // 방문 횟수
  phone: string; // 연락처
  birth_cd: string; // solar 양력, lunar 음력
  extracted_year: string; // 출생년도
  site: string; // 지역
}

export interface ChatroomDetailData {
  id: number; // 챗봇룸목록ID
  room_id: number; // 챗봇룸ID
  seq: number; // 순서
  role: string; // ROLE
  content: string; // 채팅내용
  feedback: string; // 피드백
  created_at: string; // 등록일*
  updated_at: string; // 수정일
}
export interface ChatPostParams {
  user_id: number;
  message: string;
}

export interface ConsultDirectPrams {
  memberId: number;
  consultNumber: number;
}
export interface ConsultDirectData {
  id: number; // key
  consult_date: string; // 상담일시
  user_key: number; // 사용자Key
  consult_data: string; // 상담정보(Full)
  concern1: string; // 피부고민1
  concern2: string; // 피부고민2
  product: string; // 추천제품
  significant: string; // 특이사항
  etc: string; // 기타(메모)
  manager: string; // 상담사
  consult_number: number; // 현재 회차
  features: string | null; // 특징 세분화 string (서버 확인용)
  feature_list: Feature[] | null; // 특징 세분화 배열
}
export interface Feature {
  value: number; // ID
  label: string; // 명칭 (Feature > label 값)
  description: string; // 상세내용
  isChecked?: boolean; // front 사용
}
export interface FeatureType {
  [key: string]: Feature[];
}

export interface ConsultIndirectData {
  name: string; // 사용자 이름
  consult_date: string; // 상담일시
  concern1: string; // 피부고민1
  concern2: string; // 피부고민2
  product: string; // 제품정보
  manager: string; // 상담사
  region: string; // 지역
  case_type: string; // caseType
  consult_info: string; // 상담내용
  significant: string; // 특이사항
}

export interface SignificantGroup {
  code: string; // 분류
  value: number; // ID
  description: string; // 명칭 (Feature > label 값)
}
