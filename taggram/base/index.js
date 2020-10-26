(function (apiUrl) {
  function getMe() {
    return fetch(apiUrl + "/me")
      .then(function (response) {
        return response.json();
      })
      .then(function (user) {
        const $username = document.getElementById("current-user-username");
        const $avatar = document.getElementById("current-user-avatar");
        // console.log($avatar)
        $username.innerHTML = user.username;

        if (user.avatar) {
          $avatar.style.backgroundImage = "url('" + user.avatar + "')";
        }
      });
  }

  function getPost() {
    return fetch(apiUrl + "/post")
      .then(function (response) {
        return response.json();
      })
      .then(function (post) {
        // console.log(post.user)
        // console.log(post.user.username)
        // console.log(post.user.avatar)
        const $photo = document.getElementById("current-post-photo");
        const $avatar = document.getElementById("current-post-avatar");
        const $username = document.getElementById("current-author-name");
        const $location = document.getElementById("current-author-location");
        const $comments = document.getElementById("current-post-comments");
        const $commentsCount = document.getElementById("comments-count");
        const $datePhoto = document.getElementById("current-post-date");
        
        function qualMes(dateView) 
       { switch (dateView) {
          case "01":
            return "Janeiro";
          case "02":
            return "Fevereiro";
          case "03":
            return "Março";
          case "04":
            return "Abril";
          case "05":
            return "Maio";
          case "06":
            return "Junho";
          case "07":
            return "Julho";
          case "08":
            return "Agosto";
          case "09":
            return "Setembro";
          case "10":
            return "Outubro";
          case "11":
            return "Novembro";
          case "12":
            return "Dezembro";
          return "";}
        }

        $location.innerHTML = post.location.city + ", " + post.location.country;

        $commentsCount.innerHTML = `${post.comments.length} comentários`;
        console.log(post.created_at);
        // console.log([post]);
        const dayView = post.created_at.substring(8,10)
        const dateView = post.created_at.substring(5,7)
        
        console.log(qualMes(dateView))
        var comentarios = post.comments;
        $datePhoto.innerHTML = dayView + " de " + qualMes(dateView)

        comentarios.forEach((comentario) => {
          date = new Date(comentario.created_at);
          year = date.getFullYear();
          month = date.getMonth() + 1;
          dt = date.getDate();

          if (dt < 10) {
            dt = "0" + dt;
          }
          if (month < 10) {
            month = "0" + month;
          }
          var commentDate = year + "-" + month + "-" + dt;
          var commentDateFromNow = moment(commentDate).fromNow();

          $comments.innerHTML += `
        <div class="comment">
          <div class="comment-author">
            <div style="background-image: url(${comentario.user.avatar})" class="comment-author-img" id="comment-author-img">
            </div>
            </div>
          <div class="comment-message-date">
            <div class="comment-message">
            <b>${comentario.user.username}</b> ${comentario.message}
            </div>
            <div class="comment-date">
              ${commentDateFromNow}
            </div>
          </div>
        </div>
          `;
        });
        $username.innerHTML = post.user.username;

        if (post.photo) {
          $photo.style.backgroundImage = "url('" + post.photo + "')";
        }
        if (post.user.avatar) {
          $avatar.style.backgroundImage = "url('" + post.user.avatar + "')";
        }
      });
  }

  function initialize() {
    getMe();
    getPost();
  }

  initialize();
})("https://taggram.herokuapp.com");
