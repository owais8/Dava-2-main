import { z } from 'zod';

import {
  CodeSchema,
  EmailSchema,
  FileImageSchema,
  PasswordSchema,
  ReasonSchema,
  RoleSchema,
} from '@/schemas';

// ----------- Login --------------
export const LoginReqSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const LoginReq = LoginReqSchema.extend({
  expiresInMins: z.number().int().positive().default(5),
});

export type TLoginReq = z.infer<typeof LoginReqSchema>;

//----------- Register --------------
export const RegisterReqSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const RegisterReq = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export type TRegisterReq = z.infer<typeof RegisterReqSchema>;

// ----------- Forgot Password --------------
export const ForgotPasswordReqSchema = z.object({
  email: EmailSchema,
});

export const ForgotPasswordReq = ForgotPasswordReqSchema.extend({});

export type TForgotPasswordReq = z.infer<typeof ForgotPasswordReqSchema>;

//----------- Reset Password --------------
export const ResetPasswordReqSchema = z
  .object({
    password: PasswordSchema,
    newPassword: PasswordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const ResetPasswordReq = ResetPasswordReqSchema;

export type TResetPasswordReq = z.infer<typeof ResetPasswordReqSchema>;

//----------- Refresh Token --------------

export const RefreshTokenReqSchema = z.object({
  refreshToken: z.string(),
});

export const RefreshTokenReq = RefreshTokenReqSchema.extend({});

//----------- Auth Info --------------
export const AuthInfoReqSchema = z.object({
  token: z.string(),
});

export type TAuthInfoReq = z.infer<typeof AuthInfoReqSchema>;

//----------- Verify Email --------------
export const VerifyEmailReqSchema = z.object({
  code: CodeSchema,
});

export const VerifyEmailReq = VerifyEmailReqSchema.extend({});

export type TVerifyEmail = z.infer<typeof VerifyEmailReqSchema>;

//----------- Verify Workspace --------------
export const VerifyWorkspaceReqSchema = z.object({
  code: CodeSchema,
});

export const VerifyWorkspaceReq = VerifyWorkspaceReqSchema.extend({});

export type TVerifyWorkspace = z.infer<typeof VerifyWorkspaceReqSchema>;

//----------- Request Role --------------
export const RequestAccessRoleReqSchema = z.object({
  role: RoleSchema,
  reason: ReasonSchema,
});

export const RequestAccessRoleReq = RequestAccessRoleReqSchema.extend({});

export type TRequestAccessRole = z.infer<typeof RequestAccessRoleReqSchema>;

//----------- Request Role --------------
export const ProfileReqSchema = z.object({
  avatar: FileImageSchema,
  fullname: z.string().min(1, 'Full name is required'),
  timeZone: z.string().min(1, 'Time zone is required'),
});

export const ProfileReq = ProfileReqSchema.extend({});

export type TProfile = z.infer<typeof ProfileReqSchema>;

//----------- Workspace Create --------------
export const WorkspaceCreateReqSchema = z.object({
  workspaceName: z.string().min(1, 'Workspace name is required'),
  workspaceUrl: z.string().min(1, 'Workspace URL is required'),
  industry: z.string().min(1, 'Industry is required'),
});

export const WorkspaceCreateReq = WorkspaceCreateReqSchema.extend({});

export type TWorkspaceCreate = z.infer<typeof WorkspaceCreateReqSchema>;

//----------- Workspace Invite --------------
export const WorkspaceInviteMemberReqSchema = z.object({
  email: EmailSchema,
  role: RoleSchema,
});

export const WorkspaceInviteMembersReqSchema = z.object({
  members: z.array(WorkspaceInviteMemberReqSchema),
});

export const WorkspaceInviteMemberReq = WorkspaceInviteMembersReqSchema.extend({});

export type TWorkspaceInviteMember = z.infer<typeof WorkspaceInviteMemberReqSchema>;
export type TWorkspaceInviteMembers = z.infer<typeof WorkspaceInviteMembersReqSchema>;
