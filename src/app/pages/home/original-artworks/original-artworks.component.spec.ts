import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginalArtworksComponent } from './original-artworks.component';

describe('OriginalArtworksComponent', () => {
  let component: OriginalArtworksComponent;
  let fixture: ComponentFixture<OriginalArtworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OriginalArtworksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OriginalArtworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
