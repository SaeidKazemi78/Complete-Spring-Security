import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { News } from './news.model';
import { NewsService } from './news.service';
import {getPath} from 'app/core/router';

@Injectable({ providedIn: 'root' })
export class NewsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router,
    private newsService: NewsService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.newsService.find(id).subscribe(news => {
                    this.ngbModalRef = this.newsModalRef(component, news.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const news = new News();
                    this.ngbModalRef = this.newsModalRef(component, news);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    newsModalRef(component: Component, news: News): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.news = news;
        modalRef.result.then(result => {
            this.closeModal(news);
        },reason => {
            this.closeModal(news);
        });
        return modalRef;
    }

    closeModal(news) {
        this.router.navigate([...getPath(this.router, '/').pathParts, { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
        this.ngbModalRef = null;
    }

}
