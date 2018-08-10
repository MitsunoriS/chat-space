$(function(){
  function buildHTML(message){
      var html = `<div class="message">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${ message.user_name }
                      </div>
                      <div class="upper-message__date">
                        ${ message.time }
                      </div>
                    </div>
                    <div class="lower-meesage">
                      <p class="lower-message__content">
                      ${ message.message }
                      </p>
                      <div class="lower-message__image">
                        ${ message.image }
                      </div>
                    </div>
                  </div>`
      return html;
  }

  function scroll_to_bottom(){
    $('.body').animate({scrollTop: $('.body__chat_box')[0].scrollHeight}, 500);
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
      $('.body__chat_box').append(html)
      $('.new_message')[0].reset()
      scroll_to_bottom();
    })
    .fail(function() {
      alert('error');
    });
  });
});

