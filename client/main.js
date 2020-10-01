let baseUrl = "http://localhost:3000"

function checkLogin() {
  // if (localStorage.token) { //penanda user login pakai token
  //   $("#home-page").show()
  //   $("#login-page").hide()
  //   $("#add-page").hide()
  //   $("#error").hide()
  //   fetchTodo()
  // } else {
  //   $("#home-page").hide()
  //   $("#login-page").show()
  //   $("#add-page").hide()
  //   $("#error").hide()
  // }
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