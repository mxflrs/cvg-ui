import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleArtworkComponent } from './single-artwork.component';

describe('SingleArtworkComponent', () => {
  let component: SingleArtworkComponent;
  let fixture: ComponentFixture<SingleArtworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleArtworkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleArtworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
