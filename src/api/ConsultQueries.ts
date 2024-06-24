import { useMutation, useQuery } from '@tanstack/react-query';
import { ConsultIndirectData, ConsultDirectData, ConsultDirectPrams, SignificantGroup } from 'types';
import { ErrorType, getRequest, putRequest } from 'utils/request';

const consultKeys = {
  all: ['consult'] as const,
  consultInfo: (memberId: number, consultNumber: number) =>
    [...consultKeys.all, 'consultInfo', memberId, consultNumber] as const,
  consultGroup: () => [...consultKeys.all, 'consultGroup'] as const,
  consultIndirect: (memberId?: number) => [...consultKeys.all, 'consultIndirect', memberId] as const,
};

// 대면 상담정보 조회
export const useGetConsultDirect = (params: ConsultDirectPrams) => {
  return useQuery<ConsultDirectData[], ErrorType>({
    queryKey: consultKeys.consultInfo(params.memberId, params.consultNumber),
    queryFn: () => getRequest({ url: `/api/consult/direct/${params.memberId}/${params.consultNumber}` }),
    enabled: false,
  });
};

// 특징 세분화 그룹 조회
export const useGetConsultGroup = () => {
  return useQuery<SignificantGroup[], ErrorType>({
    queryKey: consultKeys.consultGroup(),
    queryFn: () => getRequest({ url: '/api/consult/group' }),
  });
};

// 특징 세분화 그룹 수정
export const usePutConsultGroup = () => {
  return useMutation<any, ErrorType, ConsultDirectData>({
    mutationFn: (data) => {
      return putRequest({
        url: `/api/consult/direct/${data.user_key}/${data.consult_number}`,
        data,
      });
    },
  });
};

// 비대면 상담정보 조회
export const useGetConsultIndirect = (memberId: number) => {
  return useQuery<ConsultIndirectData[], ErrorType>({
    queryKey: consultKeys.consultIndirect(memberId),
    queryFn: () => getRequest({ url: `/api/consult/indirect/${memberId}` }),
    enabled: false,
  });
};
