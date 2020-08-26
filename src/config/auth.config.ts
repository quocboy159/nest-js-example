import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  domain: process.env.AUTH_DOMAIN ?? 'dev-no8d86z9.us.auth0.com',
  clientId:
    process.env.AUTH_CLIENT_ID ??
    '1053368472351-3qdcangts4lqpdqn3p6mp0mvjic1sdlf.apps.googleusercontent.com',
  clientSecret: 'v4v9lsyRaXBFhJkjuCViY0zR',
  callbackUrl:
    process.env.AUTH_CALL_BACK_URL ??
    'http://localhost:3000/api/auth/google/callback',
  successUrl:
    process.env.AUTH_SUCCESS_URL ?? 'http://localhost:3001/login/success', // FOR FE
  failureUrl:
    process.env.AUTH_FAILURE_URL ?? 'http://localhost:3001/login/failure', // FOR FE
  jwtSecrectKey:
    process.env.AUTH_JWT_SECRET_KEY ??
    'SeVz8kiHPesfSitH62HvUJLtvVfe42KWjJWgvM6DmJ5Wx+VBGue5x14y5oLs73u8IB2mnRzcOc64rBWkMIt6ipBTWL+RCbDjTPXOZnqgg7IYNpKrx3cKT3hRnnLSqEbaf2rssUuC0mZyKYf7gq1ezV3+xAnIcjh1CyxqrpGDG2V+30ELgf31OFqxW3C0q+ksJgMyw5AqzfaRv5SAsb/28oNF9l919H5DmtpSkQAfJVR0wAqfM+C1KWQhjzlf2nF2Lhca2rkD5z9x3Tl6HUxqrWWIE10+Xh/uo0S/uXz1lDH7O/cfEddCHJxTG+b5UaRlAVhNspljMXmEOZNA66+TKw==',
}));
