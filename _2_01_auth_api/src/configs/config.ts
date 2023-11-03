import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  [key: string]: string | undefined;
}

const env: EnvConfig = process.env;

interface AppConfig {
  name: string;
  apiURL: string;
  mode: string | undefined;
}

interface DatabaseConfig {
  host: string | undefined;
  user: string | undefined;
  database: string | undefined;
  password: string | undefined;
  port: number;
}

interface JwtConfig {
  secretAccess: string | undefined;
  secretRefresh: string | undefined;
  accessLife: string;
}

export const config = {
  app: {
    name: 'Auth API',
    apiURL: '',
    mode: env.NODE_ENV,
  } as AppConfig,
  port: env.PORT || 5000,
  db: {
    host: env.DB_HOST,
    user: env.DB_USER,
    database: env.DB_NAME,
    password: env.DB_PASSWORD || '',
    port: Number(env.DB_PORT),
  } as DatabaseConfig,
  jwt: {
    secretAccess: env.ACCESS_TOKEN_PRIVATE_KEY,
    secretRefresh: env.REFRESH_TOKEN_PRIVATE_KEY,
    accessLife: env.ACCESS_TOKEN_TTL || '1h',
  } as JwtConfig,
};