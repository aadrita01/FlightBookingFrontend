import { Component } from '@angular/core';
import { SearchService } from '../search.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as pdfMake from 'pdfmake/build/pdfmake';



@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm-page.component.html',
  styleUrl: './confirm-page.component.css'
})
export class ConfirmPageComponent {
 
  refId="";

  constructor(private service:SearchService){
  }

  ngOnInit():void{
    this.refId=this.service.getTranId();
  }

  
    async generatePDF() {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.68/vfs_fonts.js';
      script.async = true;
      document.head.appendChild(script);
  
      script.onload = () => {
        // Continue with generating the PDF after vfs_fonts.js is loaded
        this.createPdf();
      };
    }
  
    private createPdf() {
      // Continue with your pdfMake logic here
      let docDefinition = {
        content: [
          { text: `Your Reference Id is ${this.refId}.Use this for Web-Checkin.`, font: 'Roboto' }
        ],
        defaultStyle: {
          font: 'Roboto'
        }
      };
  
      pdfMake.createPdf(docDefinition).open();
    }
  }


