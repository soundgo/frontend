import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-choose-audio-advertisement',
  templateUrl: './choose-audio-advertisement.component.html',
  styleUrls: ['./choose-audio-advertisement.component.sass']
})
export class ChooseAudioAdvertisementComponent implements OnInit {
  audio = false;
  advert = false;
  mensaje = '';

  constructor(public dialogRef: MatDialogRef<ChooseAudioAdvertisementComponent>, public dialog: MatDialog) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    clickAudio(){
      console.log('Ha entrado en audio.')
      this.audio = true;
      this.advert = false;
      this.mensaje = 'Ha entrado en audio.';
      // Cerramos modal activo y mostramos nuevo modal
    }

    clickAdvert(){
      console.log('Ha entrado en anuncio.')
      this.audio = false;
      this.advert = true;
      this.mensaje = 'Ha entrado en anuncio.';
      // Cerramos modal activo y mostramos nuevo modal
    }
  
    ngOnInit() {
    }

}