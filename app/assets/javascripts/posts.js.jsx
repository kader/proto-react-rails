/**
 * This file provided by Facebook is for non-commercial testing and evaluation purposes only.
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
window.postCreator = function(id, post){
  React.render(
    <PostEl title={post.title} content={post.content} />,
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
        <h2>{this.props.title}</h2>
        <p>{this.props.content}</p>
      </li>
    );
  }
});

var NewPost = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var title = this.refs.title.getDOMNode().value.trim();
    var content = this.refs.content.getDOMNode().value.trim();
    var attachment = this.refs.attachment.getDOMNode().value.trim();

    this.refs.title.getDOMNode().value = "";
    this.refs.content.getDOMNode().value = "";
    this.refs.content.getDOMNode().value = "";
    $.ajax({
      url: "/posts.json",
      dataType: "json",
      type: "POST",
      data: {post: {title: title, content: content}},
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
      <form class="new-post" onSubmit={this.handleSubmit} encType="multipart/form-data">
        <div class="form-group">
          <label for="title">Title</label>

          <input type="text" ref="title" id="title" class="form-control" name="title" placeholder="title" />
        </div>
        <div class="form-group">
          <label for="content">Content</label>
          <textarea name="content" ref="content" id="content" class="form-control" placeholder="content"></textarea>
        </div>
        <div class="form-group">
          <input type="file" ref="attachment" id="attachment" class="form-control" name="attachment" />
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
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
    console.log("rendering", this.props.posts);
    var posts = this.props.posts;
    return (
      <div>
        <ul class="posts">
          {this.state.posts.map(function(post){
            return <PostEl title={post.title} content={post.content} />
          })}
        </ul>
        <div class="post-form">
          <NewPost onNewPost={this.addPost}/>
        </div>
      </div>
    )
  }
});

