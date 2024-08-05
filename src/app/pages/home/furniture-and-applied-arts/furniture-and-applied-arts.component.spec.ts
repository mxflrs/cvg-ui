import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnitureAndAppliedArtsComponent } from './furniture-and-applied-arts.component';

describe('FurnitureAndAppliedArtsComponent', () => {
  let component: FurnitureAndAppliedArtsComponent;
  let fixture: ComponentFixture<FurnitureAndAppliedArtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FurnitureAndAppliedArtsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FurnitureAndAppliedArtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
