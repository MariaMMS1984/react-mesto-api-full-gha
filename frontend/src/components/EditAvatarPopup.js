import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const refInput = React.useRef();

    function handleSubmit(event) {
        event.preventDefault();

        props.onUpdateAvatar({
            avatar: refInput.current.value,
        });
    }

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            buttonText={'Сохранить'}
        >

            <input
                ref={refInput}
                type="url"
                name="avatar"
                id="avatarurl"
                className="popup__input"
                placeholder="Введите ссылку на аватар"
                required
            />
            <span
                id="input-avatarurl-error"
                className="avatarurl-error popup__error"
            >
                Необходимо заполнить данное поле
            </span>

        </PopupWithForm>
    )
}

export default EditAvatarPopup;



