// @flow

export type Role = {
  name: string,
  actor: string
};

export type Movie = {
  name: string,
  roles: Array<Role>
};

export type ActorDataItem = {
  actor: string,
  role: string,
  movie: string
};

export type ActorData = {
  actor: string,
  roles: Array<string>
};
