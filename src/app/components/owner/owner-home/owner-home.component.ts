import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-owner-home',
  templateUrl: './owner-home.component.html',
  styleUrls: ['./owner-home.component.css'],
})
export class OwnerHomeComponent implements OnInit {
  constructor(private breakpointObserver: BreakpointObserver) {}
  // tiles: Tile[] = [
  //   { text: 'One', cols: 3, rows: 1 },
  //   { text: 'Two', cols: 1, rows: 2 },
  //   { text: 'Three', cols: 1, rows: 1 },
  //   { text: 'Four', cols: 2, rows: 1 },
  // ];

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
          text: 'Sprawdź finanse',
          cols: 3,
          rows: 1,
          imageUrl: '../../../../assets/images/city.jpg',
          link: '/owner/home',
        },
        {
          text: 'Czat z najemcą',
          cols: 1,
          rows: 1,
          imageUrl: '../../../../assets/images/city2.jpg',
          link: '/owner/chat',
        },
        {
          text: 'Stwórz umowę',
          cols: 1,
          rows: 1,
          imageUrl: '../../../../assets/images/city2.jpg',
          link: '/owner/agreement',
        },
        {
          text: 'Sprawdź zgłoszenia',
          cols: 2,
          rows: 1,
          imageUrl: '../../../../assets/images/city3.jpg',
          link: '/owner/notification',
        },
        {
          text: 'Dodaj nieruchomość',
          cols: 1,
          rows: 1,
          imageUrl: '../../../../assets/images/city.jpg',
          link: '/owner/property',
          // link: '/tenant/notification',
        },
      ];
    })
  );

  ngOnInit(): void {}
}
