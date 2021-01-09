import {
    Directive, ElementRef, Input, AfterViewInit, OnDestroy, Renderer2, Output,
    EventEmitter, OnInit, AfterContentInit, ChangeDetectorRef
} from '@angular/core';
import { UtilityService } from '../services/providers/utility.service';

@Directive({
    selector: '[appWatchElement]'
})
export class WatchElementDirective implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
    private el: HTMLElement;
    // renderer: Renderer2;
    @Input() state = false;
    refreshCount = 0;


    @Output() isOut = new EventEmitter<boolean>();

    constructor(
        renderer: Renderer2,
        el: ElementRef,
        private cdr: ChangeDetectorRef
    ) {
        this.el = el.nativeElement;
        // this.renderer = renderer;
    }


    // @Input() fixedMenuTop: string;
    @Input() elementId: string;
    // @Input() myClass: string;
    menuObserver: { observer: IntersectionObserver, element: any };

    ngOnInit() {
    }

    ngAfterContentInit(): void {
        this.run();

    }

    ngAfterViewInit() {
        this.run();
    }

    ngOnDestroy() {
        // if (this.menuObserver) {
        //     this.menuObserver?.observer?.unobserve(this.menuObserver?.element);
        // }
    }

    run() {
        // if (this.menuObserver) {
        //     this.menuObserver?.observer?.unobserve(this.menuObserver?.element);
        // }
        setTimeout(() => {
            this.menuObserver = UtilityService.monitorElementOutOfView(this.elementId, () => {
                if (this.refreshCount > 1) {
                    this.isOut.emit(!this.state);
                    this.cdr.detectChanges();
                }
                this.refreshCount += 1;
                console.log(this.refreshCount);

            }, () => {
                if (this.refreshCount > 1) {
                    this.isOut.emit(this.state);
                    this.cdr.detectChanges();
                }
                this.refreshCount += 1;
                console.log(this.refreshCount);

            }, 0.02);
        }, 100);
    }

}

