import { NotesService } from './../../shared/notes.service';
import { CategoriesService } from './../../shared/categories.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from 'src/app/shared/note.model';
import { Category } from 'src/app/shared/category.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  note: Note = new Note;
  noteId!:string;
  new!:boolean;
  category: Category =  new Category;
  categories: Category[] = new Array<Category>();

  @Input() h1!:string;

  @ViewChild('delete', {static: true})
  delete!: ElementRef<HTMLElement>;
  

  constructor(private notesService: NotesService, private categoriesService: CategoriesService,
    private router: Router, private route: ActivatedRoute, private renderer: Renderer2) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.note = new Note();
      if (params.id) {
        this.notesService.get(params.id).subscribe(res => {
        this.note = res;
        });
        this.noteId = params.id;
        this.new = false;
        this.h1 = 'EDIT';
      } else {
          this.new = true;
          this.renderer.setStyle(this.delete.nativeElement, 'display', 'none');
          this.h1 = "CREATE";
        }
    })

     this.categoriesService.getAll().subscribe(
      res => {
     this.categories = res;
    });

  }
  

  onSubmit(form: NgForm) {
    if (this.new) {

      this.notesService.add(form.value).subscribe(
        res => {
          this.note = res;
        }
      );
      if (this.addCategory(form.value.category.toLowerCase())) {
        this.category.title = form.value.category.toLowerCase().trim();
        this.categoriesService.add(this.category);
      }
    }else {
      this.note._id = this.noteId;
      this.note.title = form.value.title;
      this.note.body = form.value.body;
      this.note.category = form.value.category;
      this.note.priority = form.value.priority;
      this.notesService.update(this.note);
      if (this.addCategory(form.value.category.toLowerCase())) {
        this.category.title = form.value.category.toLowerCase();
        this.categoriesService.add(this.category);
      }
    }
    
    this.router.navigateByUrl('/');
  }


  cancel() {
    this.router.navigateByUrl('/')
  }

  deleteCall() {
    this.router.navigateByUrl(this.noteId +'/delete')
  }

  addCategory(categoryTitle:string){
    if (categoryTitle != "" ) {
      for(let i = 0; i <= (this.categories.length -1); i++){
        if (this.categories[i].title == categoryTitle){
          return false;
        }
      } 
      return true;
    } 
    return false;
  }

}
