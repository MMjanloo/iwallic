import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../core';

@Component({
    templateUrl: 'list.component.html'
})
export class AssetListComponent implements OnInit {
    constructor(
        public global: GlobalService
    ) { }

    public ngOnInit() { }
}