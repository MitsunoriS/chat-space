$(function(){
  function buildHTML(message){
    if (message.image) {
      var post_url = `<img class="lower-message__image", src= '${message.image}'>`
    }
    else {
      var post_url = `<div class="lower-message__image">`
    }
      var html = `<div class="message" data-message-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${ message.user_name }
                      </div>
                      <div class="upper-message__date">
                        ${ message.time }
                      </div>
                    </div>
                    <div class="lower-meesage">
                      <div class="lower-message__content">
                        ${ message.message }
                      </div>
                      ${ post_url }
                      </div>
                    </div>
                  </div>`
      return html;
  }

  function scroll_to_bottom(){
    $('.body').animate({scrollTop: $('.body')[0].scrollHeight}, 500);
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.body').append(html)
      $('.new_message')[0].reset()
      $('.send_button').prop('disabled', false)
      scroll_to_bottom();
    })
    .fail(function() {
      alert('error');
    });
  });


// メッセージ自動更新機能
 $(window).on('load', function() {
    if(document.URL.match('messages')) {
      setInterval(update_msg, 5000 );
    }
  });

  function update_msg() {
    var message_id = $('.message').last().data('messageId');
    if (message_id) {
      $.ajax({
        url: location.href,
        type: "GET",
        data: { id: message_id },
        dataType: 'json'
      })
      .done(function(data) {
        var html = '';
        data.forEach(function(message){
          if (message.id > message_id) {
            html += buildHTML(message);
          }
          $('.body').append(html);
        });
      })
      .fail(function(data) {
        alert('自動更新に失敗しました')
      })
    } else {
      clearInterval(interval);
    }
    scroll_to_bottom();
  }
});
