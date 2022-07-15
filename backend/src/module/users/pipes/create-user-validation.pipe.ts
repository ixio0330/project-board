import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class CreateUserValidatoinPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // 여기서 타입 체크 후 value를 반환한다.
    console.log('value', value);
    console.log('metadata', metadata);
    return value;
  }
}
