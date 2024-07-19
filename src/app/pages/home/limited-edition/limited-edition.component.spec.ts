import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitedEditionComponent } from './limited-edition.component';

describe('LimitedEditionComponent', () => {
  let component: LimitedEditionComponent;
  let fixture: ComponentFixture<LimitedEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LimitedEditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LimitedEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
