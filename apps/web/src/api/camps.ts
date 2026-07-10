import { apiClient } from './client';

export const generateCamp = async (prompt: string) => {
  try {
    const response = await apiClient.post('/camps/generate', { prompt });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || '生成失败',
    };
  }
};

export const getCampList = async () => {
  try {
    const response = await apiClient.get('/camps');
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || '获取列表失败',
    };
  }
};

export const getCampDetail = async (id: string) => {
  try {
    const response = await apiClient.get(`/camps/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || '获取详情失败',
    };
  }
};

export const updateCamp = async (id: string, updates: any) => {
  try {
    const response = await apiClient.put(`/camps/${id}`, updates);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || '更新失败',
    };
  }
};

export const deleteCamp = async (id: string) => {
  try {
    const response = await apiClient.delete(`/camps/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || '删除失败',
    };
  }
};
