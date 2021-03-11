import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupo } from 'src/app/models/grupo';
import { GrupoService } from 'src/app/services/grupo.service';

@Component({
  selector: 'app-form-grupos',
  templateUrl: './form-grupos.component.html',
  styleUrls: ['./form-grupos.component.css']
})
export class FormGruposComponent implements OnInit {

  reason: string;
  form: FormGroup = new FormGroup({});
  isLoaded: boolean;
  group: Grupo = new Grupo();
  label: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private grupoService: GrupoService,
    private formBuilder: FormBuilder,
    private route: Router
  ) { }

  ngOnInit(): void {
    
    this.reason = this.activatedRoute.snapshot.params.reason;
    if(this.reason == 'new') {
      this.label = 'Crear Grupo';
      this.createForm({
        grupNombre: '',
        grupDescripcion: ''
      });
    } else {
      this.label = 'Editar Grupo';
      this.grupoService.getId(parseInt(this.reason)).subscribe( grupo => {
        this.group = grupo[0];
        this.createForm({ 
          grupNombre: this.group.grupNombre,
          grupDescripcion: this.group.grupDescripcion
        });
      });
    }
    
  }

  createForm(obj) {
    this.isLoaded = false;
    this.form = this.formBuilder.group({
      grupNombre: [obj.grupNombre, Validators.required],
      grupDescripcion: [obj.grupDescripcion, Validators.required]
    });
    this.isLoaded = !this.isLoaded;
  }

  save() {
    if(this.reason == 'new')
      this.createGroup(); 
    else
      this.updateGroup();
  }

  updateGroup() {
    this.group.grupNombre = this.form.value.grupNombre;
    this.group.grupDescripcion = this.form.value.grupDescripcion;
    this.grupoService.put(this.group).subscribe( group => {
      this.group = group;
    });
    this.route.navigate(['grupos']);
  }

  createGroup() {
    Object.assign(this.group, this.form.value);
    this.grupoService.post(this.group).subscribe( group => {
      this.group = group;
    });
    this.route.navigate(['grupos']);
  }

}
