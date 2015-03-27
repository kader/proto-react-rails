### A REACT PROTOTYPE

This is a prototype which use react-rails gem with rails 4.1.9.

## Installation

```ruby
rails new proto_react_rails
```

## Generate a scaffold model
I used scaffold genarator for a quick start:
```ruby
rails g scaffold Post title:string content:text attachment:string media:string
```
Fix your config/routes.rb to go to the home page, by changing to:
```ruby
root "posts#index"
```

## Add react-rails to your gemfile

Gemfile:
```ruby
gem "react-rails", github: "reactjs/react-rails", branch: "master"
gem "showdown-rails"
```
And let's add the assets to application.js file:
```ruby
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require showdown
//= require react
//= require_tree .
```

## Use carrierwave to attach to post

Gemfile:
```ruby
gem 'carrierwave'
```
And restart your rails server.
To generate an uploader for attachment:
```ruby
rails g uploader Attachment
```
Open your model file and mount this uploader:
```ruby
mount_uploader :attachment, AttachmentUploader
```

## Add bootstrap-saas gem
Gemfile:
```ruby
gem "bootstrap-sass"
gem "autoprefixer-rails"
```
Rename app/assets/stylesheets/application.css to application.css.scss and change it to the following:
```ruby
@import "bootstrap-sprockets";
@import "bootstrap";
```
Note that, when you want to use any classes in react component files(jsx), you have to rename html class with "className" instead of "class". Like that:
```html
<div className="panel-body">
</div>
```

## Prepare React component
At this prototype, I use post model, so rename
```ruby
app/assets/javascripts/posts.js.coffee
```
to
```ruby
app/assets/javascripts/posts.js.jsx
```
Now, you can write react in this file, anymore.


## List and create posts with react
To list posts at root page with react, copy
```ruby
/app/views/posts/index.html.erb
```
to your root file. Copy
```ruby
/app/assets/javascripts/posts.js.jsx
```
to your component file and make necessary changes.

There is a script tag in my app/views/posts/index.html.erb file. I call "postsCreator" function to list posts in the "div#content". Be sure that,
```ruby
<div id="content"></div>
```
rendered when you call "postsCreator" function.
If you call this function at app/assets/javascripts/posts.js.jsx, call like that:
```ruby
$( document ).ready(function() {
  $(function() {
    React.render(
      <Posts url="posts.json" />,
      document.getElementById("content")
    )
  });
});
```


## Some notes about file upload with ajax and render with react.

I used FormData with ajax file upload. Generate a formData append all these which you send.
Be sure that, you set processData, contentType, dataType
```ruby
processData: false,
contentType: false,
dataType: 'json'
```
To render post's title:
```ruby
{this.props.title}
```
And post's attachment (image for example):
```ruby
{this.props.attachment.url}
```
After a post is created, ajax will return success message and the new post (data). At this point I call:
```ruby
this.props.onNewPost(data);
```
This call "addPost" function to add this new post to posts-list. To manipulate posts-list:
```ruby
var updatedPosts = this.state.posts.slice();
updatedPosts.push(post);
this.setState({posts: updatedPosts});
```
React will rerender posts-list after you change state.