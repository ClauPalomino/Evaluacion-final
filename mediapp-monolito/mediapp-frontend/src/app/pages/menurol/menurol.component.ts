import { Menu } from './../../_model/menu';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { MenuService } from 'src/app/_service/menu.service';

@Component({
  selector: 'app-menurol',
  templateUrl: './menurol.component.html',
  styleUrls: ['./menurol.component.css']
})
export class MenurolComponent implements OnInit {

  displayedColumns = ['id', 'nombre','url', 'acciones'];
  dataSource: MatTableDataSource<Menu>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad: number = 0;
  constructor(private menuService: MenuService, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
    this.menuService.menuCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.menuService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', {
        duration: 2000,
      });
    });

    this.menuService.listarPageable(0, 10).subscribe(data => {
      this.cantidad = data.totalElements;

      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  mostrarMas(e: any) {
    this.menuService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
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
