import { Component, OnInit } from '@angular/core';
import { FormationService } from '../formation.service';
import { Formation } from '../models/formation';
import { CalendarOptions } from '@fullcalendar/core'; // Correct import for CalendarOptions
import dayGridPlugin from '@fullcalendar/daygrid'; // Import dayGridPlugin
import interactionPlugin from '@fullcalendar/interaction'; // Import interactionPlugin

@Component({
  selector: 'app-list-formations',
  templateUrl: './list-formations.component.html',
  styleUrls: ['./list-formations.component.css']
})
export class ListFormationsComponent implements OnInit {
  formations: Formation[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin], // Use the imported plugins
    events: []
  };

  constructor(private formationService: FormationService) { }

  ngOnInit(): void {
    this.loadFormations();
  }

  loadFormations(): void {
    this.formationService.getFormation().subscribe((data: Formation[]) => {
      this.formations = data;
      this.calendarOptions.events = this.formations.map(formation => ({
        title: formation.name,
        start: formation.date,
        description: formation.description,
         backgroundColor: 'blue', // Set background color to blue
        borderColor: 'blue'
      }));
    });
  }
}