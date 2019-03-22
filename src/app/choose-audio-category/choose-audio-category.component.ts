import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-choose-audio-category',
  templateUrl: './choose-audio-category.component.html',
  styleUrls: ['./choose-audio-category.component.scss']
})
export class ChooseAudioCategoryComponent implements OnInit {

  valueToSave;

  constructor(public dialogRef: MatDialogRef<ChooseAudioCategoryComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // Obtenemos el valor en los metodos
  // Realizar las llamadas necesarias para obtener el valor y almacenarlo cuando pulsemos en save
  clickTourism(idTourism, idExperience, idLeisure){
    const tourism = document.getElementById(idTourism);
    const experience = document.getElementById(idExperience);
    const leisure = document.getElementById(idLeisure);

    tourism.style.background = '#F24440';
    experience.style.background = '#9397A2';
    leisure.style.background = '#9397A2';
  }

  clickExperience(idTourism, idExperience, idLeisure){
    const tourism = document.getElementById(idTourism);
    const experience = document.getElementById(idExperience);
    const leisure = document.getElementById(idLeisure);

    tourism.style.background = '#9397A2';
    experience.style.background = '#F57828';
    leisure.style.background = '#9397A2';
  }

  clickLeisure(idTourism,idExperience, idLeisure){
    const tourism = document.getElementById(idTourism);
    const experience = document.getElementById(idExperience);
    const leisure = document.getElementById(idLeisure);

    experience.style.background = '#9397A2';
    tourism.style.background = '#9397A2';
    leisure.style.background = '#04B289';
  }

  saveCategory(){
    // Obtenemos la categoria seleccionada 
    // Llamamos al metodo actualizar de la API
    this.valueToSave = '';
  }

  ngOnInit() {
  }

}