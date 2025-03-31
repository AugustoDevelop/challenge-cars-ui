import { TestBed } from '@angular/core/testing';

import { NotifySnackService } from './notify-snack.service';

describe('NotifySnackService', () => {
  let service: NotifySnackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifySnackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
