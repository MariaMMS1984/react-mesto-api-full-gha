
import { token, url } from './constants';

class Api {
    constructor({ link, headers }) {
        this._link = link;
        this._headers = headers;
    }

    _answerServer(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`код ошибки: ${res.status}`);
        }
    }

    getInitialCards() {
        return fetch(`${this._link}cards`, {
            headers: this._headers

        })
            .then(res => { return this._answerServer(res); })
    }

    addNewCard({ name, link }) {
        return fetch(`${this._link}cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => { return this._answerServer(res); })
    }

    deleteCard(cardId) {
        return fetch(`${this._link}cards/${cardId}`, {
            headers: this._headers,
            method: 'DELETE',
        })
            .then(res => { return this._answerServer(res); })
    }

    getUserData() {
        return fetch(`${this._link}users/me`, {
            headers: this._headers

        })
            .then(res => { return this._answerServer(res); })
    }

    sendUserData({ name, about }) {
        return fetch(`${this._link}users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({ name, about })
        })
            .then(res => { return this._answerServer(res); })
    }

    sendAvatarData(avatarLink) {
        return fetch(`${this._link}users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({ avatar: avatarLink.avatar })
        })
            .then(res => { return this._answerServer(res); })
    }

    putCardLike(cardId) {
        return fetch(`${this._link}cards/${cardId}/likes`, {
            headers: this._headers,
            method: 'PUT',
        })
            .then(res => { return this._answerServer(res); })
    }

    deleteCardLike(cardId) {
        return fetch(`${this._link}cards/${cardId}/likes`, {
            headers: this._headers,
            method: 'DELETE',
        })
            .then(res => { return this._answerServer(res); })
    }

    toggleLike(cardId, isLiked) {
        if (isLiked) {
            return this.deleteCardLike(cardId);
        } else {
            return this.putCardLike(cardId);
        }
    }
}


const api = new Api({
    link: url,
    headers: {
        authorization: token,
        'Content-Type': 'application/json',
    }
});


export default api;