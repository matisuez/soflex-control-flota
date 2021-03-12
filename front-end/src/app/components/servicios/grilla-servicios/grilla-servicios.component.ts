import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Servicio } from '../../../models/servicio';
import { ServicioService } from '../../../services/servicio.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmarComponent } from '../../../shared/confirmar/confirmar.component';

@Component({
  selector: 'app-grilla-servicios',
  templateUrl: './grilla-servicios.component.html',
  styleUrls: ['./grilla-servicios.component.css']
})
export class GrillaServiciosComponent implements OnInit, AfterViewInit {

  services: Servicio[] = [];
  
  dataSource = new MatTableDataSource<Servicio>();
  columns: string[] = [
    "servNombre",
    "servDescripcion",
    "servPeriodo", 
    "servKM",
    "servFecha",
    "acciones"
  ];

  constructor(
    private serviceService: ServicioService,
    private dialog: MatDialog
  ) { }

  @ViewChild(MatSort) sort! : MatSort;
  @ViewChild(MatPaginator) paginator! : MatPaginator;

  ngOnInit(): void {
    this.serviceService.get().subscribe( service => {
      this.services = service;
      this.refreshTable();
    });
  }
  
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  refreshTable() {
    this.dataSource.data = this.services;
    this.dataSource.sort = this.sort;
  }

  filterService(event: Event) {
    const valueToFilter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valueToFilter.trim().toLowerCase();
  }

  deleteService(row: Servicio) {
    const dialogRef = this.dialog.open(ConfirmarComponent);

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.serviceService.delete(row.servId).subscribe( () => {
          this.services = this.services.filter( s => s.servId !== row.servId);
          this.refreshTable();
        });
      }
    });

  }

}

