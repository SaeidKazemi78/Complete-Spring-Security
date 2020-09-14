import {HotkeysService} from 'angular2-hotkeys/src/hotkeys.service';
import {Hotkey} from 'angular2-hotkeys';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Injectable} from '@angular/core';
import {getPath} from 'app/core/router';

@Injectable()
export class HotkeyService {
    constructor(
        private router: Router,
        private _hotkeysService: HotkeysService
    ) {
    }

    add(key: any, url: string, forms: NgForm, isPopup?: boolean) {
        this._hotkeysService.add(new Hotkey(key, (event: KeyboardEvent, k: string): boolean => {
            if (isPopup) {
                this.router.navigate([...getPath(this.router, '/').pathParts, {outlets: {popup: url}}]);
            } else {
                if (!forms.form.invalid) {
                    forms.onSubmit(null);
                }
            }

            return false;
        }, ['TEXTAREA', 'SELECT', 'INPUT']));
    }
}
