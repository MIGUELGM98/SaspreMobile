import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import {FormBuilder, Validators} from '@angular/forms'
import { InsecticidasService } from '../../services/insecticidas.service';
import { AlertController } from '@ionic/angular';
import { Alerts } from './../../models/alerts';

import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-insecticidas-editar',
  templateUrl: './insecticidas-editar.page.html',
  styleUrls: ['./insecticidas-editar.page.scss'],
})
export class InsecticidasEditarPage implements OnInit {

  alertas:Alerts;
  
  registerForm = this.formBuilder.group({
    nombree:['',[Validators.required,Validators.maxLength(50)]],
    precioo:['',Validators.pattern("^-?[0-9]\\d*(\\.\\d{1,2})?$")],
    descripcionn:['',[Validators.required,Validators.maxLength(100)]]
    });
 
  constructor(private modalCtrl:ModalController,
    public insecticidasService: InsecticidasService,
    public toastController:ToastController,
    private alertController:AlertController,
    private formBuilder: FormBuilder ) {
      this.alertas = new Alerts(toastController,alertController);
     }
    
      /*Para enviar datos del padre al hijo (modal) */
      @Input() nombre;
      @Input() precio;
      @Input() descripcion;
      
      private datos = {
        idInsecticidas:'16',
        nombreInsecticida: '1',
        precio: '1',
        descripcion: '1'
      }
  ngOnInit() {
  }
  get nombree(){
    return this.registerForm.get('nombree');
  }

  get precioo(){
    return this.registerForm.get('precioo');
  }

  get descripcionn(){
    return this.registerForm.get('descripcionn');
  }
  public errorMessages = {
    nombree:[
      {type:'required', message:'Nombre es requerido'},
      {type: 'maxlength', message:'Se exedio el numero de caracteres'}
    ],
    precioo:[
      {type:'required', message:'precio es requerido'},
      {type: 'pattern', message:'Valor no valido'}],

    descripcionn:[{type:'required', message:'Descripcion requerida'},
    {type: 'maxlength', message:'Se exedio el numero de caracteres'}],
  };


  salirSinArgumentos(){
    this.modalCtrl.dismiss();
  }
  onSubmitInsecticida(){
    this.datos.nombreInsecticida=this.registerForm.value.nombree;
    this.datos.precio=this.registerForm.value.precioo;
    this.datos.descripcion= this.registerForm.value.descripcionn;
    this.updateInsecticidas();
  }
  salirConArgumentos(){
    this.modalCtrl.dismiss({

      nombre:'nombre desde hijo',
      precio:'precio desde hijo',
      descripcion:'descripcion desde hijo'
    });
  }
  updateInsecticidas() {
    this.insecticidasService.updateInsecticidas(this.datos)
      .then(response => {
        console.log(response);
        let data = JSON.parse(response.data);

        if (data.result == 'success') {
          this.datos.idInsecticidas = '';
          this.datos.nombreInsecticida = '';
          this.datos.precio = '';
          this.datos.descripcion = '';

          this.alertas.toast('Exito', 'Insecticida actualizada con exito');
          //this.router.navigateByUrl('/menu');
        } else {
          console.log(data.message);
        }
      }
      )
      .catch(error => {
       this.alertas.showAlert('Error', 'Ha ocurrido un error ' + error);
      })
  }
}
