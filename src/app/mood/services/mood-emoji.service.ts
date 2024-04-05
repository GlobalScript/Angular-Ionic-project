import {Injectable} from '@angular/core';
import {Emoji} from '../models/types';
import {AuthService} from 'src/app/auth/services/auth.service';
import {first, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoodEmojiService {

  constructor(private authService: AuthService) {
  }

  getEmotions(): Observable<Emoji[]> {
    return this.authService.getUserRef()
      .valueChanges()
      .pipe(map(data => data?.emotions ? data.emotions : this.scaleOfEmotions))
  }

  async editEmotion(title: string, emoji: string, index: number) {
    this.authService.getUserRef().valueChanges().pipe(first()).subscribe((data) => {
      let emotions!: Emoji[];
      if (data?.emotions) emotions = data.emotions;
      else emotions = this.scaleOfEmotions;
      emotions[index].title = title;
      emotions[index].emoji = emoji;
      this.authService.getUserRef().update({emotions})
    })
  }

  async resetSetting() {
    await this.authService.getUserRef().update({emotions: this.scaleOfEmotions});
  }

  private scaleOfEmotions: Emoji[] =
    [
      {
        level: 0,
        title: "mood.neutral",
        id: 'neutral',
        emoji: '&#128566;'
      },
      {
        level: 1,
        title: "mood.calm",
        id: 'calm',
        emoji: '&#128578;'
      },
      {
        level: 2,
        title: "mood.confidence",
        id: 'confidence',
        emoji: '&#128521;'
      },
      {
        level: 3,
        title: "mood.satisfy",
        id: 'satisfy',
        emoji: '&#128525;'
      },
      {
        level: 4,
        title: "mood.enthusiasm",
        id: 'enthusiasm',
        emoji: '&#128522;'
      },
      {
        level: 5,
        title: "mood.joy",
        id: 'joy',
        emoji: '&#128513;'
      },
      {
        level: -1,
        title: "mood.sorrow",
        id: 'sorrow',
        emoji: '&#128580;'
      },
      {
        level: -2,
        title: "mood.discomfort",
        id: 'discomfort',
        emoji: '&#128556;'
      },
      {
        level: -3,
        title: "mood.anxiety",
        id: 'anxiety',
        emoji: '&#128543;'
      },
      {
        level: -4,
        title: "mood.despair",
        id: 'despair',
        emoji: '&#128542;'
      },
      {
        level: -5,
        title: "mood.hopeless",
        id: 'hopeless',
        emoji: '&#128577;'
      },
    ]

  listOfEmojis: string[] = [
    "&#128512;",
    "&#128515;",
    "&#128516;",
    "&#128513;",
    "&#128518;",
    "&#128517;",
    "&#129315;",
    "&#128514;",
    "&#128578;",
    "&#128579;",
    "&#128521;",
    "&#128522;",
    "&#128519;",
    "&#129392;",
    "&#128525;",
    "&#129321;",
    "&#128536;",
    "&#128535;",
    "&#128538;",
    "&#128537;",
    "&#128523;",
    "&#128539;",
    "&#128540;",
    "&#129322;",
    "&#128541;",
    "&#129297;",
    "&#129303;",
    "&#129325;",
    "&#129323;",
    "&#129300;",
    "&#129296;",
    "&#129320;",
    "&#128528;",
    "&#128529;",
    "&#128566;",
    "&#128527;",
    "&#128530;",
    "&#128580;",
    "&#128556;",
    "&#129317;",
    "&#128524;",
    "&#128532;",
    "&#128554;",
    "&#129316;",
    "&#128564;",
    "&#128567;",
    "&#129298;",
    "&#129301;",
    "&#129314;",
    "&#129326;",
    "&#129319;",
    "&#129397;",
    "&#129398;",
    "&#129396;",
    "&#128565;",
    "&#129327;",
    "&#129312;",
    "&#129395;",
    "&#128526;",
    "&#129299;",
    "&#129488;",
    "&#128533;",
    "&#128543;",
    "&#128577;",
    "&#128558;",
    "&#128559;",
    "&#128562;",
    "&#128563;",
    "&#129402;",
    "&#128550;",
    "&#128551;",
    "&#128552;",
    "&#128560;",
    "&#128549;",
    "&#128546;",
    "&#128557;",
    "&#128561;",
    "&#128534;",
    "&#128547;",
    "&#128542;",
    "&#128531;",
    "&#128553;",
    "&#128555;",
    "&#128548;",
    "&#128545;",
    "&#128544;",
    "&#129324;",
    "&#128520;",
    "&#128127;"
  ];
}
