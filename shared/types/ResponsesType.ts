export type AuthResponseType = {
  userInfo: {
    id: string;
    email: string;
    plan_id: string;
  };
  access_token: string;
};
