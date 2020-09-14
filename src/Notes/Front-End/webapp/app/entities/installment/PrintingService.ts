import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PrintingService {

public print(printEl: HTMLElement) {
    let printContainer: HTMLElement = document.querySelector('#print-container');

    if (!printContainer) {
      printContainer = document.createElement('div');
      printContainer.id = 'print-container';
    }

    printContainer.innerHTML = '';

    const elementCopy = printEl.cloneNode(true);
    printContainer.appendChild(elementCopy);
    document.body.appendChild(printContainer);

    window.print();
  }
}
