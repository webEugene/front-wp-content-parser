type RegisterParams = {
  email: string;
  password: string;
};

type LoginParams = RegisterParams;

type ForgetPasswordParams = {
  email: string;
};

type ResetPasswordParams = {
  password: string;
  token: string;
};

export const authApi = () => {
  const { apiUrl } = useAppConfig();

  const registerUser = async (entry: RegisterParams) => {
    return await $fetch(`${apiUrl}wp-parser/auth/register`, {
      method: "POST",
      body: entry,
    });
  };

  const login = async (entry: LoginParams) => {
    return await $fetch(`${apiUrl}wp-parser/auth/login`, {
      method: "POST",
      body: entry,
    });
  };

  const forgetPassword = async (entry: ForgetPasswordParams) => {
    return await $fetch(`${apiUrl}wp-parser/auth/forgot-password`, {
      method: "POST",
      body: entry,
    });
  };

  const resetPassword = async (entry: ResetPasswordParams) => {
    return await $fetch(`${apiUrl}wp-parser/auth/reset-password`, {
      method: "POST",
      body: entry,
    });
  };

  return {
    registerUser,
    login,
    forgetPassword,
    resetPassword,
  };
};
