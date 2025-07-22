"use client";

import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import {
  forgotPasswordService,
  type IForgotPasswordParams,
  type IResendOTPParams,
  type IResetPasswordParams,
  type IVerifyOTPParams,
} from "../services/forgot-password";

export const FORGOT_PASSWORD_CACHE_KEYS = {
  FORGOT_PASSWORD: "/api/auth/forgot-password",
  VERIFY_OTP: "/api/auth/verify-otp",
  RESEND_OTP: "/api/auth/resend-otp",
  RESET_PASSWORD: "/api/auth/reset-password",
};

export function useForgotPasswordRequest() {
  const { trigger, isMutating, error, data, reset } = useSWRMutation(
    FORGOT_PASSWORD_CACHE_KEYS.FORGOT_PASSWORD,
    async (_, { arg }: { arg: IForgotPasswordParams }) => {
      return await forgotPasswordService.forgotPassword(arg);
    },
    {
      revalidate: false,
      onSuccess: () => {
        toast.success("Mã OTP đã được gửi đến email của bạn");
        console.log("Forgot password request sent successfully");
      },
      onError: (error) => {
        toast.error("Có lỗi xảy ra khi gửi yêu cầu đặt lại mật khẩu");
        console.error("Failed to send forgot password request:", error);
      },
    }
  );

  return {
    trigger,
    isSending: isMutating,
    error,
    data,
    reset,
  };
}

export function useVerifyOTP() {
  const { trigger, isMutating, error, data, reset } = useSWRMutation(
    FORGOT_PASSWORD_CACHE_KEYS.VERIFY_OTP,
    async (_, { arg }: { arg: IVerifyOTPParams }) => {
      return await forgotPasswordService.verifyOTP(arg);
    },
    {
      revalidate: false,
      onSuccess: () => {
        toast.success("Xác thực OTP thành công");
        console.log("OTP verified successfully");
      },
      onError: (error) => {
        toast.error("Mã OTP không chính xác hoặc đã hết hạn");
        console.error("Failed to verify OTP:", error);
      },
    }
  );

  return {
    trigger,
    isVerifying: isMutating,
    error,
    data,
    reset,
  };
}

export function useResendOTP() {
  const { trigger, isMutating, error, data, reset } = useSWRMutation(
    FORGOT_PASSWORD_CACHE_KEYS.RESEND_OTP,
    async (_, { arg }: { arg: IResendOTPParams }) => {
      return await forgotPasswordService.resendOTP(arg);
    },
    {
      revalidate: false,
      onSuccess: () => {
        toast.success("Mã OTP mới đã được gửi đến email của bạn");
        console.log("OTP resent successfully");
      },
      onError: (error) => {
        toast.error("Có lỗi xảy ra khi gửi lại mã OTP");
        console.error("Failed to resend OTP:", error);
      },
    }
  );

  return {
    trigger,
    isResending: isMutating,
    error,
    data,
    reset,
  };
}

export function useResetPassword() {
  const { trigger, isMutating, error, data, reset } = useSWRMutation(
    FORGOT_PASSWORD_CACHE_KEYS.RESET_PASSWORD,
    async (_, { arg }: { arg: IResetPasswordParams }) => {
      return await forgotPasswordService.resetPassword(arg);
    },
    {
      revalidate: false,
      onSuccess: () => {
        toast.success("Đặt lại mật khẩu thành công");
        console.log("Password reset successfully");
      },
      onError: (error) => {
        toast.error("Có lỗi xảy ra khi đặt lại mật khẩu");
        console.error("Failed to reset password:", error);
      },
    }
  );

  return {
    trigger,
    isResetting: isMutating,
    error,
    data,
    reset,
  };
}

export function useForgotPassword() {
  const forgotPasswordMutation = useForgotPasswordRequest();
  const verifyOTPMutation = useVerifyOTP();
  const resendOTPMutation = useResendOTP();
  const resetPasswordMutation = useResetPassword();

  return {
    // Forgot Password Request
    forgotPassword: forgotPasswordMutation.trigger,
    isSending: forgotPasswordMutation.isSending,
    forgotPasswordError: forgotPasswordMutation.error,
    forgotPasswordData: forgotPasswordMutation.data,
    resetForgotPassword: forgotPasswordMutation.reset,

    // Verify OTP
    verifyOTP: verifyOTPMutation.trigger,
    isVerifying: verifyOTPMutation.isVerifying,
    verifyOTPError: verifyOTPMutation.error,
    verifyOTPData: verifyOTPMutation.data,
    resetVerifyOTP: verifyOTPMutation.reset,

    // Resend OTP
    resendOTP: resendOTPMutation.trigger,
    isResending: resendOTPMutation.isResending,
    resendOTPError: resendOTPMutation.error,
    resendOTPData: resendOTPMutation.data,
    resetResendOTP: resendOTPMutation.reset,

    // Reset Password
    resetPassword: resetPasswordMutation.trigger,
    isResetting: resetPasswordMutation.isResetting,
    resetPasswordError: resetPasswordMutation.error,
    resetPasswordData: resetPasswordMutation.data,
    resetResetPassword: resetPasswordMutation.reset,
  };
}
