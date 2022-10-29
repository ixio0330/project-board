const express = require('express');
const router = express.Router();
const database = require('../db');
const uuid = require('uuid');
const tokenVerify = require('../middleware/tokenVerify');
const BadRequest = require('../error/badrequest');
const tokenService = require('../jwt');

// 글 전체 조회
router.get('/', async (req, res) => {
  try { 
    const { rows } = await database.query(`
      select posts.id, name, title, created_on
      from posts
        inner join users 
        on posts.user_id = users.id
    `); 
    res.send(rows);
  } catch (error) {
    throw new Error('글 조회중 오류가 발생했습니다.');
  }
});

// 글 단일 조회
router.get('/:id', 
  (req, res, next) => {
    if (req.headers.authorization) {
      try {
        const payload = tokenService.getPayload(req.headers.authorization);
        req.user_id = payload.user_id;
      } catch (error) {
        //
      }
    }
    next();
  },
  async (req, res) => {
    const post = await getById(req.params.id);
    if (!post) {
      throw new BadRequest('존재하지 않는 글입니다.');
    }
    res.send({
      ...post,
      isOwner: post.user_id === req.user_id,
    });
  }
);

// 글 등록
router.post('/', tokenVerify, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    throw new BadRequest('Title, content는 필수 입력 사항입니다.');
  }
  await create({ user_id: req.user_id ,title, content });
  res.send({ message: '글을 등록했습니다.' });
});

// 글 수정
router.put('/:id', tokenVerify, async (req, res) => {
  const { title, content } = req.body;
  if (!req.params.id || !title || !content) {
    throw new BadRequest('id, title, content는 필수 입력 사항입니다.');
  }
  await update({ id: req.params.id, user_id: req.user_id, title, content });
  res.send({ message: '글을 수정했습니다.' });
});

// 글 삭제
router.delete('/:id', tokenVerify, async (req, res) => {
  if (!req.params.id) {
    throw new BadRequest('id는 필수 입력 사항입니다.');
  }
  await remove(req.params.id, req.user_id);
  res.send({ message: '글을 삭제했습니다.' });
});

async function getById(_id) {
  try {
    const { rows } = await database.query(`
      select posts.id, users.id as user_id, name, title, content, created_on
      from posts
        inner join users 
        on posts.user_id = users.id
      where posts.id = '${_id}'
    `);
    return rows[0];
  } catch (error) {
    return null;
  }
}

async function create({ user_id, title, content }) {
  try {
    await database.query(`insert into posts (id, user_id, title, content, created_on) values ('${uuid.v1()}', '${user_id}', '${title}', '${content}', '${new Date().toISOString()}')`);
  } catch (error) {
    throw new Error('글 생성 중 오류가 발생했습니다.');
  }
}

async function update({ id, user_id, title, content }) {
  const post = await getById(id);
  if (!post) {
    throw new BadRequest('존재하지 않는 글입니다.');
  }
  if (user_id !== post.user_id) {
    throw new BadRequest('글 생성자만 수정 가능합니다.');
  }
  try {
    await database.query(`update posts set title='${title}', content='${content}', where id='${id}'`);
  } catch (error) {
    throw new Error('글 수정 중 오류가 발생했습니다.');
  }
}

async function remove(_id, user_id) {
  const post = await getById(_id);
  if (!post) {
    throw new BadRequest('존재하지 않는 글입니다.');
  }
  if (user_id !== post.user_id) {
    throw new BadRequest('글 생성자만 수정 가능합니다.');
  }
  try {
    await database.query(`delete from posts where id='${_id}'`);
  } catch (error) {
    throw new Error('글 수정 중 오류가 발생했습니다.');
  }
}

module.exports = router;
