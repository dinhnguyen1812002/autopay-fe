import axiosClient, { getCsrfToken } from '@/utils//axiosClient';
import Cookies from 'js-cookie';

// Đăng ký người dùng
export const registerUser = async (name: string, email: string, password: string, password_confirmation: string) => {
  await getCsrfToken(); // Nhận CSRF token

  const response = await axiosClient.post('/register', {
    name,
    email,
    password,
    password_confirmation,
  });

  const { user, token } = response.data;

  // Lưu token vào cookie
  Cookies.set('auth_token', token, { expires: 7 }); // Token tồn tại trong 7 ngày

  return user;
};

// Đăng nhập người dùng
export const loginUser = async (email: string, password: string) => {
  await getCsrfToken();

  const response = await axiosClient.post('/login', {
    email,
    password,
  });

  const { user, token } = response.data;

  // Lưu token vào cookie
  Cookies.set('auth_token', token, { expires: 7 });

  return user;
};

// Đăng xuất người dùng
export const logoutUser = async () => {
  await axiosClient.post('/logout');
  Cookies.remove('auth_token'); // Xóa token khỏi cookie
};
