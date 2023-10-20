import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUsercontext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeAbout(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }


    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            buttonText={'Сохранить'}
        >

            <input
                onChange={handleChangeName}
                value={name || ''}
                type="text"
                name="profilename"
                id="popup__input-name"
                className="popup__input popup__input_data_name"
                placeholder="Имя"
                required
            />
            <span
                id="name-input-error"
                className="popup__input-name-error popup__error"
            >
                Необходимо заполнить данное поле
            </span>

            <input
                onChange={handleChangeAbout}
                value={description || ''}
                type="text"
                name="profession"
                id="popup__input-profession"
                className="popup__input popup__input_data_profession"
                placeholder="О себе"
                required
            />
            <span
                id="profession-input-error"
                className="popup__input-profession-error popup__error"
            >
                Необходимо заполнить данное поле
            </span>

        </PopupWithForm>
    )
}

export default EditProfilePopup;


