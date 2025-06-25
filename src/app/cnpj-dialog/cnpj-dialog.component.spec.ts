import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnpjDialogComponent } from './cnpj-dialog.component';

describe('CnpjDialogComponent', () => {
  let component: CnpjDialogComponent;
  let fixture: ComponentFixture<CnpjDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CnpjDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CnpjDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
