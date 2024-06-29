import { store } from 'App';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchError, fetchSuccess, showMessage } from 'redux/actions';
import axiosInstanceAxios from './axiosInstance';

export const useGitListService = <DataType>(url: string) => {
  return useQuery<DataType>({
    queryKey: [url],
    queryFn: async () => {
      const response: AxiosResponse<DataType> = await axiosInstanceAxios.get(url);
      return response.data;
    },
  });
};

export const useCreateGitItemService = <DataType, RequestType>(url: string, userAfterSuccess: string, onSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<DataType, AxiosError, RequestType>(
    async (requestData: RequestType) => {
      const response: AxiosResponse<DataType> = await axiosInstanceAxios.post(url, requestData);
      return response.data;
    },
    {
      onSuccess: () => {
        onSuccess && onSuccess();
        queryClient.invalidateQueries(userAfterSuccess);
      },
      onError: (error) => {
        const axiosError = error as AxiosError;

        if (axiosError) {
          if (axiosError?.response) {
            store.dispatch(fetchError(axiosError?.response?.data ?? 'Something went wrong'));
          } else {
            store.dispatch(fetchError('Something went wrong'));
          }
        }
      },
    }
  );
};

export const useDeleteService = (url: string, userAfterSuccess: string, id: string, onSuccess: () => void) => {
  const queryClient = useQueryClient();

  const deleteData = async () => {
    await axiosInstanceAxios.delete(`${url}?id=${id}`);
  };

  return useMutation(deleteData, {
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries(userAfterSuccess);
    },
    onError: (error) => {
      const axiosError = error as AxiosError;

      if (axiosError) {
        if (axiosError?.response) {
          store.dispatch(fetchError(axiosError?.response?.data ?? 'Something went wrong'));
        } else {
          store.dispatch(fetchError('Something went wrong'));
        }
      }
    },
  });
};
