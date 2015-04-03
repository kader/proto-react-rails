window.postCreator = function(id, post){
  React.render(
    <PostEl title={post.title} content={post.content} attachment={post.attachment} />,
    document.getElementById(id)
  );
}

window.postsCreator = function(id, posts) {
  React.render(
    <Posts posts={posts} />,
    document.getElementById(id)
  )
}

var PostEl = React.createClass({
  render: function() {
    return (
      <li>
        <h3>{this.props.title}</h3>
        {this.props.content}
        <img height="200" width="200" src={this.props.attachment.url} />
      </li>
    );
  }
});

var NewPost = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault()

    var fileInput = document.getElementById('attachment');
    var file = fileInput.files[0];
    var formData = new FormData();

    var title = this.refs.title.getDOMNode().value.trim();
    var content = this.refs.content.getDOMNode().value.trim();
    var attachment = this.refs.attachment.getDOMNode().value.trim();

    this.refs.title.getDOMNode().value = "";
    this.refs.content.getDOMNode().value = "";
    this.refs.attachment.getDOMNode().value = "";

    formData.append("attachment", file);
    formData.append("title", title);
    formData.append("content", content);

    $.ajax({
      url: "/posts.json",
      dataType: "json",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      dataType: 'json',
      success: function(data) {
        this.props.onNewPost(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("error creating post", xhr, status, err);
      }.bind(this)
    });
  },
  render: function() {
    return (
      <form className="new-post" onSubmit={this.handleSubmit} encType="multipart/form-data">
        <label for="title">Title</label>
        <input type="text" ref="title" id="title" name="title" placeholder="title" />
        <label for="content">Content</label>
        <textarea name="content" ref="content" id="content" placeholder="content"></textarea>
        <input type="file" ref="attachment" id="attachment" name="attachment" />
        <button type="submit" >Submit</button>
      </form>
    )
  }
});

var Posts = React.createClass({
  getInitialState: function() {
    return {posts: this.props.posts}
  },
  addPost: function(post) {
    var updatedPosts = this.state.posts.slice();
    updatedPosts.push(post);
    this.setState({posts: updatedPosts});
  },
  render: function() {
    var posts = this.props.posts;
    return (
      <div>
        <ul class="posts">
          {this.state.posts.map(function(post){
            return <PostEl title={post.title} content={post.content} attachment={post.attachment} />
          })}
        </ul>
        <NewPost onNewPost={this.addPost}/>
      </div>
    )
  }
});

