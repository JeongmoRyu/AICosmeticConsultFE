import { useMutation, useQuery } from '@tanstack/react-query';
import { ChatPostParams, ChatroomDetailData } from 'types';
import { ErrorType, getRequest, postRequest } from 'utils/request';

const fgtKeys = {
  all: ['user'] as const,
  memberChat: (member_id?: number) => [...fgtKeys.all, 'memberChat', member_id] as const,
};

// 채팅 내용 조회
export const useGetMemberChat = (member_id?: number) => {
  return useQuery<ChatroomDetailData[], ErrorType>({
    queryKey: fgtKeys.memberChat(member_id),
    queryFn: () => getRequest({ url: `/api/inner/chatroom/${member_id}` }),
    enabled: !!member_id,
  });
};

// 채팅 보내기
export const usePostMemberChat = () => {
  return useMutation<any, ErrorType, ChatPostParams>({
    mutationFn: (data) => {
      return postRequest({
        url: `/api/inner/chat/${data.user_id}`,
        data: { message: data.message },
      });
    },
  });
};
