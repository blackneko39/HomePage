export default class PostDetail {
    slug: string
    title: string
    date: string
  
    constructor(slug: string, matterResult: any) {
      this.slug = slug;
      this.title = matterResult.title;
      this.date = matterResult.date;
    }
  }