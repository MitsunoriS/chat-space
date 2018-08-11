json.user_name @message.user.name
json.time @message.created_at.to_s(:datetime)
json.message @message.body
# json.message_id @message.id
json.image @message.image

