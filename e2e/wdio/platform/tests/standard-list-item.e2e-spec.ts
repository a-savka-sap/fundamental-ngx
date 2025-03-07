import { StandardListItemPo } from '../pages/standard-list-item.po';
import { click, getAttributeByName, getCSSPropertyByName, getElementArrayLength, getText } from '../../driver/wdio';
import {
    borderAttr,
    byLineAltAttr,
    byLineAttr,
    compactAttr,
    linkAttr,
    noBorderAttr,
    noStyle,
    secondaryAttr,
    secondaryTypes,
    solidStyle
} from '../fixtures/appData/standard-link-item-contents';
import {
    checkAttributeValueTrue,
    checkElArrIsClickable,
    checkElementDisplayed,
    checkElementText
} from '../../helper/assertion-helper';

describe('Standard List Item test suite:', function() {
    const standardListPage = new StandardListItemPo();
    const {
        sNoBorderList, sNoBorderAttr, sNoBorderByLineList, sNoBorderByLineAttr, sNoBorderAvatar, sNoBorderByLineSection,
        sFooterByLineList, sFooterByLineAvatar, sFooter, sFooterList, sFooterAttr, sGroupHeaderList, sGroupHeaderAttr,
        sGroupHeaderAvatar, sInteractiveAttr, sInteractiveList, sInteractiveLink, sInteractiveAvatar, sSecTypeAttr,
        sSecTypeList, sSecTypeAvatar, sSecTypeListItem, sMultiAttr, sMultiList, sMultiAvatar, sMultiToolbar,
        sMultiCheckbox, sInvtAttr, sInvtList, sInvtAvatar, sInvtListItem
    } = standardListPage;

    beforeAll(() => {
        standardListPage.open();
    }, 1);

    describe('Standard List Item - Border Less examples:', function() {
        it('should check border and interactions', () => {
            expect(getAttributeByName(sNoBorderAttr, noBorderAttr)).toBe('true');
            expect(getCSSPropertyByName(sNoBorderList, borderAttr).value)
                .toBe(noStyle);
            checkElArrIsClickable(sNoBorderList);
        });
    });

    describe('Standard List Item (ByLine)- Border Less examples:', function() {
        it('should check border and styles', () => {
            expect(getAttributeByName(sNoBorderByLineAttr, noBorderAttr))
                .toBe('true');
            expect(getCSSPropertyByName(sNoBorderByLineList, borderAttr).value)
                .toBe(noStyle);
            expect(getAttributeByName(sNoBorderByLineSection, compactAttr, 0))
                .toBe('false');
            expect(getAttributeByName(sNoBorderByLineSection, compactAttr, 1))
                .toBe('true');
            checkAttributeValueTrue(sNoBorderByLineAttr, byLineAltAttr);
        });

        it('should check interaction and content', () => {
            checkElArrIsClickable(sNoBorderByLineList);
            checkElementText(sNoBorderByLineList);
            checkElementDisplayed(sNoBorderAvatar);
        });
    });

    describe('Standard List Item (ByLine)- Footer examples:', function() {
        it('should check border, styles, and footer', () => {
            expect(getCSSPropertyByName(sFooterByLineList, borderAttr).value)
                .toBe(solidStyle);
            checkAttributeValueTrue(sFooterAttr, byLineAttr);
            checkElementDisplayed(sFooter);
            checkElementText(sFooterList);
        });

        it('should check content and interaction', () => {
            checkElementText(sFooterByLineList);
            checkElementDisplayed(sFooterByLineAvatar);
            checkElArrIsClickable(sFooterByLineList);
        });
    });

    describe('Standard List Item (ByLine)- Group header examples:', function() {
        it('should check border and styles', () => {
            expect(getCSSPropertyByName(sGroupHeaderList, borderAttr).value)
                .toBe(solidStyle);
            checkAttributeValueTrue(sGroupHeaderAttr, byLineAttr);
        });

        it('should check content and interactions', () => {
            checkElementText(sGroupHeaderList);
            checkElementDisplayed(sGroupHeaderAvatar);
            checkElArrIsClickable(sGroupHeaderList);
        });
    });

    describe('Standard List Item- Interactive state examples:', function() {
        it('should check border and styles', () => {
            expect(getCSSPropertyByName(sInteractiveList, borderAttr).value)
                .toBe(solidStyle);
            checkAttributeValueTrue(sInteractiveAttr, byLineAltAttr);
            const linkCount = getElementArrayLength(sInteractiveLink);
            for (let i = 0; linkCount > i; i++) {
                expect(getAttributeByName(sInteractiveLink, linkAttr, i))
                    .not.toBe(null, '');
            }
        });

        it('should check content and interactions', () => {
            checkElementDisplayed(sInteractiveList);
            checkElementDisplayed(sInteractiveLink);
            checkElementDisplayed(sInteractiveAvatar);
            checkElArrIsClickable(sInteractiveList);
            checkElArrIsClickable(sInteractiveLink);
            checkElementText(sInteractiveList);
        });
    });

    describe('Standard List Item (ByLine)- Secondary text types examples:', function() {
        it('should check border and styles', () => {
            checkAttributeValueTrue(sSecTypeAttr, byLineAltAttr);
            expect(getCSSPropertyByName(sSecTypeList, borderAttr).value)
                .toBe(solidStyle);

        });

        it('should check content and interactions', () => {
            checkElementDisplayed(sSecTypeAvatar);
            checkElementDisplayed(sSecTypeList);
            checkElArrIsClickable(sSecTypeList);
            checkElementText(sSecTypeList);
        });

        it('should check secondary text types', () => {
            const elCount = getElementArrayLength(sSecTypeListItem);
            for (let i = 0; elCount > i; i++) {
                expect(getAttributeByName(sSecTypeListItem, secondaryAttr, i))
                    .toBe(secondaryTypes[i]);
            }
        });
    });

    describe('Standard List Item (ByLine)- Multi Selection examples:', function() {
        it('should check border and styles', () => {
            checkAttributeValueTrue(sMultiAttr, byLineAltAttr);
            expect(getCSSPropertyByName(sMultiList, borderAttr).value)
                .toBe(solidStyle);
        });

        it('should check content and basic interactions', () => {
            checkElementDisplayed(sMultiAvatar);
            checkElementDisplayed(sMultiList);
            checkElementText(sMultiList);
            checkElementDisplayed(sMultiToolbar);
            checkElementText(sMultiToolbar);
            checkElArrIsClickable(sMultiList);
            checkElArrIsClickable(sMultiCheckbox);
        });

        it('should check selected item count is displayed in the toolbar', () => {
            expect(getText(sMultiToolbar)).toContain('0 : Items selected');
            click(sMultiCheckbox, 0);
            expect(getAttributeByName(sMultiCheckbox, 'aria-selected')).toBe('true');
            expect(getText(sMultiToolbar)).toContain('1 : Items selected');
        });
    });

    describe('Standard List Item (ByLine)- Inverted Secondary text types examples:', function() {
        it('should check border and styles', () => {
            if (browser.capabilities.browserName === 'internet explorer') {
                console.log('skip');
            } else {
                checkAttributeValueTrue(sInvtAttr, byLineAltAttr);
                expect(getCSSPropertyByName(sInvtList, borderAttr).value)
                    .toBe(solidStyle);
            }
        });

        it('should check content and interactions', () => {
            checkElementDisplayed(sInvtAvatar);
            checkElementDisplayed(sInvtList);
            checkElArrIsClickable(sInvtList);
            checkElementText(sInvtList);
        });

        it('should check secondary text types', () => {
            const elCount = getElementArrayLength(sInvtListItem);
            for (let i = 0; elCount > i; i++) {
                expect(getAttributeByName(sInvtListItem, secondaryAttr, i))
                    .not.toBe(null, '');
                expect(getAttributeByName(sInvtListItem, secondaryAttr, i))
                    .toBe(secondaryTypes[i]);
            }
        });
    });

    describe('Check orientation', function() {
        it('should check RTL and LTR orientation', () => {
            standardListPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            standardListPage.saveExampleBaselineScreenshot('standard-list-item', {removeElements: $(standardListPage.sFooterByLineAvatar)});
            expect(standardListPage.compareWithBaseline('standard-list-item', {removeElements: $(standardListPage.sFooterByLineAvatar)})).toBeLessThan(5);
        });
    });
});
