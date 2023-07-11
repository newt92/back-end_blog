import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';

import {registerValidation, loginValidation, postCreateValidation} from './validations.js';

import {handleValidationErrors, checkAuth} from './utils/index.js'

import {UserController, PostController} from './controlers/index.js';


mongoose
    .connect('mongodb+srv://admin:zakon@cluster0.wm66obe.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error', err));


const app = express();

// хранилище для картинок
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        // сохрн в uploads
        cb(null, 'uploads');
    },
    // перед сохранением обьясняем как называется файл
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

// учим читать БД res
app.use(express.json());
// делаем картинки статичными
app.use('/uploads', express.static('uploads'));
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
// если в /auth/register есть registerValidation, то будем дальше выполнять функцию
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);
// если upload успешен, то на ссылку url
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get('/posts', PostController.getAll);
// получение одной статьи
app.get('/posts/:id', PostController.getOne);
// созд одной статьи
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);
app.delete('/posts/:id', checkAuth, PostController.remove);


app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK!');
});