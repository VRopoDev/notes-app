import { Injectable } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Note[] = new Array<Note>();

  constructor(private http: HttpClient) { }

  getAll(): Observable<Note[]> {
    return this.http.get<Note[]>('http://localhost:3000/api/notes');
  }

  get(id: number) {
    return this.http.get<Note>('http://localhost:3000/api/note/' + id);
  }

  getId(note: Note) {
    return note._id;
  }

  add(note: Note) {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json',);
    return this.http.post<Note>('http://localhost:3000/api/note/', note, {headers: headers});
  }

  update(note: Note) {
    return this.http.put('http://localhost:3000/api/note/' + note._id, note).subscribe
    (note => {console.log("PUT request successfull", note)});
  }

  deleteNote(id: string) {
    return this.http.delete('http://localhost:3000/api/note/' + id,).subscribe
    (note => {console.log("Delete request successfull", note)});
  }

}
