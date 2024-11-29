import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api', // Laravel backend
  withCredentials: true, // Quan trọng cho Sanctum
});

// Gọi CSRF cookie trước khi thực hiện các request cần bảo mật
export const getCsrfToken = async () => {
  await axiosClient.get('http://localhost:8000/sanctum/csrf-cookie');
};

export default axiosClient;
