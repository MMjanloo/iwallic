import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, ViewController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { TxTransferComponent } from '../../../pages';

@Component({
    selector: 'scan',
    templateUrl: 'scan.component.html'
})
export class ScanAddrComponent implements OnInit {

    protected light: boolean = false;
    protected frontCamera: boolean = false;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private qrScanner: QRScanner,
        private viewCtrl: ViewController,
    ) {
    }

    public ngOnInit() {
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    this.qrScanner.show();
                    this.showCamera();
                    const scanSub = this.qrScanner.scan().subscribe((text: string) => {
                        this.qrScanner.hide(); // hide camera preview
                        scanSub.unsubscribe(); // stop scanning
                        this.hideCamera();
                        this.navCtrl.insert(this.navCtrl.indexOf(this.navCtrl.last()) - 1 , TxTransferComponent, {
                            animate: false,
                            addr: text,
                            asset: this.navParams.get('asset'),
                            assetName: this.navParams.get('assetName'),
                            assetBalance: this.navParams.get('assetBalance')
                        });
                        this.navCtrl.pop({animate: false});
                        this.navCtrl.pop();
                    });
                } else if (status.denied) {
                    this.navCtrl.pop();
                    // camera permission was permanently denied
                    // you must use QRScanner.openSettings() method to guide the user to the settings page
                    // then they can grant the permission from there
                } else {
                    // permission was denied, but not permanently. You can ask for permission again at a later time.
                }
            })
            .catch((e: any) => console.log('Error is', e));
    }
    public dismiss(): void {
        this.viewCtrl.dismiss();
    }
    public toggleLight() {
        this.light = !this.light;
        if (this.light) {
            this.qrScanner.disableLight();
        } else {
            this.qrScanner.enableLight();

        }
    }
    public toggleCamera() {
        this.frontCamera = !this.frontCamera;
        if (this.frontCamera) {
            this.qrScanner.useBackCamera();
        } else {
            this.qrScanner.useFrontCamera();
        }
    }
    public showCamera() {
        (window.document.getElementsByTagName('ion-app')[0] as any).style.background = 'transparent';
    }
    public hideCamera() {
        (window.document.getElementsByTagName('ion-app')[0] as any).style.background = 'white';
    }

}