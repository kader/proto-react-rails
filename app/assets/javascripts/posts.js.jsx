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

var converter = new Showdown.converter();

var Post = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <div className="Post">
        <h2 className="postTitle">
          {this.props.title}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

var PostBox = React.createClass({
  loadPostsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handlePostSubmit: function(post) {
    var posts = this.state.data;
    posts.push(post);
    this.setState({data: posts}, function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: { post: post },
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadPostsFromServer();
    setInterval(this.loadPostsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="postBox">
        <h1>Posts</h1>
        <PostList data={this.state.data} />
        <PostForm onPostSubmit={this.handlePostSubmit} />
      </div>
    );
  }
});

var PostList = React.createClass({
  render: function() {
    var postNodes = this.props.data.map(function(post, index) {
      return (
        <Post title={post.title} key={index}>
          {post.content}
        </Post>
      );
    });
    return (
      <div className="postList">
        {postNodes}
      </div>
    );
  }
});

var PostForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var title = this.refs.title.getDOMNode().value.trim();
    var content = this.refs.content.getDOMNode().value.trim();
    if (!content || !title) {
      return;
    }
    this.props.onPostSubmit({title: title, content: content});
    this.refs.title.getDOMNode().value = '';
    this.refs.content.getDOMNode().value = '';
  },
  render: function() {
    return (
      <form className="postForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="title" ref="title" />
        <input type="text" placeholder="content" ref="content" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

$(function() {
  var $content = $("#content");
  if ($content.length > 0) {
    React.render(
      <PostBox url="posts.json" pollInterval={2000} />,
      document.getElementById('content')
    );
  }
});
