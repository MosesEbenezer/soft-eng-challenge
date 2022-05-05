import * as dotenv from 'dotenv';
import * as fs from 'fs';

export interface EnvData {
  // application
  APP_ENV: string;
  APP_DEBUG: boolean;

  // database
  DB_TYPE: 'mysql' | 'mariadb';
  DB_HOST?: string;
  DB_USERNAME: string;
  DB_PORT?: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  SERVER_KEY: string;

  // SMTP Settings
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPass: string;
  secure: string;

  // Base Urlss
  BASE_URL: string;
  FRONT_END_BASE_URL: string;
  VERIFY_EMAIL_NOTN_LOGO: string;
}

export class EnvService {
  private vars: EnvData;

  constructor() {
    const environment = process.env.NODE_ENV || 'development';
    const env_file = fs.existsSync(`.${environment}.env`)
      ? `.${environment}.env`
      : `.env`;
    const data: any = dotenv.parse(fs.readFileSync(env_file));

    data.APP_ENV = environment;
    data.APP_DEBUG = data.APP_DEBUG === 'true' ? true : false;
    data.DB_PORT = parseInt(data.DB_PORT);

    this.vars = data as EnvData;
  }

  read(): EnvData {
    return this.vars;
  }

  isDev(): boolean {
    return this.vars.APP_ENV === 'development';
  }

  isProd(): boolean {
    return this.vars.APP_ENV === 'production';
  }
}
