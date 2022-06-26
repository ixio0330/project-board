const { makeToken, checkToken } = require('../src/config/token');

// .env 파일을 못 읽어오는 문제 있음
describe('토큰 테스트', () => {
  test('토큰이 유효한지 테스트', () => {
    const { accessToken, refreshToken } = makeToken('test');

    let result = true;

    const accessTokenCheck = checkToken(accessToken);
    const refreshTokenCheck = checkToken(refreshToken);

    if (accessTokenCheck.aud !== 'test' || refreshTokenCheck.aud !== 'test') {
      result = false;
    }

    expect(result).toBe(true);
  });
});
