import { TestBed } from '@angular/core/testing';

import { FormErrorMsgService } from './form-error-msg.service';

describe('FormErrorMsgService', () => {
  let service: FormErrorMsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormErrorMsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
