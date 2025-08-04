import { Component } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { WebViewPlugin } from 'vumi-webview'

@Component({
  selector: 'app-telemedicina',
  templateUrl: './telemedicina.component.html',
  styleUrls: ['./telemedicina.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TelemedicinaComponent {

  constructor (private androidPermissions: AndroidPermissions, private platform: Platform) {}

  async ngOnInit() {
    await this.platform.ready();
    if (this.platform.is('android')) {
      await this.requestPermissions();
    }
    this.openInCustomWebView();
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


  openInCustomWebView () {
    WebViewPlugin.openWebview({
      url: 'https://meet.jit.si/testDemo1994ASSPUBLIC'
    });
  }
}
