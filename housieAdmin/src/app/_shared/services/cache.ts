import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

import { Admin } from '../models/admin';

@Injectable()
export class Cache {

    user: any;

    constructor(private storage: SessionStorageService) {

        this.user = this.get('user');

        if (!this.user) {
            this.user = new Admin(null);
        }
        console.log("10/03/2022 11:30 PM");
    }

    set(key: any, val: any) {
        let valString: string;
        if (typeof val == 'object') {
            valString = JSON.stringify(val);
        } else {
            valString = val;
        }
        this.storage.store(key, valString);
    }

    get(key: any) {
        let val = this.storage.retrieve(key)
        if (typeof val == 'string') {
            let valObj = JSON.parse(val);
            if (typeof valObj == 'object') {
                return valObj;
            }
        }
        return val;
    }

    clear(key: any) {
        return this.storage.clear(key);
    }

}
