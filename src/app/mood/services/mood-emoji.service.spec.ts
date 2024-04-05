import {TestBed} from '@angular/core/testing';

import {MoodEmojiService} from './mood-emoji.service';

describe('MoodEmojiService', () => {
  let service: MoodEmojiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoodEmojiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
