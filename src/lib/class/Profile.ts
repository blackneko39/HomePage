export default class Profile {
    firstname: string;
    lastname: string;
    img: string;
    usual: string[];
    quali:  string[]

    constructor(firstname: string, lastname: string, img: string, usual: string[], quali: string[]) {
      this.firstname = firstname;
      this.lastname = lastname;
      this.img = img;
      this.usual = usual;
      this.quali = quali;
    }
}