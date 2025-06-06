import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MusicServiceService } from '../music-service.service';
import { SearchFilter } from '../search-filter';
import { Music } from '../music';

@Component({
  selector: 'app-search-music',
  templateUrl: './search-music.component.html',
  styleUrls: ['./search-music.component.css']
})
export class SearchMusicComponent implements OnInit {

  filter: SearchFilter = new SearchFilter();
  searchForm: FormGroup;
  whichParam: string[];
  whichValue: string[];
  message: string;
  musicList: Music[];
  page: number = 0;
  success: boolean = false;
  noNextPage: boolean;
  show: boolean;

  constructor(private musicService: MusicServiceService) {
    this.searchForm = new FormGroup({
      title: new FormControl('', [Validators.maxLength(50), Validators.pattern('^[\\w\\s\\-\\(\\)\\!\\&]*$')]),
      author: new FormControl('', [Validators.maxLength(50), Validators.pattern('^[\\w\\s\\-\\(\\)\\!\\&]*$')]),
      album: new FormControl('', [Validators.maxLength(50), Validators.pattern('^[\\w\\s\\-\\(\\)\\!\\&]*$')]),
      year: new FormControl('', [Validators.maxLength(4), Validators.pattern('^\\d{4}$')]),
      genre: new FormControl('', [Validators.maxLength(50), Validators.pattern('^[\\w\\s\\-]*$')])
    });
    this.whichParam = new Array();
    this.whichValue = new Array();
  }

  isFormValid() {
    let bool: boolean;
    bool = this.searchForm.value.title !== null ||
           this.searchForm.value.author !== null ||
           this.searchForm.value.album !== null ||
           this.searchForm.value.year !== null ||
           this.searchForm.value.genre !== null;
    return bool;
  }

  onSubmit() {    
    this.page = 0;
    this.whichParam = new Array();
    this.whichValue = new Array();

    this.filter.title = this.searchForm.value.title;
    this.filter.author = this.searchForm.value.author;
    this.filter.album = this.searchForm.value.album;
    this.filter.year = this.searchForm.value.year;
    this.filter.genre = this.searchForm.value.genre;
    
    let i: number = 0;
    if(this.filter.title !== null) {
      this.whichParam.push("title");
      this.whichValue.push(this.filter.title);
    }
    if(this.filter.author !== null) {
      this.whichParam.push("author");
      this.whichValue.push(this.filter.author);
    }
    if(this.filter.album !== null) {
      this.whichParam.push("album");
      this.whichValue.push(this.filter.album);
    }
    if(this.filter.year !== null) {
      this.whichParam.push("year");
      this.whichValue.push(this.filter.year.toString());
    }
    if(this.filter.genre !== null) {
      this.whichParam.push("genre");
      this.whichValue.push(this.filter.genre);
    }

    this.getData(this.page);

    this.searchForm.reset();
  }

  getData(pageNum: number) {
    this.show = false;
    this.musicService.getMusicByParams(this.whichParam, this.whichValue, pageNum).subscribe(
      result => {
        this.success = true;
        console.log("Received from server:");
        console.log(result);
        this.musicList = result["data"];
        this.message = result["message"];
    },
    err => {
      this.success = false;
      console.log("Received from server:");
      console.log(err["error"]);
      this.message = err["error"]["message"];
    });
    this.show = true;

    this.evalNextPage();
  }

  prevPage(){
    this.page--;
    this.getData(this.page);
    this.evalNextPage();
  }

  nextPage(){
    this.page++;
    this.getData(this.page);
    this.evalNextPage();
  }

  evalNextPage() {
    setTimeout( () => {
      this.noNextPage = this.musicList.length < 10;
      return !this.noNextPage;
    }, 300 );
  }

  ngOnInit() {
  }

}
