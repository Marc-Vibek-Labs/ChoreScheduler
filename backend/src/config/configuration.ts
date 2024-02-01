import { development, production } from './database';

const experianConfig: Record<string, unknown> = {
  uatUri: process.env.EXPERIAN_UAT_URL,
  generateReportUri: process.env.GENERATE_REPORT_URL,
  httpConfig: {
    headers: {
      'Content-Type': 'application/xml',
    },
    auth: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    },
  },
};

export default () =>
  process.env.NODE_ENV === 'development'
    ? {
        database: { ...development() },
        experian: experianConfig,
      }
    : {
        database: { ...production() },
        experian: experianConfig,
      };
