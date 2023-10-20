import React from 'react';
import api from '../utils/Api';
import { useState, useEffect } from 'react';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUsercontext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const cards = props.cards;


    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-area">
                    <img className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} />
                    <div onClick={props.onEditAvatarClick} className="profile__avatar-edit" />
                </div>
                <div className="profile__info">
                    <div className="profile__wrapper">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button onClick={props.onEditProfileClick} className="profile__edit-button" type="button">
                        </button>
                    </div>
                    <p className="profile__profession">{currentUser.about}</p>
                </div>
                <button onClick={props.onAddPlaceClick} className="profile__add-button" type="button">
                </button>
            </section>
            <section className="elements">
                {cards.map((card) => (
                    <Card
                        onCardClick={props.onCardClick}
                        onCardDelete={props.onCardDelete}
                        onCardLike={props.onCardLike}
                        card={card}
                        name={card.name}
                        link={card.link}
                        like={card.likes}
                        likes={card.likes.length}
                        key={card._id}
                    />
                ))}
            </section>

        </main>
    );
}

export default Main; 