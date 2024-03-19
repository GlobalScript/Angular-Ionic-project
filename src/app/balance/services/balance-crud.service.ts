import { Injectable } from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BalanceCrudService {

  private initialLevels = [8, 9, 10, 8, 9, 10, 8, 9];

  constructor(private authService: AuthService) {
  }

 async createBalance(levels: number[]) {
   await this.authService.getUserRef().update({balance: levels})
  }

  readBalance(): Observable<number[]> {
    return this.authService.getUserRef().valueChanges()
      .pipe(map(data => data?.balance ? data.balance : this.initialLevels));
  }
}
