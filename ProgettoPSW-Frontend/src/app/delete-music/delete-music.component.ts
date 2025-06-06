import { Component, OnInit } from '@angular/core';
import { Music } from '../music';
import { MusicServiceService } from '../music-service.service';

@Component({
  selector: 'app-delete-music',
  templateUrl: './delete-music.component.html',
  styleUrls: ['./delete-music.component.css']
})
export class DeleteMusicComponent implements OnInit {

  music: Music;
  message: string;
  show: boolean = false;
  musicId: number = 0;
  success: boolean;
  isDataLoaded: boolean;

  constructor(private musicService: MusicServiceService) {
  }

  getData(id: number) {
    this.show = false;
    this.musicService.getMusicById(id).subscribe(
      result => {
        this.success = true;
        this.isDataLoaded = true;
        console.log("Received from server:");
        console.log(result);
        this.music = result["data"][0];
        this.message = result["message"];
    },
    err => {
      this.success = false;
      this.isDataLoaded = false;
      console.log("Received from server:");
      console.log(err["error"]);
      this.message = err["error"]["message"];
    });
    this.show = true;
  }

  deleteMusic(id: number) {
    this.show = false;
    this.musicService.deleteOneMusic(id).subscribe(
      result => {
        this.success = true;
        this.isDataLoaded = false;
        console.log("Received from server:");
        console.log(result);
        this.music = result["data"][0];
        this.message = result["message"];
    },
    err => {
      this.success = false;
      this.isDataLoaded = false;
      console.log("Received from server:");
      console.log(err["error"]);
      this.message = err["error"]["message"];
    });
    this.show = true;
  }

  ngOnInit() { }

}
