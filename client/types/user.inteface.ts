export interface DateParams {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserType extends DateParams {
  Gitid: string;
  email: string;
  photoURL?: string;
}

export interface UserAuth extends UserType {
  token: string;
}
