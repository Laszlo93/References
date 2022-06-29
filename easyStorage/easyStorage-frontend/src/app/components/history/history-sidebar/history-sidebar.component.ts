import { Component, OnInit } from '@angular/core';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { MenuItem } from 'primeng/api';
import { HistoryItem } from 'src/app/models/history-item.model';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-history-sidebar',
  templateUrl: './history-sidebar.component.html',
  styleUrls: ['./history-sidebar.component.css']
})
export class HistorySidebarComponent implements OnInit {

  public menuItems: MenuItem[] = [];
  public historyToExport?: HistoryItem[];

  constructor(
    private historyService: HistoryService
    ) { }

  ngOnInit(): void {
    this.setSideBarItems();
  }

  public setSideBarItems(): void {
    this.menuItems = [
      {
        label: 'Műveletek',
        icon: 'pi pi-fw pi-question',
        items: [
          {
            label: 'Exportálás',
            icon: 'pi pi-pi pi-file-excel',
            command: () => this.exportItemsToCsv()
          }
        ],
        expanded: true
      }
    ];
  }

  public exportItemsToCsv(): void {
    const options = {
      fieldSeparator: ';',
      quoteStrings: '',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      title: '',
      useBom: true,
      noDownload: false,
      headers: ["Felhasználó", "Művelet", "Megnevezés", "Rajzszám", "Készletváltozás", "Módosítás dátuma"]
    }

    this.historyService.getHistoryToExport().subscribe({
      next: (responseData) => {
        this.historyToExport = responseData;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        new ngxCsv(this.historyToExport, "ExportáltHistoryElemek", options)
      }
    })

  }
}
