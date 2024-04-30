export default class Profile {
    firstname: string;
    lastname: string;
    img: string;
    usual: string[];
    qualification:  string[]

    constructor(firstname: string, lastname: string, img: string, usual: string[], qualification: string[]) {
      this.firstname = firstname;
      this.lastname = lastname;
      this.img = img;
      this.usual = usual;
      this.qualification = qualification;
    }
}