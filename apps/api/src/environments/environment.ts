export type Environment = {
  production: boolean;
  jwtSecret: string;
};
export const environment: Environment = {
  production: false,
  jwtSecret: 'some random secret :)',
};
