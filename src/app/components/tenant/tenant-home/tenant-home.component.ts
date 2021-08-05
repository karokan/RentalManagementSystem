import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

export interface Tile {
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-tenant-home',
  templateUrl: './tenant-home.component.html',
  styleUrls: ['./tenant-home.component.css'],
})
export class TenantHomeComponent implements OnInit {
  constructor(private breakpointObserver: BreakpointObserver) {}
  // tiles: Tile[] = [
  //   { text: 'One', cols: 3, rows: 1 },
  //   { text: 'Two', cols: 1, rows: 2 },
  //   { text: 'Three', cols: 1, rows: 1 },
  //   { text: 'Four', cols: 2, rows: 1 },
  // ];
  public name = 'karol';
  tiles = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          {
            text: 'Reguluj finanse',
            cols: 2,
            rows: 1,
            imageUrl: '../../../../assets/images/city.jpg',
          },
          { text: 'Czat z właścielem', cols: 2, rows: 1 },
          { text: 'Sprawdź dokumenty', cols: 2, rows: 1 },
          { text: 'Utwórz zgłoszenie', cols: 2, rows: 1 },
        ];
      }

      return [
        {
          text: 'Reguluj finanse',
          cols: 3,
          rows: 1,
          imageUrl: '../../../../assets/images/city.jpg',
          link: '/tenant/finances',
        },
        {
          text: 'Czat z właścielem',
          cols: 1,
          rows: 2,
          imageUrl: '../../../../assets/images/city2.jpg',
          link: '/tenant/chat',
        },
        {
          text: 'Sprawdź dokumenty',
          cols: 1,
          rows: 1,
          imageUrl: '../../../../assets/images/city2.jpg',
          link: '/tenant/documents',
        },
        {
          text: 'Utwórz zgłoszenie',
          cols: 2,
          rows: 1,
          imageUrl: '../../../../assets/images/city3.jpg',
          link: '/tenant/notification',
        },
      ];
    })
  );

  ngOnInit(): void {}

  showReminder() {
    console.log('show reminder');
    // alert('top kek');
  }
}
