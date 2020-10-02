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
    // fetchFood()
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
      console.log(data.data);
      $('#container-search').empty()
      data.restaurants.forEach(el => {
        $('#container-search').append(`
            <tr>
            <td style="font-family: 'Tangerine', serif; font-size:35px;">Restaurant Name : ${el.name}</td>
            <td style="font-family: 'Tangerine', serif; font-size:35px;">Link : ${el.url}</td>
            <td style="font-family: 'Tangerine', serif; font-size:35px;">Address : ${el.location.address}</td>
            <td style="font-family: 'Tangerine', serif; font-size:35px;">Photos : ${el.images}</td>
            <td style="font-family: 'Tangerine', serif; font-size:35px;">Menus : ${el.menus}</td>
            <td style="font-family: 'Tangerine', serif; font-size:35px;">Weather : ${el.weather.description}</td>
            <td style="font-family: 'Tangerine', serif; font-size:35px;">Logo : </label><img src="${el.weather.imageUrl}</td>
            </td>
            </tr>`)
      })
    })
    .fail(err => {
      console.log(err);
    })
}