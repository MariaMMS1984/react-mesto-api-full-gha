function ImagePopup(props) {
    return (
        <div className={`popup popup_type_img imagepopup popup_delete ${props.card ? 'popup_opened' : ''}`}>
            <div className="popup__imgcontent">
                <h2 className="popup__imgtitle">{props.card ? props.card.name : ''}</h2>
                <img className="popup__image" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''} />
                <button className="popup__close-button" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup;


