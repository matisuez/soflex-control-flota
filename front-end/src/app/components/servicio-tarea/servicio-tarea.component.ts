import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServicioTarea } from 'src/app/models/servicio-tarea';
import { Tarea } from 'src/app/models/tarea';
import { GlobalService } from 'src/app/services/global.service';
import { ServicioTareaService } from 'src/app/services/servicio-tarea.service';
import { TareaService } from 'src/app/services/tarea.service';
import { ConfirmarComponent } from 'src/app/shared/confirmar/confirmar.component';

@Component({
  selector: 'app-servicio-tarea',
  templateUrl: './servicio-tarea.component.html',
  styleUrls: ['./servicio-tarea.component.css']
})
export class ServicioTareaComponent implements OnInit {

  @Input() servId : number = 0;

  serviceTask = new ServicioTarea();

  columns: string[] = ['tareNombre', 'acciones'];
  dataSource = new MatTableDataSource<ServicioTarea>();

  form = new FormGroup({});

  showForm: boolean = false;
  tasks: Tarea[] = [];
  AuxId = -1;

  constructor(
    private serviceTaskService: ServicioTareaService,
    private taskService: TareaService,
    public globalService: GlobalService,
    private formBuilder: FormBuilder,
    public matDialog: MatDialog
  ) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      setaId: [''],
      setaServId: [''],
      setaTareId: [''],
      setaFechaAlta: [''],
      setaBorrado: [''],
      tareNombre: ['']
    });

    this.serviceTaskService.get(`setaServId=${this.servId}`).subscribe( servTare => {
      this.globalService.itemsServicioTarea = servTare;
      this.refreshTable();
    });

    this.taskService.get().subscribe( tasks => {
      this.tasks = tasks;
    });

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  refreshTable() {
    this.dataSource.data = this.globalService.itemsServicioTarea.filter( borrado => !(borrado.setaBorrado));
  }

  add() {
    this.AuxId--;
    this.serviceTask = new ServicioTarea();
    this.serviceTask.setaId = this.AuxId;

    this.form.setValue(this.serviceTask);
    this.showForm = true;
  }

  delete(row: ServicioTarea) {
    const dialogRef = this.matDialog.open(ConfirmarComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result) {
        row.setaBorrado = 1;
        this.refreshTable();
      }
    })
  }

  edit(serviceTask: ServicioTarea) {
    this.showForm = true;
    this.serviceTask = serviceTask;
    this.form.setValue(serviceTask);
  } 

  save() {
    
    if(!this.form.valid) {
      return;
    }

    Object.assign(this.serviceTask, this.form.value);

    this.serviceTask.tareNombre = this.tasks.find( t => t.tareId == this.serviceTask.setaTareId)!.tareNombre;
    this.globalService.itemsServicioTarea = this.globalService.itemsServicioTarea.filter( ts => ts.setaId != this.serviceTask.setaId);
    this.globalService.itemsServicioTarea.push(this.serviceTask);
    this.showForm = false;
    this.refreshTable();
  }

  cancel() {
      this.showForm = false;
  }

}

