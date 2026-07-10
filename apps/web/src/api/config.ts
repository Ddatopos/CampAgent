import { apiClient } from './client';

export const testConnection = async (config: {
  baseUrl: string;
  apiKey: string;
  model: string;
}) => {
  try {
    const response = await apiClient.post('/config', config);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || '连接失败，请确认后端已启动（http://localhost:3001/api/health）',
    };
  }
};
