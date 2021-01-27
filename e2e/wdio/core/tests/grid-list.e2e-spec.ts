import { GridListPo } from '../pages/grid-list.po';
import {
    click, dragAndDrop, elementArray,
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength, getText,
    refreshPage,
    scrollIntoView, waitForClickable, waitForElDisplayed
} from '../../driver/wdio';

const {
    layoutPattern, singleSelectItems, multiSelectModeCheckboxes,
    moreButton, moreButtonItems, footer, gridListItemsByMode, deleteModeTitle, deleteItemButton, unreadStateItem,
    errorStateItem, lockedStateItemButton, lockedStateItemText, gridListsArray, gridListsTitle,
    multiSelectModeSelectedItems, errorStatusIndicator, warningStatusIndicator, neutralStatusIndicator,
    singleSelectItemsSelected, successStatusIndicator, dragAndDropItems
} = new GridListPo();

import { text, productTitle, textLocked, warningColor, successColor, neutralColor, errorColor, color, backGroundColor,
    fontWeight, bold, classAttribute, isSelected } from '../fixtures/appData/grid-list-content';

describe('Grid-list test suite', function() {
    const gridListPage: GridListPo = new GridListPo();

    beforeAll(() => {
        gridListPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForElDisplayed(layoutPattern);
    }, 1);

    it('Verify LTR / RTL orientation', () => {
        gridListPage.checkRtlSwitch();
    });

    it('Verify clicking on read-more button', () => {
        let defaultItemsQuantity = 5;
        for (let i = 0; i < 8; i++) {
            scrollIntoView(moreButton);
            click(moreButton);
            expect(getText(moreButton)).toContain(`${defaultItemsQuantity + 5} / 50`);
            expect(getElementArrayLength(moreButtonItems)).toEqual(defaultItemsQuantity + 5);
            defaultItemsQuantity += 5;
        }
        click(moreButton);
        expect(moreButton).not.toBeDisplayed();
    });

    it('Footer should be displayed and contain information', () => {
        expect(getText(footer)).toBe(text);
    });

    it('Verify each grid list contains product counter -> product counter should be displayed for all lists', () => {
        const arr = getElementArrayLength(gridListsArray);
        for (let i = 0; i < arr; i++) {
            expect(getText(gridListsTitle, i)).toContain(productTitle);
        }
    });

    it('Verify grid list contains product counter', () => {
        let productsQuantityFromTitle = getText(deleteModeTitle).replace(/\D/g, '');
        const itemsArray = elementArray(gridListItemsByMode('delete'));
        expect(productsQuantityFromTitle).toEqual(itemsArray.length.toString());
        for (let i = 0; i < itemsArray.length; i++) {
            scrollIntoView(deleteItemButton);
            click(deleteItemButton);
            productsQuantityFromTitle = getText(deleteModeTitle).replace(/\D/g, '');
            const newArray = elementArray(gridListItemsByMode('delete'));
            expect(productsQuantityFromTitle).toEqual(newArray.length.toString());
        }
    });

    it('Verify states', () => {
        expect(getCSSPropertyByName(unreadStateItem, fontWeight).value).toBe(bold);
        expect(getCSSPropertyByName(errorStateItem, color).value).toBe(warningColor);
        waitForClickable(lockedStateItemButton);
        expect(getText(lockedStateItemText)).toBe(textLocked);
    })

    it('Verify selecting multiple items in "Multi select mode" component -> Multiple items can be selected. Checkbox should be checked when item is selected', () => {
        const arrayLength = getElementArrayLength(gridListItemsByMode('multiSelect'));
        let selectedArrayLength = getElementArrayLength(multiSelectModeSelectedItems)
        expect(selectedArrayLength).toEqual(1);
        for (let i = 0; i < arrayLength; i++) {
            scrollIntoView(multiSelectModeCheckboxes, i);
            click(multiSelectModeCheckboxes, i);
        }
        selectedArrayLength = getElementArrayLength(multiSelectModeSelectedItems)
        expect(selectedArrayLength).toEqual(arrayLength - 1)
    });

    it('Verify corresponding indicator color should be displayed for all statuses', () => {
        expect(getCSSPropertyByName(successStatusIndicator, backGroundColor).value).toBe(successColor);
        expect(getCSSPropertyByName(warningStatusIndicator, backGroundColor).value).toBe(warningColor);
        expect(getCSSPropertyByName(errorStatusIndicator, backGroundColor).value).toBe(errorColor);
        expect(getCSSPropertyByName(neutralStatusIndicator, backGroundColor).value).toBe(neutralColor);
    });

    it('Verify selecting item in Single select mode component', () => {
        const items = getElementArrayLength(singleSelectItems);
        for (let i = 0; i < items; i++) {
            scrollIntoView(singleSelectItems, i);
            click(singleSelectItems, i);
            expect(getAttributeByName(singleSelectItems, classAttribute, i)).toContain(isSelected);
            expect(getElementArrayLength(singleSelectItemsSelected)).toEqual(1);
        }
    });

    it('User should be able to replace items order by drag and drop', () => {
        const itemsArr = getElementArrayLength(dragAndDropItems);
        for (let i = 0; i < itemsArr - 1; i++) {
            const firstItemTitle = getText(dragAndDropItems, i);
            const secondItemTitle = getText(dragAndDropItems, i + 1);
            dragAndDrop(dragAndDropItems, i, dragAndDropItems, i + 1);
            expect(getText(dragAndDropItems, i)).toBe(secondItemTitle);
            expect(getText(dragAndDropItems, i + 1)).toBe(firstItemTitle);
        }
    });
});
