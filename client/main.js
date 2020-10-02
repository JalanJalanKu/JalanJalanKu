const baseurl = "http://localhost:3000"


$(document).ready(function () {
  checkLogin()
})


function login(event) {
  event.preventDefault()
  let email = $("#email").val()
  let password = $("#password").val()
  console.log(email, password)
  $.ajax({
    url: `${baseurl}/users/login`,
    method: "post",
    data: {
      email,
      password
    }
  })
    .done(data => {
      console.log(data);
      localStorage.setItem("token", data.token)
      checkLogin()
    })
    .fail(err => {
      console.log(err);
    })
}

function checkLogin() {

  if (localStorage.token) { //penanda user login pakai token
    $("#home-page").show()
    $("#login-page").hide()
    $("#register-page").hide()
    $("#error").hide()
    $('#quotes').show()
    // fetchFood()
  } else {
    $("#home-page").hide()
    $("#login-page").show()
    $("#register-page").hide()
    $("#error").hide()
    $('#quotes').hide()
  }
}

function checkRegister() {
  checkLogin()
  $("#register-page").show()
  $("#login-page").hide()
}

function register(event) {
  event.preventDefault() //biar form gak refresh mulu
  let email = $("#register-email").val()
  let password = $("#register-password").val()
  $.ajax({
    url: `${baseurl}/users/register`,
    method: "post",
    data: {
      email,
      password
    }
  })
    .done(data => {
      console.log(data, '<<<<<data register')
      // localStorage.setItem('token', data.token)
      checkLogin() //cek function ceklogin, setelah berhasil register
    })
    .fail(err => {
      console.log(err.responseJSON.errors, '<<<<<err register')
      // showError(err.responseJSON.errors)
      Swal.fire('Already registered', 'error')
    })
    .always(_ => {//biar datanya kosong lagi
      $("#register-email").val('')
      $("#register-password").val('')
    })
}

function logout() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });

  localStorage.clear()
  checkLogin()
}

//buat todonya
// $(document).ready(function () {
//   $('#add-todo').click(function () {
//     $('#todo').append("<li>" + $("input[name=task]").val() + " <a href='#' class='close' aria-hidden='true'>&times;</a></li>");
//   });
//   $("body").on('click', '#todo a', function () {
//     $(this).closest("li").remove();
//   });
// });

// function getData() {
//   $.ajax({
//     url: `${baseurl}/todos`,
//     method: "get",
//     headers: {
//       token: localStorage.token
//     }
//   })
// <<<<<<< HEAD
//     .fail(err => {
//       console.log(err)
//     })
// }

function quotes() {
  //$('#quotes').append(`${data.quote}`) //author, quote
  $.ajax({
    url: `${baseurl}/quotes`,
    method: 'get'
  })
    .done(data => {
      console.log(data, "<<<<ini data quotes")
      $('#quotes').append(`<h5 id="quotes">${data.quote}</h5>`) //author, quote
    })
    .fail(err => {
      console.log(err);
    })
}

function addSearchFood(event) {//search-food/:keyword
  event.preventDefault()
  let keyword = $('#search-food').val()
  $.ajax({
    url: `${baseurl}/search-food/${keyword}`, //router.get('/search-food/:keyword', searchFood)
    method: 'get',
    headers: {
      token: localStorage.token
    }
  })
    .done(data => {
      console.log(data.data), '<<<search food';
      $('#container-search').empty()
      data.restaurants.forEach(el => {
        $('#container-search').append(`
        <div class="col-3 mt-3">
        <div class="card">
          <img class="card-img-top" src="${el.images}">
          <div class="card-body">
            <h5 class="card-title">${el.name}</h5>
            <p class="card-text">${el.location.address}</p>
            <p class="card-text">${el.weather.description}</p>
            <img class="card-img-top" src="${el.weather.imageUrl}">
            <a href="${el.url}" class="btn btn-primary">LINK</a>
            
          </div>
        </div>
        </div>`)
      })
    })
    .fail(err => {
      console.log(err);
    })
}