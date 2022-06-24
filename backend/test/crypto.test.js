const { cipher, decipher } = require('./../src/config/cypto');

describe('암호화 테스트', () => {
  test('같은 salt를 사용한 비밀번호는 같은 암호화 결과를 얻는다.', async () => {
    const { password, salt } = await cipher('1234');
    const hashPassword = await decipher('1234', salt);
    expect(hashPassword).toBe(password);
  });
});
