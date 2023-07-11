import {body} from 'express-validator';

export const loginValidation = [
    // если будет email, то проверь, будет ли оно им
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
];

export const registerValidation = [
    // если будет email, то проверь, будет ли оно им
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
    body('fullName', 'Укажите имя').isLength({min: 3}),
    //явл ли это ссылкой
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Введите заголовк статьи').isLength({min: 3}).isString(),
    body('text', 'Введите текст статьи').isLength({min: 3}).isString(),
    body('tags', 'Неверный формат тэгов (укажите имя)').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];