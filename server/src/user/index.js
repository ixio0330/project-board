const express = require('express');
const router = express.Router();
const tokenService = require('../jwt');
const database = require('../db');
const crypto = require('../crypto');
const BadRequest = require('../error/badrequest');

// 로그인
router.post('/login', async (req, res) => {
  const { id, password } = req.body;
  // TODO id, password가 있는지 체크한다.
  if (!id || !password) {
    throw new BadRequest('id, password는 필수 입력 사항입니다.');
  }

  // TODO 입력받은 id의 사용자를 찾는다.
  const user = await getById(id);
  if (!user) {
    throw new BadRequest('존재하지 않는 사용자입니다.');
  }

  // TODO 입력받은 password와 찾은 사용자의 password가 일치하는지 체크한다.
  if (
    !await crypto.verifyPassword(
      { password, 
        salt: user.salt, 
        hashPassword: user.password 
      })
  ) {
    throw new BadRequest('비밀번호가 일치하지 않습니다.');
  }

  // TODO 토큰을 발급한다.
  res.status(200).send({ token: tokenService.getToken(id) });
});

// 회원가입
router.post('/register', async (req, res) => {
  const { id, password, name } = req.body;
  if (!id || !password || !name) {
    throw new BadRequest('id, password, name은 필수 입력 사항입니다.');
  }
  
  // TODO 데이터베이스에서 검색
  const user = await getById(id);
  if (user) {
    throw new BadRequest('이미 존재하는 아이디입니다.');
  }

  const { salt, hashPassword } = await crypto.createHashedPassword(password);

  // TODO 데이터베이스에 추가
  await create({
    ...req.body,
    password: hashPassword,
    salt
  });

  res.send({ message: '사용자를 등록했습니다.' });
});

async function getById(_id) {
  try {
    const { rows } = await database.query(`select * from _users where id='${_id}'`);
    return rows[0];
  } catch (error) {
    return null;
  }
}

async function create({ id, password, name, salt}) {
  try {
    await database.query(`insert into _users (id, password, name, salt) values ('${id}', '${password}', '${name}', '${salt}')`);
  } catch (error) {
    throw new Error('사용자 생성 중 오류가 발생했습니다.');
  }
}

module.exports = router;