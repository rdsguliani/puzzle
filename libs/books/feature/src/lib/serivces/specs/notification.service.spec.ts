import { TestBed } from '@angular/core/testing';

import { NotificationService } from './../notification.service';
import { StoreModule } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

class MockStore {
  select() {
    return of({})
  }
}

class MockSnackBar {
  select() {
    return of({})
  }
}


describe('NotificationService', () => {
  let service: NotificationService;
  let store: MockStore = new MockStore();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBar, StoreModule.forRoot({})],
      providers: [StoreModule]
    });
    // service = TestBed.inject(NotificationService);
    service = new NotificationService((new MockSnackBar() as any), (new MockStore as any)); //can be done better by mocking the data
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
