json.array! @new_messages do |message|
  json.id           message.id
  json.user_name    message.user.name
  json.time         message.created_at.to_s(:datetime)
  json.message      message.body
  json.image        message.image.url
end
