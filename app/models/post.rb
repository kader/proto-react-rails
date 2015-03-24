class Post < ActiveRecord::Base
  mount_uploader :attachment, AttachmentUploader
end
