import { Component, OnInit } from '@angular/core';
import { MusicServiceService } from '../music-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Music } from '../music';

@Component({
  selector: 'app-insert-music',
  templateUrl: './insert-music.component.html',
  styleUrls: ['./insert-music.component.css']
})
export class InsertMusicComponent implements OnInit {

  insertForm: FormGroup;
  insertManyForm: FormGroup[] = new Array<FormGroup>();
  method: string = "none";
  tempMusic: Music;
  success: boolean;
  message: string;
  show: boolean;
  musicList: Music[] = new Array<Music>();

  constructor(private musicService: MusicServiceService) {
    this.insertForm = new FormGroup({
      musicId: new FormControl('', [Validators.maxLength(50), Validators.required, Validators.pattern('^[\\d]*$')]),
      title: new FormControl('', [Validators.maxLength(50), Validators.required, Validators.pattern('^[\\w\\s\\-\\(\\)\\!\\&]*$')]),
      author: new FormControl('', [Validators.maxLength(50), Validators.required, Validators.pattern('^[\\w\\s\\-\\(\\)\\!\\&]*$')]),
      album: new FormControl('', [Validators.maxLength(50), Validators.required, Validators.pattern('^[\\w\\s\\-\\(\\)\\!\\&]*$')]),
      year: new FormControl('', [Validators.maxLength(4), Validators.required, Validators.pattern('^\\d{4}$')]),
      genre: new FormControl('', [Validators.maxLength(50), Validators.required, Validators.pattern('^[\\w\\s\\-]*$')]),
      url: new FormControl('', [Validators.maxLength(50),  Validators.required,
        Validators.pattern('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')]),
    });

    this.addOneForm();
  }

  addOneForm() {
    this.insertManyForm.push(new FormGroup({
      musicId: new FormControl('', [Validators.maxLength(50), Validators.required, Validators.pattern('^[\\d]*$')]),
      title: new FormControl('', [Validators.maxLength(50), Validators.required, Validators.pattern('^[\\w\\s\\-\\(\\)\\!\\&]*$')]),
      author: new FormControl('', [Validators.maxLength(50), Validators.required, Validators.pattern('^[\\w\\s\\-\\(\\)\\!\\&]*$')]),
      album: new FormControl('', [Validators.maxLength(50), Validators.required, Validators.pattern('^[\\w\\s\\-\\(\\)\\!\\&]*$')]),
      year: new FormControl('', [Validators.maxLength(4), Validators.required, Validators.pattern('^\\d{4}$')]),
      genre: new FormControl('', [Validators.maxLength(50), Validators.required, Validators.pattern('^[\\w\\s\\-]*$')]),
      url: new FormControl('', [Validators.maxLength(50), Validators.required,
        Validators.pattern('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')]),
    }));
  }

  removeForm(i: number) {
    if(this.insertManyForm.length == 1) {
      return;
    } else {
      this.insertManyForm.splice(i, 1);
    }
  }

  ngOnInit() {
  }

  addOne() {
    this.tempMusic = new Music();
    this.tempMusic.id = this.insertForm.value.musicId;
    this.tempMusic.title = this.insertForm.value.title;
    this.tempMusic.author = this.insertForm.value.author;
    this.tempMusic.album = this.insertForm.value.album;
    this.tempMusic.year = this.insertForm.value.year;
    this.tempMusic.genre = this.insertForm.value.genre;
    this.tempMusic.url = this.insertForm.value.url;

    this.show = false;

    this.musicService.insertOneMusic(this.tempMusic).subscribe(
      result => {
        this.success = true;
        console.log("Received from server:");
        console.log(result);
        this.message = result["message"];
    }, err => {
      this.success = false;
        console.log("Received from server:");
        console.log(err);
        this.message = err["message"];
    });
    this.show = true;
  }

  formFormsToMusicList() {
    let i: number;
    for(i=0; i<this.insertManyForm.length; i++) {
      let tmp: Music = new Music();
      tmp.id = this.insertManyForm[i].value.musicId;
      tmp.title = this.insertManyForm[i].value.title;
      tmp.author = this.insertManyForm[i].value.author;
      tmp.album = this.insertManyForm[i].value.album;
      tmp.year = this.insertManyForm[i].value.year;
      tmp.genre = this.insertManyForm[i].value.genre;
      tmp.url = this.insertManyForm[i].value.url;

      this.musicList.push(tmp);
    }
  }

  allFormsValid() {
    let i: number;
    for(i=0; i<this.insertManyForm.length; i++) {
      if(!this.insertManyForm[i].valid) {
        return false;
      }
    }
    return true;
  }

  addMany() {
    this.formFormsToMusicList();

    this.musicService.insertManyMusic(this.musicList).subscribe(
      result => {
        this.success = true;
        console.log("Received from server:");
        console.log(result);
        this.message = result["message"];
    }, err => {
      this.success = true;
        console.log("Received from server:");
        console.log(err);
        this.message = err["error"]["message"];
    });
    this.show = true;
  }

}
