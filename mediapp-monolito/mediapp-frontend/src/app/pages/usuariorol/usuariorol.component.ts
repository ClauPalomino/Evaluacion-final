import { UsuarioService } from './../../_service/usuario.service';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Usuario } from 'src/app/_model/usuario';

@Component({
  selector: 'app-usuariorol',
  templateUrl: './usuariorol.component.html',
  styleUrls: ['./usuariorol.component.css']
})
export class UsuariorolComponent implements OnInit {
  displayedColumns = ['id', 'username', 'acciones'];
  dataSource: MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad: number = 0;
  constructor(private usuarioService: UsuarioService, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
    this.usuarioService.usuarioCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.usuarioService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', {
        duration: 2000,
      });
    });

   this.usuarioService.listarPageable(0, 10).subscribe(data => {
      this.cantidad = data.totalElements;

      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      
    });

    
  }

  mostrarMas(e: any) {
    this.usuarioService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
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

}
