import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import WebViewer from '@pdftron/webviewer';

@Component({
  selector: 'app-owner-documents',
  templateUrl: './owner-documents.component.html',
  styleUrls: ['./owner-documents.component.css'],
})
export class OwnerDocumentsComponent implements OnInit, AfterViewInit {
  @ViewChild('viewer') viewerRef: ElementRef;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    WebViewer(
      {
        path: '../../../../assets/lib',
        initialDoc: '../../../../assets/documents/umowa_najmu.pdf',
      },
      this.viewerRef.nativeElement
    ).then((instance) => {
      (document.getElementById(
        'button-umowa_najmu'
      ) as HTMLButtonElement).onclick = (e) => {
        instance.loadDocument((<HTMLButtonElement>e.target).value);
      };

      (document.getElementById(
        'button-pozew_o_eksmisje'
      ) as HTMLButtonElement).onclick = (e) => {
        instance.loadDocument((<HTMLButtonElement>e.target).value);
      };

      (document.getElementById(
        'button-protokół_zdawczo_odbiorczy'
      ) as HTMLButtonElement).onclick = (e) => {
        instance.loadDocument((<HTMLButtonElement>e.target).value);
      };

      (document.getElementById(
        'button-umowa_najmu_z_mozliwoscia_podnajmu'
      ) as HTMLButtonElement).onclick = (e) => {
        instance.loadDocument((<HTMLButtonElement>e.target).value);
      };

      (document.getElementById(
        'button-wypowiedzenie_umowy_najmu'
      ) as HTMLButtonElement).onclick = (e) => {
        instance.loadDocument((<HTMLButtonElement>e.target).value);
      };
    });
  }
}
