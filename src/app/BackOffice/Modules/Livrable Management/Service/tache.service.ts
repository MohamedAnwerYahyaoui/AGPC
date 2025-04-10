import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, mergeMap, Observable, throwError} from "rxjs";
import {Tache} from "../Model/tache.model";
import {User} from "../Model/user.model";

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  private apiUrl = 'http://localhost:8086/livra/tache';



  constructor(private http: HttpClient) { }

  getTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.apiUrl}/all`);
  }

  ajouterTache(tache: Tache): Observable<Tache> {
    return this.http.post<Tache>(`${this.apiUrl}/ajouter`, tache).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur lors de l\'ajout de la tâche:', error);
        return throwError(() => error);
      })
    );
  }










  updateTache(id: number, tache: Tache): Observable<Tache> {
    return this.http.put<Tache>(`${this.apiUrl}/${id}`, tache).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur lors de la mise à jour de la tâche:', error);
        return throwError(() => error); // Rethrow l'erreur pour qu'elle soit gérée ailleurs
      })
    );
  }
  /*
    deleteTache(id: number): Observable<string> {
      return this.http.delete<string>(`${this.apiUrl}/delete/${id}`);
    }


  */

  deleteTache(id: number): Observable<void> {
    return this.http.delete(`http://localhost:8096/livra/tache/delete/${id}`, {
      responseType: 'text' // Spécifie qu'on attend une réponse texte
    }).pipe(
      map(() => undefined) // Convertit la réponse texte en void
    );
  }



  /*
    assignerTache(id: number, username: string): Observable<Tache> {
      return this.http.put<Tache>(`${this.apiUrl}/assign/${id}/${username}`, {});
    }
  */
  assignerTache(id: number, userId: number): Observable<Tache> {
    return this.http.put<Tache>(`${this.apiUrl}/assign/${id}/${userId}`, {});
  }




  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8096/user/all');
  }

  getTachesByUserId(userId: number): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.apiUrl}/${userId}/taches`);
  }


//zedetha ena
  updateTacheSafe(id: number, changes: Partial<Tache>): Observable<Tache> {
    return this.http.get<Tache>(`${this.apiUrl}/find/${id}`).pipe(
      mergeMap(existingTache => {
        // Fusionner les changements avec la tâche existante
        const updatedTache = { ...existingTache, ...changes };

        // Vérification des champs requis
        if (!updatedTache.nom || !updatedTache.description) {
          return throwError(() => new Error('Champs requis manquants'));
        }

        return this.http.put<Tache>(`${this.apiUrl}/${id}`, updatedTache).pipe(
          catchError(err => {
            console.error('Erreur lors de la mise à jour:', err);
            return throwError(() => err);
          })
        );
      }),
      catchError(err => {
        console.error('Erreur lors de la récupération de la tâche:', err);
        return throwError(() => err);
      })
    );
  }




  getTacheById(id: number): Observable<Tache> {
    return this.http.get<Tache>(`${this.apiUrl}/find/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur lors de la récupération de la tâche:', error);
        return throwError(() => error);
      })
    );
  }












}



/*
constructor(private http: HttpClient) {}

getTaches(): Observable<Tache[]> {
  return this.http.get<Tache[]>(`${this.apiUrl}/all`);
}

ajouterTache(tache: Tache): Observable<Tache> {
  return this.http.post<Tache>(`${this.apiUrl}/ajouter`, tache);
}

updateTache(id: number, tache: Tache): Observable<Tache> {
  return this.http.put<Tache>(`${this.apiUrl}/${id}`, tache);
}

deleteTache(id: number): Observable<string> {
  return this.http.delete<string>(`${this.apiUrl}/delete/${id}`);
}

assignerTache(id: number, username: string): Observable<Tache> {
  return this.http.put<Tache>(`${this.apiUrl}/assign/${id}/${username}`, {});
}

dessaffecterTache(tacheNom: string): Observable<Tache> {
  return this.http.delete<Tache>(`${this.apiUrl}/unassign?tacheNom=${tacheNom}`);
}


getUsersByTacheId(tacheId: number): Observable<User[]> {
  return this.http.get<User[]>(`${this.apiUrl}/${tacheId}/users`);
}

getTachesByUserId(userId: number): Observable<Tache[]> {
  return this.http.get<Tache[]>(`${this.apiUrl}/${userId}/taches`);
}
*/