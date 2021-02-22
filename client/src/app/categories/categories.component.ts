import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CategoriesService } from '../shared/categories.service';
import { NotesService } from '../shared/notes.service';
import { Category } from '../shared/category.model';
import { Note } from '../shared/note.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  title!:string;
  selectedIndex: number = 0;
  
  category: Category = new Category;
  categories: Category[] = new Array<Category>();
  notes: Note[] = new Array<Note>();
  flag: boolean = false;

  @ViewChild('All', {static: true})
  all!: ElementRef<HTMLElement>;

  @Output() categoryEvent = new EventEmitter<string>();



  constructor(private CategoriesService: CategoriesService, private NotesService: NotesService, 
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.NotesService.getAll().subscribe(res => {
      this.notes = res;

      this.CategoriesService.getAll().subscribe(res => {
        this.categories = res;

        this.displayCategory(this.notes, this.categories);
      });
    });
  }

  onClick(index: number, title: string) {
    this.renderer.removeClass(this.all.nativeElement, 'is-active');
    this.selectedIndex = index+1;
    this.title = title;
    this.categoryEvent.emit(this.title);
 }

 onClickAll(title: string) {
    this.renderer.addClass(this.all.nativeElement, 'is-active');
    this.selectedIndex = 0;
    this.title = title;
    this.categoryEvent.emit(this.title);
}

// Will check witch categories are for display
displayCategory(n:Note[], c:Category[]){
  for(let i=0; i <=(c.length -1); i++){
    for(let j=0; j<=(n.length -1); j++){
      if(c[i].title == n[j].category){
        this.flag = true;
        break;
      }
    }if(!this.flag){this.categories.splice(i)}
    this.flag = false;
  }
  return c;
}

}
