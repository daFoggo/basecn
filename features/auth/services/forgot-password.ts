import { BACKEND_API } from "@/lib/configs/environment";
import { fetcher } from "@/lib/utils/fetcher";

const FORGOT_PASSWORD_ENDPOINTS = {
  FORGOT_PASSWORD: `${BACKEND_API}/auth/forgot-password`, // Send OTP to email
  VERIFY_OTP: `${BACKEND_API}/auth/verify-otp`, // Verify OTP code
  RESEND_OTP: `${BACKEND_API}/auth/resend-otp`, // Resend OTP code
  RESET_PASSWORD: `${BACKEND_API}/auth/reset-password`, // Reset password with token
};

export interface IPostForgotPassword {
  email: string;
}

export interface IPostVerifyOTP {
  email: string;
  otp: string;
}

export interface IVerifyOTPResponse {
  resetToken: string;
  message: string;
}

export interface IPostResendOTP {
  email: string;
}

export interface IPostResetPassword {
  resetToken: string;
  newPassword: string;
}

export interface IForgotPasswordResponse {
  message: string;
}

export interface IResendOTPResponse {
  message: string;
}

export interface IResetPasswordResponse {
  message: string;
}

export const forgotPasswordServices = {
  forgotPassword: async (
    params: IPostForgotPassword
  ): Promise<IForgotPasswordResponse> => {
    const response = await fetcher<IForgotPasswordResponse>([
      FORGOT_PASSWORD_ENDPOINTS.FORGOT_PASSWORD,
      { method: "POST", data: params },
    ]);
    return response;
  },

  verifyOTP: async (params: IPostVerifyOTP): Promise<IVerifyOTPResponse> => {
    const response = await fetcher<IVerifyOTPResponse>([
      FORGOT_PASSWORD_ENDPOINTS.VERIFY_OTP,
      { method: "POST", data: params },
    ]);
    return response;
  },

  resendOTP: async (params: IPostResendOTP): Promise<IResendOTPResponse> => {
    const response = await fetcher<IResendOTPResponse>([
      FORGOT_PASSWORD_ENDPOINTS.RESEND_OTP,
      { method: "POST", data: params },
    ]);
    return response;
  },

  resetPassword: async (
    params: IPostResetPassword
  ): Promise<IResetPasswordResponse> => {
    const response = await fetcher<IResetPasswordResponse>([
      FORGOT_PASSWORD_ENDPOINTS.RESET_PASSWORD,
      { method: "POST", data: params },
    ]);
    return response;
  },
};
