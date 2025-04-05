import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

declare var gantt: any;

interface GanttTask {
  id: string | number;
  text: string;
  start_date: string;
  duration: number;
  progress?: number;
  parent?: string | number;
  open?: boolean;
}

interface GanttLink {
  id: string | number;
  source: string | number;
  target: string | number;
  type: string;
}

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css']
})
export class GanttChartComponent implements OnInit, OnDestroy {
  @ViewChild('ganttContainer', { static: true }) ganttContainer!: ElementRef;
  private isGanttReady = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initializeGantt();
  }

  ngOnDestroy(): void {
    this.destroyGantt();
  }

  private initializeGantt(): void {
    if (typeof gantt === 'undefined') {
      console.error('Gantt library not loaded!');
      return;
    }

    try {
      // Configuration de base
      gantt.config.date_format = "%Y-%m-%d";

      // Configuration des échelles de temps
      gantt.config.scales = [
        { unit: "day", step: 1, format: "%d %M" },
        { unit: "month", step: 1, format: "%F %Y" }
      ];

      // Configuration des colonnes
      gantt.config.columns = [
        { name: "text", label: "Tâche", tree: true, width: 200 },
        { name: "start_date", label: "Début", align: "center" },
        { name: "duration", label: "Durée", align: "center" },
        {
          name: "progress",
          label: "Progression",
          align: "center",
          template: (obj: GanttTask) => Math.round((obj.progress || 0) * 100) + '%'
        }
      ];

      // Configuration des liens (flèches de dépendance)
      gantt.config.show_links = true;
      gantt.config.link_attribute = "type";
      gantt.config.link_types = {
        "0": {name: "Fin à Début"},
        "1": {name: "Début à Début"},
        "2": {name: "Fin à Fin"},
        "3": {name: "Début à Fin"}
      };

      gantt.templates.link_class = function(link: GanttLink) {
        return `gantt_link_${link.type}`;
      };

      // Initialisation
      gantt.init(this.ganttContainer.nativeElement);
      this.isGanttReady = true;
      this.loadData();
    } catch (error) {
      console.error('Gantt initialization failed:', error);
      this.isGanttReady = false;
    }
  }

  private destroyGantt(): void {
    if (this.isGanttReady && gantt?.destructor) {
      gantt.clearAll();
      gantt.destructor();
      this.isGanttReady = false;
    }
  }

  zoomIn(): void {
    if (this.isGanttReady && gantt.ext?.zoom?.zoomIn) {
      gantt.ext.zoom.zoomIn();
    }
  }

  zoomOut(): void {
    if (this.isGanttReady && gantt.ext?.zoom?.zoomOut) {
      gantt.ext.zoom.zoomOut();
    }
  }

  fitToScreen(): void {
    if (this.isGanttReady && gantt.ext?.zoom?.fit) {
      gantt.ext.zoom.fit();
    }
  }

  exportToPDF(): void {
    if (!this.isGanttReady) {
      console.warn('Gantt not ready for export');
      return;
    }

    try {
      gantt.exportToPDF({
        format: "A3",
        orientation: "landscape",
        styles: `
        .gantt_task_progress { fill: #4dabf7 !important; }
        .gantt_link_arrow { stroke: #495057 !important; }
        .gantt_task_content { font-size: 12px !important; }
        .gantt_container { font-family: Arial, sans-serif; }
      `,
        header: {
          text: "Diagramme de Gantt",
          style: "color: #333; font-size: 18px; text-align: center;"
        },
        footer: (currentPage: number, pageCount: number) => ({
          text: `Page ${currentPage} sur ${pageCount}`,
          style: "color: #666; font-size: 10px; text-align: center;"
        }),
        callback: () => console.log('Export PDF terminé')
      });
    } catch (error) {
      console.error('Erreur lors de l\'export PDF:', error);
    }
  }

  private loadData(): void {
    const apiUrl = 'http://localhost:8096/livra/gantt/data';

    this.http.get<any[]>(apiUrl).pipe(
      catchError(error => {
        console.error('API error:', error);
        this.loadSampleData();
        return throwError(() => error);
      })
    ).subscribe({
      next: (data) => {
        if (data?.length) {
          this.processGanttData(data);
        } else {
          this.loadSampleData();
        }
      }
    });
  }

  private processGanttData(data: any[]): void {
    const tasks = data.map(item => ({
      id: item.id,
      text: item.text || item.nom,
      start_date: item.start_date || item.startDate,
      duration: item.duration || this.calculateDuration(
        item.start_date || item.startDate,
        item.end_date || item.endDate
      ),
      progress: item.progress || 0,
      open: true
    }));

    const links = data
      .filter(item => item.source && item.target)
      .map(item => ({
        id: item.linkId || `${item.source}-${item.target}`,
        source: item.source,
        target: item.target,
        type: item.linkType || "0"
      }));

    if (this.isGanttReady) {
      gantt.parse({ data: tasks, links });
      setTimeout(() => this.fitToScreen(), 100);
    }
  }

  private calculateDuration(start: string, end: string): number {
    try {
      const diff = new Date(end).getTime() - new Date(start).getTime();
      return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    } catch {
      return 1;
    }
  }

  private loadSampleData(): void {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 3);

    const sampleData = {
      data: [
        {
          id: 1,
          text: "Projet Principal",
          start_date: today.toISOString().split('T')[0],
          duration: 10,
          progress: 0.2,
          open: true
        },
        {
          id: 2,
          text: "Tâche 1",
          start_date: today.toISOString().split('T')[0],
          duration: 3,
          progress: 0.5,
          parent: 1
        },
        {
          id: 3,
          text: "Tâche 2",
          start_date: tomorrow.toISOString().split('T')[0],
          duration: 5,
          progress: 0.1,
          parent: 1
        }
      ],
      links: [
        { id: "1", source: 2, target: 3, type: "0" }
      ]
    };

    if (this.isGanttReady) {
      gantt.parse(sampleData);
      setTimeout(() => this.fitToScreen(), 100);
    }
  }






}
