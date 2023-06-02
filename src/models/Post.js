
class Post {
  constructor( post_id, user_id, img, title, description, viewCounts){
    this.post_id = post_id;
    this.user_id = user_id;
    this.img = img;
    this.title = title;
    this.description = description;
    this.viewCounts = viewCounts;
  }
}

module.exports = Post;