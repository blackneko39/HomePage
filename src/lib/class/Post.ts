import PostDetail from "./PostDetail";

export default class Post extends PostDetail {
    contentHtml : string

    constructor(slug: string, matterResult: any, contentHtml: string) {
      super(slug, matterResult)
      this.contentHtml = contentHtml;
    }
}