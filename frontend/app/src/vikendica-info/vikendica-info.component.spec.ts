import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VikendicaInfoComponent } from './vikendica-info.component';

describe('VikendicaInfoComponent', () => {
  let component: VikendicaInfoComponent;
  let fixture: ComponentFixture<VikendicaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VikendicaInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VikendicaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
