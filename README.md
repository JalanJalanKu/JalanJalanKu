###### API DOCUMENTATION

riankarya - nabilazora - bagasss19

### Register a new user, using app auth

> ###### POST  /users/register

```javascript
app.post('/users/register')
```

require body : email(string), password(string)

if one or more body field isn't filled or didnt meet the requirements, one of these error will be shown

```javascript
{"errors": "Email harus diisi"}
{"errors": "Format email salah"}
{"errors": "Password harus diisi"}
{"errors": "Password hanya boleh menggunakan huruf dan angka"}
```

if not, this call will return a new user object and saves it on database

### Login using app auth

> ###### POST /users/login

```javascript
app.post('/users/login')
```

require body: email(string), password(string)

if the input didnt match with the user's data on database, this call will return an error

```javascript
{"errors": "wrong email or password"}
```

and will return a token which will be passed to client

### Search restaurants using 3rd party API

> ###### GET /search-food/:keyword

```javascript
app.get('/search-food/:keyword')
```

require params: keyword(string)

- this call will get a data from 3rd party API which in this case we're using Zomato and returns an array of restaurant's object

- the location's weather will be shown using another 3rd party API; weatherbit

  ```javascript
  {
    "restaurants": [
      {
        "name": "Bakso Enggal Malang",
        "url": "https://www.zomato.com/bandung/bakso-enggal-malang-lengkong?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
        "location": {
          "address": "Jl. Burangrang No. 12, Lengkong, Bandung",
          "locality": "Lengkong",
          "city": "Bandung",
          "city_id": 11052,
          "latitude": "-6.9248925018",
          "longitude": "107.6197062805",
          "zipcode": "",
          "country_id": 94,
          "locality_verbose": "Lengkong, Bandung"
        },
        "images": "https://www.zomato.com/bandung/bakso-enggal-malang-lengkong/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
        "menus": "https://www.zomato.com/bandung/bakso-enggal-malang-lengkong/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
        "weather": { "description": "Scattered clouds", "imageUrl": "https://www.weatherbit.io/static/img/icons/c02d.png" }
      },
      {
        "name": "Bakso King",
        "url": "https://www.zomato.com/bandung/bakso-king-sukajadi?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
        "location": {
          "address": "Jl. Setiabudi No. 43, Sukajadi, Bandung",
          "locality": "Sukajadi",
          "city": "Bandung",
          "city_id": 11052,
          "latitude": "-6.8819634312",
          "longitude": "107.5997218117",
          "zipcode": "",
          "country_id": 94,
          "locality_verbose": "Sukajadi, Bandung"
        },
        "images": "https://www.zomato.com/bandung/bakso-king-sukajadi/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
        "menus": "https://www.zomato.com/bandung/bakso-king-sukajadi/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
        "weather": { "description": "Scattered clouds", "imageUrl": "https://www.weatherbit.io/static/img/icons/c02d.png" }
      }
    ]
  }
  ```

if user's token is not authenticated, this call will return an error

```javascript
{"errors": "Not Authenticated"}
```