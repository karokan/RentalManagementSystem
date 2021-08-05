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
  selector: 'app-tenant-documents',
  templateUrl: './tenant-documents.component.html',
  styleUrls: ['./tenant-documents.component.css'],
})
export class TenantDocumentsComponent implements OnInit, AfterViewInit {
  @ViewChild('viewer') viewerRef: ElementRef;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    WebViewer(
      {
        path: '../../../../assets/lib',
        initialDoc: '../../../../assets/documents/regulamin_najmu.pdf',
      },
      this.viewerRef.nativeElement
    ).then((instance) => {
      (document.getElementById(
        'button-regulamin'
      ) as HTMLButtonElement).onclick = (e) => {
        instance.loadDocument((<HTMLButtonElement>e.target).value);
      };

      (document.getElementById(
        'button-procedura_zwrotu_lokalu'
      ) as HTMLButtonElement).onclick = (e) => {
        instance.loadDocument((<HTMLButtonElement>e.target).value);
      };

      (document.getElementById(
        'button-umowa_najmu'
      ) as HTMLButtonElement).onclick = (e) => {
        instance.loadDocument((<HTMLButtonElement>e.target).value);
      };

      (document.getElementById(
        'button-wypowiedzenie_umowy_najmu'
      ) as HTMLButtonElement).onclick = (e) => {
        instance.loadDocument((<HTMLButtonElement>e.target).value);
      };

      (document.getElementById(
        'button-wniosek_o_przyznanie_dodatku_mieszkaniowego'
      ) as HTMLButtonElement).onclick = (e) => {
        instance.loadDocument((<HTMLButtonElement>e.target).value);
      };
    });
  }
}
