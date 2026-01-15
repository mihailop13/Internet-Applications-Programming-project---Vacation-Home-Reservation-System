import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatiComponent } from './plati.component';

describe('PlatiComponent', () => {
  let component: PlatiComponent;
  let fixture: ComponentFixture<PlatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
