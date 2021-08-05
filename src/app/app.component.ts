import { Component, OnInit } from '@angular/core';
import { AuthService } from './components/auth/auth.service';
// import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [ChatService],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  title = 'mgr-project';

  ngOnInit() {
    this.authService.autoAuthUser();
    // this.chatService.getMessage();
  }
}
