import React from "react";
import cap from '../images/Vector__cut.svg';
import basKet from '../images/Vector__delete.svg';
import { CurrentUserContext } from '../contexts/CurrentUsercontext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const card = props.card;
    const isOwner = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const activeLikeButtonClassName = "card__like-button_active";

    function handleClick() {
        props.onCardClick(card);
    }

    function handleCardDelete() {
        props.onCardDelete(card);
    }

    function handleLikeClick() {
        props.onCardLike(card);
    }


    return (
        <div className="card">
            <img className="card__image" src={props.link} alt={props.name} onClick={handleClick} />
            {isOwner &&
                <div type="button" className="card__delete-button" onClick={handleCardDelete}>
                    <img src={cap} alt="крышка" />
                    <img src={basKet} alt="корзина" className="card__trashcan" />
                </div>}
            <div className="card__footer">
                <h2 className="card__title">{props.name}</h2>
                <button onClick={handleLikeClick} type="button" className={
                    "card__like-button " + (isLiked && activeLikeButtonClassName)
                }>
                    <p className="card__like-counter">{props.likes}</p>
                </button>
            </div>
        </div>
    );
}

export default Card;
