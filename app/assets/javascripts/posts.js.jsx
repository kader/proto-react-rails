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

var Posts = React.createClass({
  render: function() {
    var posts = this.props.posts;
    console.log(posts);
    return (
      <ul class="posts">
        {posts.map(function(post){
          return <PostEl title={post.title} content={post.content} />
        })}
      </ul>
    )
  }
});

