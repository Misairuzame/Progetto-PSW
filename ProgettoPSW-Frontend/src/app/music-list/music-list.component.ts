import { Component, OnInit } from '@angular/core';
import { Music } from '../music';
import { MusicServiceService } from '../music-service.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit {

  musicList: Music[];
  message: string;
  show: boolean = true;
  page: number = 0;
  noNextPage: boolean;
  success: boolean;

  constructor(private musicService: MusicServiceService) {
  }

  nextPage() {
    this.show = false;
    this.page++;
    this.getData(this.page);
    this.show = true;
    this.evalNextPage();
  }

  prevPage() {
    this.show = false;
    this.page--;
    this.getData(this.page);
    this.show = true;
    this.evalNextPage();
  }

  evalNextPage() {
    setTimeout( () => {
      this.noNextPage = this.musicList.length < 10;
      return !this.noNextPage;
    }, 300 );
  }

  getData(pageNum: number) {
    this.musicService.getAllMusic(this.page).subscribe(
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
  }

  ngOnInit() {
    this.getData(this.page);
  }

}
