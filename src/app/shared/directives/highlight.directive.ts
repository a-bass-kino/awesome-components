import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
    selector:'[highlight]'
})
export class HighlightDirective implements AfterViewInit {

    @Input() color = 'yellow'

    constructor(private el: ElementRef,
        private renderer: Renderer2
    ) {

    }

    ngAfterViewInit(): void {
        this.setBackgroundColor(this.color)
    }

    setBackgroundColor(color:string) {
        this.renderer.setStyle(this.el.nativeElement, 'background-color', color )
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.setBackgroundColor('lightpink')
    }

    @HostListener('mouseleave') onMouseLever() {
        this.setBackgroundColor(this.color)
    }

    @HostListener('click') onClick() {
        this.color = 'lightpink'
    }

}