import { Feature, SignificantGroup } from 'types';

// 배열 size 기준으로 나누기
export const arrayChunk = (array: any[], size: number) => {
  const last = Math.ceil(array.length / size);
  const newData: any[] = [];
  for (let i = 0; i < array.length; i += size) {
    newData.push(array.slice(i, i + size));
  }
  if (array.length % size !== 0) {
    for (let i = 0; i < size - (array.length % size); i++) {
      newData[last - 1].push('');
    }
  }
  return newData;
};

// '00' string
const numberToTwoString = (str: number): string => {
  return ('0' + str.toString()).slice(-2);
};
// YY.mm.DD HH:mm 기준
export const dateTimeFormat = (date: string): string => {
  const _date = new Date(date);
  const year = _date.getFullYear().toString().slice(-2);
  const month = numberToTwoString(_date.getMonth() + 1);
  const day = numberToTwoString(_date.getDate());
  const hours = numberToTwoString(_date.getHours());
  const minutes = numberToTwoString(_date.getMinutes());
  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

// YYYY년 m월 D일 기준
export const dateToYYYYmmDD = (date: string): string => {
  const _date = new Date(date);
  const year = _date.getFullYear().toString();
  const month = _date.getMonth() + 1;
  const day = _date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

// HH:mm 기준
export const dateToHHmm = (date: string): string => {
  const _date = new Date(date);
  const hours = numberToTwoString(_date.getHours());
  const minutes = numberToTwoString(_date.getMinutes());
  return `${hours}:${minutes}`;
};

// 핸드폰 번호 하이픈 추가
export const phoneHyphen = (phone: string): string => {
  const phoneStart = phone.startsWith('0') ? phone.slice(0, 3) : `0${phone.slice(0, 2)}`;
  const phoneEnd = phone.slice(phone.length - 4);
  const phoneMiddle = phone.slice(phone.startsWith('0') ? 3 : 2, phone.length - phoneEnd.length);

  return `${phoneStart}-${phoneMiddle}-${phoneEnd}`;
};

// 대면상담 > 특징 세분화: 내려온 data 변경하기
export const categorizeData = (data: SignificantGroup[]): Feature[] => {
  return data.map((item) => ({
    value: item.value,
    label: item.description,
    description: '',
    isChecked: false,
  }));
};
