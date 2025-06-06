import { Component, OnInit } from '@angular/core';
import { Music } from '../music';
import { MusicServiceService } from '../music-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-music',
  templateUrl: './update-music.component.html',
  styleUrls: ['./update-music.component.css']
})
export class UpdateMusicComponent implements OnInit {

  music: Music;
  tempMusic: Music;
  message: string;
  show: boolean = false;
  musicId: number = 0;
  success: boolean;
  updateForm: FormGroup;

  constructor(private musicService: MusicServiceService) {
    this.updateForm = new FormGroup({
      musicId: new FormControl('', [Validators.maxLength(50), Validators.required, Validators.pattern('^[\\d]*$')]),
      title: new FormControl('', [Validators.maxLength(50), Validators.required, Validators.pattern('^[\\w\\s\\-\\(\\)\\!\\&]*$')]),
      author: new FormControl('', [Validators.maxLength(50), Validators.required, Validators.pattern('^[\\w\\s\\-\\(\\)\\!\\&]*$')]),
      album: new FormControl('', [Validators.maxLength(50), Validators.required, Validators.pattern('^[\\w\\s\\-\\(\\)\\!\\&]*$')]),
      year: new FormControl('', [Validators.maxLength(4), Validators.required, Validators.pattern('^\\d{4}$')]),
      genre: new FormControl('', [Validators.maxLength(50), Validators.required, Validators.pattern('^[\\w\\s\\-]*$')]),
      url: new FormControl('', [Validators.maxLength(50),  Validators.required,
        Validators.pattern('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')]),
    });
  }

  getData(id: number) {
    this.show = false;
    this.musicService.getMusicById(id).subscribe(
      result => {
        this.success = true;
        console.log("Received from server:");
        console.log(result);
        this.music = result["data"][0];
        this.message = result["message"];
    },
    err => {
      this.success = false;
      console.log("Received from server:");
      console.log(err["error"]);
      this.message = err["error"]["message"];
    });
    this.show = true;

    setTimeout( () => {
      this.populateForm();
    }, 300);
  }

  populateForm() {
    this.updateForm.setValue({
      musicId: this.music.id,
      title: this.music.title,
      author: this.music.author,
      album: this.music.album,
      year: this.music.year,
      genre: this.music.genre,
      url: this.music.url
    });
  }

  updateMusic() {
    this.tempMusic = new Music();
    this.tempMusic.id = this.updateForm.value.musicId;
    this.tempMusic.title = this.updateForm.value.title;
    this.tempMusic.author = this.updateForm.value.author;
    this.tempMusic.album = this.updateForm.value.album;
    this.tempMusic.year = this.updateForm.value.year;
    this.tempMusic.genre = this.updateForm.value.genre;
    this.tempMusic.url = this.updateForm.value.url;

    this.show = false;

    this.musicService.updateOneMusic(this.tempMusic).subscribe(
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

    setTimeout( () => {
      this.getData(this.music.id);
    }, 500);
    /* Questo timeout si può anche togliere, è stato
       messo per permettere facilmente modificazioni
       successive della stessa musica. */
  }

  ngOnInit() { }

}
