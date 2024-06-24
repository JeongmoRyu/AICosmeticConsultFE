import { useMutation, useQuery } from '@tanstack/react-query';
import { MemberListData, LoginParams, MemberListParams } from 'types';
import { ErrorType, getRequest, postRequest } from 'utils/request';

const userKeys = {
  all: ['user'] as const,
  memberList: (params) => [...userKeys.all, 'memberList', params] as const,
};

// 로그인
export const usePostLogin = () => {
  return useMutation<any, ErrorType, LoginParams>({
    mutationFn: (data) => {
      return postRequest({ url: '/api/auth/login', data });
    },
  });
};

// 고객 리스트
export const useGetMemberList = (isEnabled: boolean, params?: MemberListParams) => {
  return useQuery<MemberListData[], ErrorType>({
    queryKey: userKeys.memberList(params),
    queryFn: () =>
      getRequest({
        url: '/api/member/list',
        params,
      }),
    enabled: isEnabled,
  });
};
