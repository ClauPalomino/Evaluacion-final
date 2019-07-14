import { Component, OnInit,ViewChild } from '@angular/core';
import { Rol } from 'src/app/_model/rol';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { RolService } from 'src/app/_service/rol.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  displayedColumns = ['id', 'nombre','descripcion', 'acciones'];
  dataSource: MatTableDataSource<Rol>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad: number = 0;
  constructor(private rolService: RolService, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
    this.rolService.rolesCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.rolService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', {
        duration: 2000,
      });
    });

    this.rolService.listarPageable(0, 10).subscribe(data => {
      this.cantidad = data.totalElements;

      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  mostrarMas(e: any) {
    this.rolService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(idRol: number) {
    this.rolService.eliminar(idRol).subscribe(data => {
      this.rolService.listar().subscribe(data => {
        this.rolService.rolesCambio.next(data);
        this.rolService.mensajeCambio.next('Se eliminó');
      });
    });
  }

}
