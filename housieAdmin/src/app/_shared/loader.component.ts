import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `<div class="loading-wrap"  [class.inline]="type == 0" [class.small]="type == 1" [class.fullscreen]="type == 2">
                  <div class="loading-icon">
                      <img class="animation__shake" alt="Loading..." src="assets/img/logo.png"/>
                  </div>
              </div>`,
    styles: [`

        .loading-wrap {
            text-align: center;
            vertical-align: middle;
        }
        .loading-icon {
            padding: 0 20px;
        }
        .loading-wrap.inline {
            display: inline-block;
        }
        .loading-wrap.inline .loading-icon {
            padding: 0;
        }

        .loading-icon.small {
            padding: 0;
            position: absolute;
            top: 10px;
            right: 5px;
        }
        .fullscreen {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            z-index: 99;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgb(8 12 48);
        }
    `]

})
export class LoaderComponent{
    @Input() type: any;
    constructor(){
        this.type = 1;
    }
}
