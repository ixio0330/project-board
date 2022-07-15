import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from '../mail.service';

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailService],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  describe('인증번호 메일 발송 및 확인', () => {
    it('이메일 발송 후 4자리의 인증번호를 반환한다.', () => {
      service
        .sendVerificationMail('test@example.com', 'test')
        .then((authNumber) => {
          expect(authNumber).toBeGreaterThan(999);
          expect(authNumber).toBeLessThan(10000);
        });
    });

    it('이메일 인증번호가 같으면 undefined를 반환한다.', () => {
      service
        .sendVerificationMail('test@example.com', 'test')
        .then((authNumber) => {
          expect(service.verifyAuthNumber(authNumber)).toBeUndefined();
        });
    });
  });

  // describe('인증번호 메일 연속 발송 확인', () => {
  //   it('두 명의 사용자가 이메일 인증번호를 요청했을 경우, 올바르게 각각의 인증번호를 확인할 수 있는가?', async () => {
  //     const user1 = await service.sendVerificationMail(
  //       'test1@example.com',
  //       'test1',
  //     );
  //     const user2 = await service.sendVerificationMail(
  //       'test2@example.com',
  //       'test2',
  //     );
  //     expect(service.verifyAuthNumber(user1)).toBeUndefined();
  //     expect(service.verifyAuthNumber(user2)).toBeUndefined();
  //   });
  // });
});
