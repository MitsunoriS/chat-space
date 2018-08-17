$(document).on('turbolinks:load', function(){
  $(function() {
    var searchResult = $('#user-search-result');
    var addedUsers = $('#chat-group-users'); //追加されたuser

    function appendUser(user) {
      var html =
      `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${ user.name }</p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
       </div>`
      searchResult.append(html);
    }

    function appendNoUser(user) {
      var html =
      `<div class="chat-group-user clearfix">
         <p>${ user }</p>
       </div>`
       searchResult.append(html);
    }

    function appendToMember(user_name, user_id) {
      var html =
      `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ user_id }'>
         <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
         <p class='chat-group-user__name'>${ user_name }</p>
         <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
      </div>`
      addedUsers.append(html)
    }

    $("#user-search-field").on('keyup', function(){
      var input = $(this).val();
      // console.log(input);
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json',
      })
      .done(function(users){
        $('#user-search-result').empty();
        if (users.length !== 0 ) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendNoUser('該当するユーザーがいません');
        }
      })
      .fail(function(){
        alert('ユーザー検索に失敗しました');
      })
    });

    $('#user-search-result').on('click', '.chat-group-user__btn--add', function(){
      var user_name = $(this).data('user-name');
      var user_id = $(this).data('user-id');
      appendToMember(user_name, user_id);
      $(this).parent().remove();
    });

    $('#chat-group-users').on('click', '.js-remove-btn', function(){
      $(this).parent().remove();
    });
  });
});
