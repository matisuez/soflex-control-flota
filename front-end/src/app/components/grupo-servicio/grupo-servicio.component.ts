import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GrupoServicio } from 'src/app/models/grupo-servicio';
import { Servicio } from 'src/app/models/servicio';
import { GlobalService } from 'src/app/services/global.service';
import { GrupoServicioService } from 'src/app/services/grupo-servicio.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { ConfirmarComponent } from 'src/app/shared/confirmar/confirmar.component';

@Component({
  selector: 'app-grupo-servicio',
  templateUrl: './grupo-servicio.component.html',
  styleUrls: ['./grupo-servicio.component.css']
})
export class GrupoServicioComponent implements OnInit {

  @Input() grupId: number = 0;

  groupService = new GrupoServicio();

  columns: string[] = [
    'servNombre',
    'grusPeriodo',
    'grusKM',
    'grusFecha',
    'acciones'];
  dataSource = new MatTableDataSource<GrupoServicio>();

  form = new FormGroup({});

  showForm: boolean = false;
  services: Servicio[] = [];
  AuxId = -1;

  constructor(
    private groupServiceService: GrupoServicioService,
    private serviceService: ServicioService,
    public globalService: GlobalService,
    private formBuilder: FormBuilder,
    public matDialog: MatDialog
  ) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      grusId: [''],
      grusGrupId: [''],
      grusServId: [''],
      grusPeriodo: [''],
      grusKM: [''],
      grusFecha: [''],
      grusFechaAlta: [''],
      grusBorrado: [''],
      servNombre: ['']
    });

    this.groupServiceService.get(`grusGrupId=${this.grupId}`).subscribe( grupServ => {
      this.globalService.itemsGrupoServicio = grupServ;
      this.refreshTable();
    });

    this.serviceService.get().subscribe( service => {
      this.services = service;
    });

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  refreshTable() {
    this.dataSource.data = this.globalService.itemsGrupoServicio.filter( borrado => !(borrado.grusBorrado));
  }

  add() {
    this.AuxId--;
    this.groupService = new GrupoServicio();
    this.groupService.grusId = this.AuxId;
    this.form.setValue(this.groupService);
    this.showForm = true;
  }

  delete(row: GrupoServicio) {
    const dialogRef = this.matDialog.open(ConfirmarComponent);
    dialogRef.afterClosed().subscribe( result => {
      console.log(`Dialog result: ${result}`);
      if(result) {
        row.grusBorrado = 1;
        this.refreshTable();
      }
    });
  }

  edit(groupService: GrupoServicio) {
    this.showForm = true;
    this.groupService = groupService;
    this.form.setValue(groupService);
  }

  save() {
    
    if(!this.form.valid) {
      return;
    }

    Object.assign(this.groupService, this.form.value);

    this.groupService.servNombre = this.services.find( s => s.servId == this.groupService.grusServId)!.servNombre;
    this.globalService.itemsGrupoServicio = this.globalService.itemsGrupoServicio.filter( gs => gs.grusId != this.groupService.grusId);
    this.globalService.itemsGrupoServicio.push(this.groupService);
    this.showForm = false;
    this.refreshTable();

  }

  cancel() {
    this.showForm = false;
  }

}
