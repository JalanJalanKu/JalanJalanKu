const baseurl = "http://localhost:3000"


$(document).ready(function () {
    checkLogin()
})


function login(event) {
    event.preventDefault()
    let email = $("#email").val()
    let password = $("#password").val()
    console.log(email,password)
    $.ajax({
        url : `${baseurl}/login`,
        method : "post",
        data : {
            email , 
            password
        }
    })
    .done(data => {
        console.log(data);
        localStorage.setItem("token", data.token)
        checkLogin()
    })
    .fail(err => {
        console.log(err.responseJSON.err);
    })
}

function checkLogin() {
    if (localStorage.token) {
        $('#homepage').show()
        $('#login_page').hide()
        $('#register_page').hide()
        getData()
    } else {
        $('#homepage').hide()
        $('#login_page').show()
        $('#register_page').show()
    }
}

function logout() {
    localStorage.clear()
    checkLogin()
}

//buat todonya
$(document).ready(function () {
    $('#add-todo').click(function () {
        $('#todo').append("<li>" + $("input[name=task]").val() + " <a href='#' class='close' aria-hidden='true'>&times;</a></li>");
    });
    $("body").on('click', '#todo a', function () {
        $(this).closest("li").remove();
    });
});

function getData() {
    $.ajax({
        url : `${baseurl}/todos`,
        method : "get",
        headers : {
            token : localStorage.token
        }
    })
    .done(data =>{
        console.log(data.data);
        data.data.forEach(x => {
            $('#todo').append(`
            <tr>
            <td style="font-family: 'Tangerine', serif; font-size:35px;">${x.title}</td>
            <td style="font-family: 'Tangerine', serif; font-size:35px;">${x.description}</td>
            <td style="font-family: 'Tangerine', serif; font-size:35px;">
            <button>Done</button>
            <button>Edit</button>
            <a href='#'><button>Delete</button></a>
            </td>
            </tr>`)
        })
    })
    .fail(err => {
        console.log(err);
    })
}