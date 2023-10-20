function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onCloseClick}>
            <div className="popup__information">
                <img className="popup__state" src={props.image} alt={props.title} />
                <h2 className="popup__message">{props.title}</h2>
                <button className="popup__close-button" type="button" title="Закрыть" onClick={props.onClose} />
            </div>
        </div>
    );
}

export default InfoTooltip;