import { NotesService } from './../../shared/notes.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { transition, trigger, style, animate, query, stagger } from '@angular/animations';


@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,

          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
        animate('50ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingRight: '*',
          paddingLeft: '*',
        })),
        animate(68)
      ]),

      transition('* => void', [
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0,
        })),
        animate('150ms ease-out', style({
          opacity: 0,
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
          'margin-bottom': '0',
        }))
      ])
    ]),
    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0,
          }),
          stagger(100, [
            animate('0.2s ease')
          ])
        ], {
          optional: true
        })
      ])
    ])
  ]
})
export class NotesListComponent implements OnInit {

  notes: Note[] = new Array<Note>();
  filteredNotes: Note[] = new Array<Note>();
  
  @ViewChild('search')
  filterInputElRef!: ElementRef<HTMLInputElement>;

  

  constructor(private NotesService: NotesService) { }

  category!:string;

  ngOnInit(): void {
    this.NotesService.getAll().subscribe(res => {
      this.notes = res;
    });
    this.NotesService.getAll().subscribe(res => {
      this.filteredNotes = res;
    });
  }

  receiveCategory($event:string) {
    this.category = $event;
    if (this.category === 'all') {
      this.NotesService.getAll().subscribe(res => {
        this.filteredNotes = res;
      });
    }else {
        this.filteredNotes = this.notes.filter(note => {
          if (this.category == note.category) {
            return true;
          }
          return false;
        })
      }
  }

  priorityFilter(priority:string){
    if (priority === 'clear') {
      this.NotesService.getAll().subscribe(res => {
        this.filteredNotes = res;
      });
    }else {
      this.filteredNotes = this.notes.filter(note => {
        if (priority == note.priority) {
          return true;
        }
        return false;
      })
    }
  }


  deleteNote(id: string) {
    this.NotesService.deleteNote(id);
    this.filter(this.filterInputElRef.nativeElement.value);
  }

  generateNoteURL(note: Note) {
    let noteId = this.NotesService.getId(note);
    return noteId;
  }


  filter(query: any) {
    query = query.toString().toLowerCase().trim();

    let allResults: Note[] = new Array<Note>();

    let terms: string[] = query.split(' ');

    terms = this.removeDuplicates(terms);
    
    terms.forEach(term => {
      let results: Note[] = this.relevantNotes(term);
      allResults = [...allResults, ...results]
    });

    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;

  }

  removeDuplicates(arr: Array<any>) : Array<any> {
    let uniqueResults: Set<any> = new Set<any>();
    arr.forEach(e => uniqueResults.add(e));

    return Array.from(uniqueResults);
  }

  relevantNotes(query: string) : Array<Note>{
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(note => {
      if (note.body.toLowerCase().includes(query) || note.title.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    })

    return relevantNotes;
  }


}
