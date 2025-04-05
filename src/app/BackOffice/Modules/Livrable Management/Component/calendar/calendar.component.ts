import {Component, OnInit} from '@angular/core';
import {CalendarOptions, EventInput} from "@fullcalendar/core";
import {TacheService} from "../../Service/tache.service";
import {Tache} from "../../Model/tache.model";



import dayGridPlugin from '@fullcalendar/daygrid'; // Plugin pour la vue mensuelle
import timeGridPlugin from '@fullcalendar/timegrid';



import interactionPlugin from '@fullcalendar/interaction';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [],
    eventClick: this.handleEventClick.bind(this),
    eventContent: this.customEventContent.bind(this)
  };

  constructor(
    private tacheService: TacheService,
    //private authService: AuthService // Si vous avez un service d'authentification
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur connecté
    //const userId = this.authService?.getCurrentUserId() || 1; // Fallback à 1 si non connecté
    const userId = 1;
    this.loadTachesForUser(userId);
  }

  loadTachesForUser(userId: number): void {
    this.tacheService.getTachesByUserId(userId).subscribe({
      next: (taches: Tache[]) => {
        this.calendarOptions.events = this.mapTachesToEvents(taches);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des tâches', error);
      }
    });
  }

  private mapTachesToEvents(taches: Tache[]): EventInput[] {
    return taches.map(tache => ({
      id: tache.id?.toString(),
      title: tache.nom,
      start: tache.dateDebut,
      end: tache.dateFin,
      description: tache.description,
      extendedProps: {
        status: tache.status
      },
      color: this.getStatusColor(tache.status)
    }));
  }

  private getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'en cours': return '#ffc107'; // Jaune
      case 'terminé': return '#28a745';  // Vert
      case 'en attente': return '#17a2b8'; // Bleu
      default: return '#007bff'; // Bleu par défaut
    }
  }

  customEventContent(arg: any): { html: string } {
    return {
      html: `
        <div class="fc-event-main-frame">
          <div class="fc-event-title-container">
            <div class="fc-event-title">${arg.event.title}</div>
          </div>
          ${arg.event.extendedProps.status ?
        `<div class="fc-event-status">${arg.event.extendedProps.status}</div>` : ''}
        </div>
      `
    };
  }

  handleEventClick(clickInfo: any): void {
    const event = clickInfo.event;
    alert(
      `Tâche: ${event.title}\n` +
      `Début: ${event.start?.toLocaleString()}\n` +
      `Fin: ${event.end?.toLocaleString()}\n` +
      `Statut: ${event.extendedProps.status}\n` +
      `Description: ${event.extendedProps.description || 'Aucune'}`
    );
  }
}
