import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { ServicioTareaService } from 'src/app/services/servicio-tarea.service';
import { Servicio } from '../../../models/servicio';
import { ServicioService } from '../../../services/servicio.service';

@Component({
  selector: 'app-form-servicios',
  templateUrl: './form-servicios.component.html',
  styleUrls: ['./form-servicios.component.css']
})
export class FormServiciosComponent implements OnInit {

  reason: string;
  form: FormGroup = new FormGroup({});
  isLoaded: boolean;
  service: Servicio = new Servicio();
  label: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private serviceService: ServicioService,
    private globalService: GlobalService,
    private serviceTaskService: ServicioTareaService,
    private formBuilder: FormBuilder,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.reason = this.activatedRoute.snapshot.params.reason;
    if(this.reason == 'new'){
      this.label = 'Crear Servicio';
      this.createForm(this.service);
    } else {
      this.label = 'Editar Servicio';
      this.serviceService.getId(parseInt(this.reason)).subscribe( service => {
        this.service = service[0];
        this.createForm(this.service);
      });
    }
  }

  createForm(obj) {
    this.isLoaded = false;
    this.form = this.formBuilder.group({
      servNombre: [obj.servNombre, Validators.required],
      servDescripcion: [obj.servDescripcion, Validators.required],
      servPeriodo: [obj.servPeriodo, Validators.required],
      servKM: [obj.servKM, Validators.required],
      servFecha: [obj.servFecha, Validators.required]
    });
    this.isLoaded = !this.isLoaded;
  }

  save() {
    if(this.reason == 'new')
      this.createService();
    else 
      this.updateService();
  }

  updateService() {
    if(!this.form.valid) {
      return;
    }
    this.service.servId = parseInt(this.reason);
    this.service.servNombre = this.form.value.servNombre;
    this.service.servDescripcion = this.form.value.servDescripcion;
    this.service.servPeriodo = this.form.value.servPeriodo;
    this.service.servKM = this.form.value.servKM;
    this.service.servFecha = this.form.value.servFecha;
    this.serviceService.put(this.service).subscribe( service => {
      this.service = service;
      this.refreshDetails(this.service.servId);
    });
    this.route.navigate(['servicios']);
  }

  createService() {
    Object.assign(this.service, this.form.value);
    this.serviceService.post(this.service).subscribe( service => {
      this.service = service;
      this.refreshDetails(this.service.servId);
    });
    this.route.navigate(['servicios']);
  }

  refreshDetails(servId: number) {
    this.globalService.itemsServicioTarea.forEach( ist => {
      ist.setaServId = servId;
      
      if(ist.setaBorrado){
        this.serviceTaskService.delete(ist.setaId).subscribe();
      }

      if(ist.setaId < 0) {
        this.serviceTaskService.post(ist).subscribe();
      }

      if(ist.setaId > 0) {
        this.serviceTaskService.put(ist).subscribe();
      }

    });

  }

}
