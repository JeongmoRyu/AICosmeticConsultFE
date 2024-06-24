import axios from 'axios';
import useStore from 'store/useStore';

export interface ErrorType<T = any> {
  code: string;
  message: string;
  result: T;
  response?: any;
}

interface apiRequestProps {
  headers?: any;
  url: string;
  data?: unknown;
  params?: any;
  body?: any;
}
interface apiRequestType extends apiRequestProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

const apiRequest = ({ url, method, data, params, body }: apiRequestType): Promise<any> => {
  useStore.getState().showLoading();
  let config: apiRequestType;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: useStore.getState().managerInfo?.token
      ? `Bearer ${useStore.getState().managerInfo?.token}`
      : undefined,
  };
  if (method === 'GET' || method === 'DELETE') {
    config = {
      headers,
      method,
      url: useStore.getState().baseURL + url,
      params,
      body,
    };
  } else {
    config = {
      headers,
      method,
      url: useStore.getState().baseURL + url,
      data,
    };
  }

  return axios(config)
    .then((response) => {
      return method === 'POST' ? response.data : response.data.data;
    })
    .catch((error) => {
      alert('로그인이 해제되었습니다. 다시 로그인 해주세요.');
      useStore.getState().setManagerInfo(undefined);

      return Promise.reject(error);
    })
    .finally(() => {
      return useStore.getState().hideLoading();
    });
};

export const getRequest = <T = any>(obj: apiRequestProps): Promise<T> => apiRequest({ ...obj, method: 'GET' });
export const postRequest = <T = any>(obj: apiRequestProps): Promise<T> => apiRequest({ ...obj, method: 'POST' });
export const putRequest = <T = any>(obj: apiRequestProps): Promise<T> => apiRequest({ ...obj, method: 'PUT' });
export const deleteRequest = <T = any>(obj: apiRequestProps): Promise<T> => apiRequest({ ...obj, method: 'DELETE' });
