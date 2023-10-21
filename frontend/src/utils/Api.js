
import { url } from './constants';

class Api {
    constructor({ link }) {
        this._link = link;
    }

    _answerServer(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`код ошибки: ${res.status}`);
        }
    }

    getInitialCards() {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._link}cards`, {
            headers: { authorization: `Bearer ${token}` },
        })
            .then(res => { return this._answerServer(res); })
    }

    addNewCard({ name, link }) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._link}cards`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => { return this._answerServer(res); })
    }

    deleteCard(cardId) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._link}cards/${cardId}`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
        })
            .then(res => { return this._answerServer(res); })
    }

    getUserData() {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._link}users/me`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => { return this._answerServer(res); })
    }

    sendUserData({ name, about }) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._link}users/me`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'PATCH',
            body: JSON.stringify({ name, about })
        })
            .then(res => { return this._answerServer(res); })
    }

    sendAvatarData(avatarLink) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._link}users/me/avatar`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'PATCH',
            body: JSON.stringify({ avatar: avatarLink.avatar })
        })
            .then(res => { return this._answerServer(res); })
    }

    putCardLike(cardId) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._link}cards/${cardId}/likes`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'PUT',
        })
            .then(res => { return this._answerServer(res); })
    }

    deleteCardLike(cardId) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._link}cards/${cardId}/likes`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
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
});


export default api;