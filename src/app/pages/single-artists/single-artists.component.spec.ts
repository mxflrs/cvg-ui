import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleArtistsComponent } from './single-artists.component';

describe('SingleArtistsComponent', () => {
  let component: SingleArtistsComponent;
  let fixture: ComponentFixture<SingleArtistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleArtistsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
