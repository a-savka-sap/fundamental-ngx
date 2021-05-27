import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation,
    EventEmitter,
    Output,
    AfterViewInit,
    ChangeDetectorRef
} from '@angular/core';
import { applyCssClass, CssClassBuilder } from '../utils/public_api';

let messageStripUniqueId = 0;
let messageStripContentUniqueId = 0;
let messageStripCustomAriaLabelUniqueId = 0;

/**
 * The component that represents a message-strip. It can only be used inline.
 */
@Component({
    selector: 'fd-message-strip',
    templateUrl: './message-strip.component.html',
    styleUrls: ['./message-strip.component.scss'],
    host: {
        '[style.width]': 'width',
        '[style.min-width]': 'minWidth',
        '[style.margin-bottom]': 'marginBottom',
        '[attr.id]': 'id'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageStripComponent implements OnInit, AfterViewInit, OnChanges, CssClassBuilder {
    /** User's custom classes */
    @Input()
    class = '';

    /** Whether the message strip is dismissible. */
    @Input()
    dismissible = true;

    /** The default message strip does not have an icon.
     * The other types (warning, success, information and error) have icons by default.
     * To remove the icon set the property to true.
     */
    @Input()
    noIcon = false;

    /** The type of the message strip.
     * Can be one of *warning*, *success*, *information*, *error* or null.
     */
    @Input()
    type: string;

    /** Id for the message-strip component. If omitted, a unique one is generated. */
    @Input()
    id: string = 'fd-message-strip-' + messageStripUniqueId++;

    /** Id of the element that labels the message-strip. */
    @Input()
    ariaLabelledBy: string = null;

    /** Aria label for the message-strip component element. If not specified, it will be set to the content. */
    @Input()
    ariaLabel: string = null;

    /** Aria label for the dismiss button. */
    @Input()
    dismissLabel = 'Dismiss';

    /** Width of the message-strip. */
    @Input()
    width: string;

    /** Minimum width of the message-strip. */
    @Input()
    minWidth: string;

    /** Margin bottom of the message-strip. */
    @Input()
    marginBottom: string;

    /** Event fired when the message-strip is dismissed. */
    @Output()
    onDismiss: EventEmitter<void> = new EventEmitter<void>();

    /** @hidden */
    _customAriaLabel: string = null;

    /** @hidden */
    _messageContentId: string = 'fd-message-strip-content' + messageStripContentUniqueId++;

    /** @hidden */
    _customAriaLabelId: string = 'fd-message-strip-custom-aria-label-element' + messageStripCustomAriaLabelUniqueId++;

    /** @hidden */
    constructor(private _cd: ChangeDetectorRef, private _elementRef: ElementRef) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        let ariaLabelledbyInternalID = '';
        if (this.ariaLabel) {
            this._customAriaLabel = this.ariaLabel;
            this._elementRef.nativeElement.setAttribute('aria-label', this.ariaLabel);
        }
        // if aria label is specified, screen reader should read out this content instead of the default behaviour
        // of reading the message strip text
        if (this._customAriaLabel) {
            ariaLabelledbyInternalID = this._customAriaLabelId;
        } else {
            ariaLabelledbyInternalID = this._messageContentId;
        }
        // if id is provided by user to associate this message strip, we include both ids
        if (this.ariaLabelledBy) {
            ariaLabelledbyInternalID += ' ' + this.ariaLabelledBy;
        }
        this._elementRef.nativeElement.setAttribute('aria-labelledby', ariaLabelledbyInternalID);
        this._cd.detectChanges();
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /**
     * Dismisses the message-strip.
     */
    dismiss(): void {
        this._elementRef.nativeElement.classList.add('fd-has-display-none');
        this._elementRef.nativeElement.classList.remove('fd-has-display-block');
        this.onDismiss.emit();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [
            'fd-message-strip',
            this.type ? `fd-message-strip--${this.type}` : '',
            this.dismissible ? 'fd-message-strip--dismissible' : '',
            this.noIcon ? 'fd-message-strip--no-icon' : '',
            this.class
        ];
    }

    /**
     * @hidden
     * get the message that screen reader should speak when icons or types are present
     */
    _getMessage(): string {
        let message = '';
        if (!this.type) {
            message = 'Normal Message Strip bar';
        } else if (this.type && this.noIcon) {
            message = 'Message Strip ' + this.type + ' bar';
        } else {
            message = 'Message Strip ' + this.type + ' bar with ' + this.type + ' icon';
        }
        return message;
    }
}
