import { TestBed } from '@angular/core/testing';

import { GalleryService } from './gallery.service';

describe('SectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GalleryService = TestBed.get(GalleryService);
    expect(service).toBeTruthy();
  });
});
