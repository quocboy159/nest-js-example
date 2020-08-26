import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  clientId: process.env.AUTH_CLIENT_ID,
  clientSecret: process.env.AUTH_CLIENT_SECRECT,
  callbackUrl: process.env.AUTH_CALL_BACK_URL,
  successUrl: process.env.AUTH_SUCCESS_URL, // FOR FE
  failureUrl: process.env.AUTH_FAILURE_URL, // FOR FE
  jwtSecrectKey: process.env.AUTH_JWT_SECRET_KEY,
}));
