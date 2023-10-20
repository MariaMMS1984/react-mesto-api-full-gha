function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} popup_delete ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__content popup__content_${props.name}`}>
                <button onClick={props.onClose} type="button" className="popup__close-button"></button>
                <h3 className="popup__title">{props.title}</h3>
                <form action="#" className="popup__container" id={props.name} onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" className="popup__save-button">
                        {props.buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;


