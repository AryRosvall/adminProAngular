import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
export class User {
  constructor(
    public name: string,
    public email: string,
    public google?: boolean,
    public role?: string,
    public uid?: string,
    public img?: string,
    public password?: string,
  ) { }

  get imageUrl() {
    if (this.img) {
      return this.img.includes('http') ? this.img : `${base_url}/uploads/users/${this.img}`
    }
    return `${base_url}/uploads/users/no-img.jpg`
  }
}
