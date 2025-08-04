import { useCallback, useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import {
  forgotPasswordServices,
  type IPostForgotPassword,
  type IPostResendOTP,
  type IPostResetPassword,
  type IPostVerifyOTP,
  type IVerifyOTPResponse,
} from "../services/forgot-password";

export const FORGOT_PASSWORD_CACHE_KEYS = {
  FORGOT_PASSWORD: "forgot-password",
  VERIFY_OTP: "verify-otp",
  RESEND_OTP: "resend-otp",
  RESET_PASSWORD: "reset-password",
} as const;

export function useForgotPassword() {
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);

  // Forgot password mutation
  const {
    trigger: forgotPasswordTrigger,
    isMutating: isSendingForgotPassword,
    error: forgotPasswordError,
    reset: resetForgotPassword,
  } = useSWRMutation(
    FORGOT_PASSWORD_CACHE_KEYS.FORGOT_PASSWORD,
    async (_, { arg }: { arg: IPostForgotPassword }) => {
      const response = await forgotPasswordServices.forgotPassword(arg);
      return response;
    },
    {
      onSuccess: () => {
        toast.success("OTP đã được gửi đến email của bạn");
      },
      onError: (error) => {
        toast.error("Không thể gửi OTP, vui lòng kiểm tra email và thử lại");
        console.error("Forgot password failed:", error);
      },
    }
  );

  // Verify OTP mutation
  const {
    trigger: verifyOTPTrigger,
    isMutating: isVerifyingOTP,
    error: verifyOTPError,
    reset: resetVerifyOTP,
  } = useSWRMutation(
    FORGOT_PASSWORD_CACHE_KEYS.VERIFY_OTP,
    async (_, { arg }: { arg: IPostVerifyOTP }) => {
      const response = await forgotPasswordServices.verifyOTP(arg);
      return response;
    },
    {
      onSuccess: (data: IVerifyOTPResponse) => {
        setResetToken(data.resetToken);
        toast.success("Xác thực OTP thành công");
      },
      onError: (error) => {
        toast.error("OTP không chính xác, vui lòng thử lại");
        console.error("Verify OTP failed:", error);
      },
    }
  );

  // Resend OTP mutation
  const {
    trigger: resendOTPTrigger,
    isMutating: isResendingOTP,
    error: resendOTPError,
    reset: resetResendOTP,
  } = useSWRMutation(
    FORGOT_PASSWORD_CACHE_KEYS.RESEND_OTP,
    async (_, { arg }: { arg: IPostResendOTP }) => {
      const response = await forgotPasswordServices.resendOTP(arg);
      return response;
    },
    {
      onSuccess: () => {
        toast.success("OTP mới đã được gửi đến email của bạn");
      },
      onError: (error) => {
        toast.error("Không thể gửi lại OTP, vui lòng thử lại sau");
        console.error("Resend OTP failed:", error);
      },
    }
  );

  // Reset password mutation
  const {
    trigger: resetPasswordTrigger,
    isMutating: isResettingPassword,
    error: resetPasswordError,
    reset: resetResetPassword,
  } = useSWRMutation(
    FORGOT_PASSWORD_CACHE_KEYS.RESET_PASSWORD,
    async (_, { arg }: { arg: IPostResetPassword }) => {
      const response = await forgotPasswordServices.resetPassword(arg);
      return response;
    },
    {
      onSuccess: () => {
        // Clear all states after successful password reset
        setResetToken(null);
        setVerifiedEmail(null);
        toast.success("Đặt lại mật khẩu thành công");
      },
      onError: (error) => {
        toast.error("Không thể đặt lại mật khẩu, vui lòng thử lại");
        console.error("Reset password failed:", error);
      },
    }
  );

  const sendForgotPassword = useCallback(
    async (params: IPostForgotPassword) => {
      const result = await forgotPasswordTrigger(params);
      if (result) {
        setVerifiedEmail(params.email);
      }
      return result;
    },
    [forgotPasswordTrigger]
  );

  const verifyOTP = useCallback(
    async (params: IPostVerifyOTP) => {
      return await verifyOTPTrigger(params);
    },
    [verifyOTPTrigger]
  );

  const resendOTP = useCallback(
    async (params: IPostResendOTP) => {
      return await resendOTPTrigger(params);
    },
    [resendOTPTrigger]
  );

  const resetPassword = useCallback(
    async (params: IPostResetPassword) => {
      return await resetPasswordTrigger(params);
    },
    [resetPasswordTrigger]
  );

  const clearForgotPasswordFlow = useCallback(() => {
    setResetToken(null);
    setVerifiedEmail(null);
    resetForgotPassword();
    resetVerifyOTP();
    resetResendOTP();
    resetResetPassword();
  }, [resetForgotPassword, resetVerifyOTP, resetResendOTP, resetResetPassword]);

  // Helper to check current step in the flow
  const getCurrentStep = useCallback(() => {
    if (!verifiedEmail) return "enter-email";
    if (!resetToken) return "verify-otp";
    return "reset-password";
  }, [verifiedEmail, resetToken]);

  return {
    // Actions
    sendForgotPassword,
    verifyOTP,
    resendOTP,
    resetPassword,
    clearForgotPasswordFlow,

    // State
    resetToken,
    verifiedEmail,
    getCurrentStep,

    // Loading states
    isSendingForgotPassword,
    isVerifyingOTP,
    isResendingOTP,
    isResettingPassword,

    // Errors
    forgotPasswordError,
    verifyOTPError,
    resendOTPError,
    resetPasswordError,

    // Reset functions
    resetForgotPassword,
    resetVerifyOTP,
    resetResendOTP,
    resetResetPassword,
  };
}
