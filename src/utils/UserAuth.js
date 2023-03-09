class UserAuth {
  constructor(config) {
    this._url = config.BASE_URL;
    this._headers = config.headers;
  }

  _getResponse(response) {
    return response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);
    // if (response.ok) {
    //   return response.json();
    // }
    // return Promise.reject(`Ошибка: ${response.status}`);
  }

  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
    .then(this._getResponse)
  }

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
    .then(this._getResponse)
  }

  getContent(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._getResponse)
  }
}

const userAuth = new UserAuth({
  BASE_URL: 'https://auth.nomoreparties.co/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default userAuth;
