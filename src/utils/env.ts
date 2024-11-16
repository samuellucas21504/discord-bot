import dotenv from 'dotenv';

export class ENV {
  public static init() {
    dotenv.config({
      path: `.env.${process.env.NODE_ENV || 'development'}`,
    });
  }
}
