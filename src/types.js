// @flow

export type Role = {
  name: string,
  action: string
};

export type Movie = {
  name: string,
  roles: Array<Role>
};
