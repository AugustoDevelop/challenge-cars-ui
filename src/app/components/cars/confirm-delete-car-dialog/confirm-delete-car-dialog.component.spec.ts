import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteCarDialogComponent } from './confirm-delete-car-dialog.component';

describe('ConfirmDeleteCarDialogComponent', () => {
  let component: ConfirmDeleteCarDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteCarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmDeleteCarDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmDeleteCarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
