import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class ComboboxPo extends CoreBaseComponentPo {
    url = '/combobox';
    root = '#page-content';

    dropdownPopover = 'fd-popover-body';
    dropdownPopoverOption = 'li.fd-list__item';
    smallText = 'div~small';
    smallText_2 = 'fd-combobox~small';
    allInputFields = this.root + ' .fd-input.fd-input-group__input';
    disableInputFields = '.fd-popover-custom--disabled fd-input-group';
    activeInputButton = '//button[contains(@class, \'fd-input-group\') and not (contains(@class, \'is-disabled\'))]';
    mobileButton = '.cdk-drag-disabled button';
    mobileTitle = 'h1.fd-title--h5';
    '#page-content .fd-input.fd-input-group__input';
    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'combobox'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'combobox'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
