import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AUDIO_CATEGORIES, Audio } from '../../../../shared/models/Audio';
import { ContextService } from '../../../../services/context.service';

@Component({
  selector: 'app-choose-audio-category',
  templateUrl: './choose-audio-category.component.html',
  styleUrls: ['./choose-audio-category.component.scss'],
})
export class ChooseAudioCategoryComponent implements OnInit {
  
  categorySelected: string;
  audioEntity: Audio;

  constructor(
    private context: ContextService,
    public dialogRef: MatDialogRef<ChooseAudioCategoryComponent>
  ) {
    dialogRef.backdropClick().subscribe(bool => {
      this.context.setIsRecorded(true);
    })
  }

  onClose(): void {
    this.context.setIsRecorded(true);
    this.dialogRef.close();
  }

  isActive(category) {
    return this.categorySelected === AUDIO_CATEGORIES[category];
  }

  selectCategory(category) {
    this.categorySelected = AUDIO_CATEGORIES[category];
  }

  saveCategory() {
    if (this.categorySelected) {
      const recordType = this.context.getRecordType().getValue();

      if (recordType == 'ad') {
        this.audioEntity = new Audio();
        const adEntity = this.context.getAdEntity().getValue();
        this.audioEntity.base64 = adEntity.base64;
        this.audioEntity.latitude = adEntity.latitude;
        this.audioEntity.longitude = adEntity.longitude;
      } else {
        this.audioEntity = this.context.getAudioEntity().getValue();
      }
      
      this.audioEntity.category = this.categorySelected;
      this.context.setAudioEntity(this.audioEntity);

      const isRecordedInSite = this.context.getSiteId().getValue();
      
      if (isRecordedInSite) {
        this.context.setSendRecord('site');
      } else {
        this.context.setSendRecord('audio');
      } 

      this.dialogRef.close();
    }
  }

  ngOnInit() {}
}
