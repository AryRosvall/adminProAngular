export class User {
  constructor(
    public name: string,
    public email: string,
    public google?: boolean,
    public role?: string,
    public uid?: string,
    public password?: string,
  ) {

  }
}