$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `
          <div class="main__user-name">
            ${message.user_name}
          </div>
          <div class="main__user-name__date">
            ${message.created_at}
          </div>
          <div class="main__user-message">
            ${message.content}
          </div>
         <img src=${message.image} >
        ` 
      return html;
    } else {
      var html =
       `
          <div class="main__user-name">
            ${message.user_name}
          </div>
          <div class="main__user-name__date">
            ${message.created_at}
          </div>
          <div class="main__user-message">
            ${message.content}
          </div>
        `
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
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
    .done(function(data){
      var html = buildHTML(data);
       $('.main').append(html);
       $('.main').animate({ scrollTop: $('.main')[0].
       scrollHeight});
       $('form')[0].reset();
       $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});