let baseUrl = "http://localhost:3000"

$(document).ready(function () {
  checkLogin()
})

function login(event) {
  event.preventDefault() //biar form gak refresh mulu
  let email = $("#login-email").val()
  let password = $("#login-password").val()
  $.ajax({
    url: `${baseUrl}/users/login`,
    method: "post",
    data: {
      email,
      password
    }
  })
    .done(data => {
      console.log(data, '<<<<<data login')
      localStorage.setItem('token', data.token)
      checkLogin() //cek function ceklogin, setelah berhasil login
    })
    .fail(err => {
      console.log(err.responseJSON.errors, '<<<<<err login')
      Swal.fire('error', err.responseJSON.errors.join(', '), 'error')
      // showError(err.responseJSON.errors)
    })
    .always(_ => {//biar datanya kosong lagi
      $("#login-email").val('')
      $("#login-password").val('')
    })
}

function checkLogin() {
  if (localStorage.token) { //penanda user login pakai token
    $("#home-page").show()
    $("#login-page").hide()
    $("#register-page").hide()
    $("#error").hide()
    fetchFood()
  } else {
    $("#home-page").hide()
    $("#login-page").show()
    $("#register-page").hide()
    $("#error").hide()
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
    url: `${baseUrl}/users/register`,
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
      showError(err.responseJSON.errors)
    })
    .always(_ => {//biar datanya kosong lagi
      $("#register-email").val('')
      $("#register-password").val('')
    })
}

function onSignIn(googleUser) {
  var tokenGoogle = googleUser.getAuthResponse().id_token;
  console.log(tokenGoogle)
  //kirim id_token google ke backend
  $.ajax({
    url: baseUrl + '/users/googleSign',
    method: 'POST',
    data: {
      tokenGoogle
    }
  })
    .done(res => {
      console.log(res, '<<<hasil token generate by server aslinya mah token google')
      localStorage.setItem('token', res.token)
      // checkLogin() //cek function ceklogin, setelah berhasil login
    })
    .fail(err => {
      console.log(err)
    })
}

function addSearchFood() {
  let keyword = $('#search-food').val()
  $.ajax({
    url: `${baseUrl}/search-food/${keyword}`, //router.get('/search-food/:keyword', searchFood)
    method: 'get',
    headers: {
      token: localStorage.token
    }
  })
    .done(data => {
      console.log(data.restaurants, '<<<<<data todo')
      $('#container-search').empty()
      data.restaurants.forEach(el => {
        $('#container-search').append(`
        <li>
          <label>Restaurant Name : ${el.name}</label><br>
          <label>Link : ${el.url}</label><br>
          <label>Address : ${el.location.address}</label><br>
          <label>Photos : ${el.images}</label><br>
          <label>Menus : ${el.menus}</label><br>
          <label>Weather : ${el.weather.description}</label><br>
          <label>Logo : ${el.weather.imageUrl}</label><br>
        </li><br>
        `)
      });
    })
    .fail(err => {
      console.log(err.responseJSON.errors, '<<<<<err data todo')
      showError(err.responseJSON.errors)
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