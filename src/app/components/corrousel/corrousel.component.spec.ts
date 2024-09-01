import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrouselComponent } from './corrousel.component';

describe('CorrouselComponent', () => {
  let component: CorrouselComponent;
  let fixture: ComponentFixture<CorrouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
