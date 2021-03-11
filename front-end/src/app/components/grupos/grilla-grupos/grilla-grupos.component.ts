import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Grupo } from '../../../models/grupo';
import { GrupoService } from '../../../services/grupo.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmarComponent } from 'src/app/shared/confirmar/confirmar.component';

@Component({
  selector: 'app-grilla-grupos',
  templateUrl: './grilla-grupos.component.html',
  styleUrls: ['./grilla-grupos.component.css']
})
export class GrillaGruposComponent implements OnInit, AfterViewInit {

  grupos: Grupo[] = [];

  columnas: string[] = ['grupNombre', 'grupDescripcion', 'acciones'];
  dataSource = new MatTableDataSource<Grupo>();

  constructor(
    private grupoService: GrupoService,
    private dialog: MatDialog
  ) { }

  @ViewChild(MatSort) sort! : MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.grupoService.get().subscribe( grupo => {
      this.grupos = grupo;
      this.refreshTable();
    });
  }
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  refreshTable() {
    this.dataSource.data = this.grupos;
    this.dataSource.sort = this.sort;
  }

  filterGroup(event: Event) {
    const valueToFilter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valueToFilter.trim().toLowerCase();
  }

  deleteGroup(row: Grupo) {

    const dialogRef = this.dialog.open(ConfirmarComponent);

    dialogRef.afterClosed().subscribe( result => {

      if(result) {
        this.grupoService.delete(row.grupId).subscribe( () => {
          this.grupos = this.grupos.filter( g => g.grupId !== row.grupId);
          this.refreshTable();
        });
      }

    });

  }



}
