/* eslint-disable no-undef */
/* GET /cards — возвращает все карточки из базы;
POST /cards — создаёт карточку с переданными в теле запроса name и link , устанавливает поле owner для
карточки;
DELETE /cards/:cardId — удаляет карточку по _id ;
PUT /cards/:cardId/likes — ставит лайк карточке;
DELETE /cards/:cardId/likes — убирает лайк с карточки.
 */
const router = require("express").Router();


module.exports = router;