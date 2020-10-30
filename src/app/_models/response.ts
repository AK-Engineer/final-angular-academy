export interface ResponseModel {
  user: {
    firstname: string;
    lastname: string;
    username: string;
    id: string;
  };
  jwt?: string;
}
