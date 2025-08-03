import { Component } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-telemedicina',
  templateUrl: './telemedicina.component.html',
  styleUrls: ['./telemedicina.component.scss'],
  standalone: true,
  providers: [InAppBrowser],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TelemedicinaComponent {

  constructor (private iab: InAppBrowser, private androidPermissions: AndroidPermissions, private platform: Platform) {}

  async ngOnInit() {
    await this.platform.ready();
    if (this.platform.is('android')) {
      await this.requestPermissions();
    }
    this.openMeet();
  }

  async requestPermissions(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.androidPermissions.requestPermissions([
        this.androidPermissions.PERMISSION.CAMERA,
        this.androidPermissions.PERMISSION.RECORD_AUDIO
      ]).then(result => {
        if (result.hasPermission) {
          console.log('Permisos concedidos');
          resolve();
        } else {
          console.warn('Permisos NO concedidos');
          reject();
        }
      }).catch(err => {
        console.error('Error solicitando permisos:', err);
        reject(err);
      });
    });
  }

  openMeet() {
    const options: InAppBrowserOptions = {
      mediaPlaybackRequiresUserAction: 'no',
      allowInlineMediaPlayback: 'yes',
      toolbar: 'no',
      fullscreen: 'yes',
      location: 'no',
      clearcache: 'yes',
      clearsessioncache: 'yes',
    };

    const browser = this.iab.create('https://meet.jit.si/testDemo1994ASSPUBLIC', '_blank', options);

    browser.on('exit').subscribe(() => {
      console.log('InAppBrowser cerrado');
    });
  }
}
