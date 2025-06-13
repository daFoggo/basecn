"use client";

import { useCallback } from "react";
import {
  forgotPasswordService,
  IForgotPasswordParams,
  IResendOTPParams,
  IResetPasswordParams,
  IVerifyOTPParams,
} from "../services/forgot-password";

export function useForgotPassword() {
  const forgotPassword = useCallback(async (params: IForgotPasswordParams) => {
    return await forgotPasswordService.forgotPassword(params);
  }, []);

  const verifyOTP = useCallback(async (params: IVerifyOTPParams) => {
    return await forgotPasswordService.verifyOTP(params);
  }, []);

  const resendOTP = useCallback(async (params: IResendOTPParams) => {
    return await forgotPasswordService.resendOTP(params);
  }, []);

  const resetPassword = useCallback(async (params: IResetPasswordParams) => {
    return await forgotPasswordService.resetPassword(params);
  }, []);

  return {
    forgotPassword,
    verifyOTP,
    resendOTP,
    resetPassword,
  };
}
