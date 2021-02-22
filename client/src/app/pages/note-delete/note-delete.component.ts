import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute, Params } from '@angular/router';
import { NotesService } from './../../shared/notes.service';
import { Note } from 'src/app/shared/note.model';



@Component({
  selector: 'app-note-delete',
  templateUrl: './note-delete.component.html',
  styleUrls: ['./note-delete.component.scss']
})
export class NoteDeleteComponent implements OnInit {
  
  note: Note = new Note;
  noteId!:number;

  constructor(private router: Router, private NotesService: NotesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.note = new Note();
      this.NotesService.get(params.id).subscribe(res => {
        this.note = res;
        });
      this.noteId = params.id;
      
    })

  }

  deleteNote() {
    this.NotesService.deleteNote(this.noteId.toString());
    this.router.navigateByUrl('/')
  }


  cancel() {
    this.router.navigateByUrl('/')
  }

}
