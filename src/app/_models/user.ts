export class User {

  constructor(
    public id: string,
    public username: string,
    public firstname: string,
    public lastname: string,
    public jwt: string,
    public password?: string
    ){}


}
