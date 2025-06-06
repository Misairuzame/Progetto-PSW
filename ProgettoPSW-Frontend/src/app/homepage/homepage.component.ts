import { Component, OnInit } from '@angular/core';
import { MusicServiceService } from '../music-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  message: string;
  success: boolean;

  constructor(private musicService: MusicServiceService) { }

  getData() {
    this.musicService.getHomepage().subscribe(
      result => {
        this.success = true;
        console.log("Received from server:");
        console.log(result);
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
    this.getData();
  }

}
