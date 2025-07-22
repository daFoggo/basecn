import { BACK_END_API } from "@/lib/constants";

export interface IForgotPasswordParams {
  email: string;
}

export interface IVerifyOTPParams {
  email: string;
  otp: string;
}

export interface IVerifyOTPResponse {
  resetToken: string;
  message: string;
}

export interface IResendOTPParams {
  email: string;
}

export interface IResetPasswordParams {
  resetToken: string;
  newPassword: string;
}

const FORGOT_PASSWORD_ENDPOINTS = {
  FORGOT_PASSWORD: `${BACK_END_API}/auth/forgot-password`, // Send OTP to email
  VERIFY_OTP: `${BACK_END_API}/auth/verify-otp`, // Verify OTP code
  RESEND_OTP: `${BACK_END_API}/auth/resend-otp`, // Resend OTP code
  RESET_PASSWORD: `${BACK_END_API}/auth/reset-password`, // Reset password with token
};

export const forgotPasswordService = {
  forgotPassword: async (params: IForgotPasswordParams) => {
    const response = await fetch(FORGOT_PASSWORD_ENDPOINTS.FORGOT_PASSWORD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to send reset code");
    }

    const data = await response.json();
    return {
      success: true,
      message: data.message || "Reset code sent to your email",
    };
  },

  verifyOTP: async (params: IVerifyOTPParams) => {
    const response = await fetch(FORGOT_PASSWORD_ENDPOINTS.VERIFY_OTP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Invalid or expired OTP code");
    }

    const data: IVerifyOTPResponse = await response.json();
    return {
      resetToken: data.resetToken,
      message: data.message || "OTP verified successfully",
    };
  },

  resendOTP: async (params: IResendOTPParams) => {
    const response = await fetch(FORGOT_PASSWORD_ENDPOINTS.RESEND_OTP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to resend OTP code");
    }

    const data = await response.json();
    return {
      success: true,
      message: data.message || "New OTP code sent to your email",
    };
  },

  resetPassword: async (params: IResetPasswordParams) => {
    const response = await fetch(FORGOT_PASSWORD_ENDPOINTS.RESET_PASSWORD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resetToken: params.resetToken,
        newPassword: params.newPassword,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to reset password");
    }

    const data = await response.json();
    return {
      success: true,
      message: data.message || "Password reset successfully",
    };
  },
};
