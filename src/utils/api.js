class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Erro: ${res.status}`);
    }

    return res.json().catch(() => ({}));
  }

  _request(endpoint, options = {}) {
    const token = localStorage.getItem("jwt");
    const config = {
      method: options.method || "GET",
      headers: {
        ...this._headers,
        ...(token ? { authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    };

    if (options.body) {
      config.headers["Content-Type"] = "application/json";
      config.body = JSON.stringify(options.body);
    }

    return fetch(`${this._baseUrl}${endpoint}`, config).then((res) =>
      this._handleResponse(res),
    );
  }

  getUserInfo() {
    return this._request("/users/me");
  }

  getInitialCards() {
    return this._request("/cards");
  }

  editUserInfo(name, about) {
    return this._request("/users/me", {
      method: "PATCH",
      body: { name, about },
    });
  }

  addCard(name, link) {
    return this._request("/cards", {
      method: "POST",
      body: { name, link },
    });
  }


  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  unlikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.likeCard(cardId);
    } else {
      return this.unlikeCard(cardId);
    }
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  setUserAvatar(data) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: data,
    });
  }
}

const api = new Api(import.meta.env.VITE_API_URL, {
  "Content-Type": "application/json",
});

export default api;
