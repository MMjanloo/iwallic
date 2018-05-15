import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AssetListComponent } from '../../asset/list/list.component';
import { WalletOpenComponent } from '../open/open.component';
import { WalletPwdComponent } from '../pwd/pwd.component';
import { WalletService, Wallet } from '../../../neo';
import { GlobalService } from '../../../core';

@Component({
    selector: 'wallet-verify',
    templateUrl: 'verify.component.html'
})
export class WalletVerifyComponent implements OnInit {
    public openPage = WalletOpenComponent;
    public createPage = WalletPwdComponent;
    public pwd: string;
    constructor(
        private wallet: WalletService,
        private nav: NavController,
        private global: GlobalService
    ) { }

    public ngOnInit() { }
    public verify() {
        this.global.LoadI18N('LOADING_VERIFY').subscribe((load) => {
            this.wallet.Get(this.pwd).subscribe((res) => {
                load.dismiss();
                this.nav.setRoot(AssetListComponent);
            }, (err) => {
                load.dismiss();
                this.global.AlertI18N({
                    title: 'ALERT_TITLE_CAUTION',
                    content: 'ALERT_CONTENT_WALLETVERIFY',
                    ok: 'ALERT_OK_SURE'
                }).subscribe();
                console.log(err);
            });
        });
    }
}