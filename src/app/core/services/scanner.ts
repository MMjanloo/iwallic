import { Injectable } from '@angular/core';
import { ScanComponent } from '../directives/scan/scan.component';
import { Subject } from 'rxjs';
import { NavController } from 'ionic-angular';

@Injectable()
export class ScannerService {
    constructor() { }
    public open(
        navCtrl: NavController,
        type: 'ADDRESS' | 'WIF'
    ) {
        const $enter: Subject<any> = new Subject<any>();
        navCtrl.push(ScanComponent, {subject: $enter, type: type});
        return $enter.asObservable();
    }
}