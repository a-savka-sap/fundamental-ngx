import { InfoLabelPO } from '../pages/info-label.po';
import {
    ariaLabelExample,
    ariaLabelledByAttribute,
    ariaSuccessLabel,
    backgroundColor,
    cssAlignmentAttribute,
    decimalLabel,
    defaultLabelText,
    infoLabelText,
    labelContentAlignment,
    labelIconAttribute,
    labelIconAttributeValue,
    largeNumberLabel,
    numberLabel,
    safariAriaLabelExample,
    safariAriaSuccessLabel,
    safariIconInfoLabelText,
    safariInfoLabelText,
    safariLargeNumberLabel,
    semanticColorsArr
} from '../fixtures/appData/info-label-page-contents';
import {
    browserIsSafari,
    elementArray,
    getAttributeByName,
    getCSSPropertyByName, getElementAriaLabel,
    getText,
    waitForElDisplayed
} from '../../driver/wdio';

describe('Info Label component test suite', () => {
    const {
        defaultLabel,
        labelsWithTextArr,
        labelsWithTextAndIconArr,
        labelsIconArr,
        labelsWithNumberOrIconArr,
        accessibilityLabelsArr,
        accessibilityAttrArr,
    } = new InfoLabelPO();
    const infoLabelPage = new InfoLabelPO();

    beforeEach(() => {
        infoLabelPage.open();
    }, 1);

    it('should check default label info', () => {
        expect(getText(defaultLabel).toLowerCase()).toEqual(defaultLabelText.toLowerCase());
        expect(getCSSPropertyByName(defaultLabel, cssAlignmentAttribute).value)
            .toEqual(labelContentAlignment);
    });

    it('should check info label with text', () => {
        const labelsArr = elementArray(labelsWithTextArr);
        if (browserIsSafari()) {
            for (let i = 0; i < labelsArr.length; i++) {
                expect(getText(labelsArr[i].selector)).toEqual(safariInfoLabelText);
                expect(getCSSPropertyByName(labelsWithTextArr, backgroundColor, i).value)
                    .toContain(semanticColorsArr[i].value);
                expect(getCSSPropertyByName(labelsWithTextArr, cssAlignmentAttribute, i).value)
                    .toEqual(labelContentAlignment);
            }
        } else {
            for (let i = 0; i < labelsArr.length; i++) {
                expect(getText(labelsArr[i].selector)).toEqual(infoLabelText);
                expect(getCSSPropertyByName(labelsWithTextArr, backgroundColor, i).value)
                    .toContain(semanticColorsArr[i].value);
                expect(getCSSPropertyByName(labelsWithTextArr, cssAlignmentAttribute, i).value)
                    .toEqual(labelContentAlignment);
            }
        }
    });

    it('should check info label with text and icon', () => {
        const labelsWithIconsArr = elementArray(labelsWithTextAndIconArr);
        const labelIconsArr = elementArray(labelsIconArr);

        if (browserIsSafari()) {
            for (let i = 0; i < labelsWithIconsArr.length; i++) {
                expect(getText(labelsWithTextAndIconArr, i)).toEqual(safariIconInfoLabelText);
                expect(getCSSPropertyByName(labelsWithTextAndIconArr, backgroundColor, i).value)
                    .toContain(semanticColorsArr[i].value);
                expect(getCSSPropertyByName(labelsWithTextAndIconArr, cssAlignmentAttribute, i).value)
                    .toEqual(labelContentAlignment);
                expect(getAttributeByName(labelsWithTextAndIconArr, labelIconAttribute, i))
                    .toBe(labelIconAttributeValue);

            }
            for (let i = 0; i < labelIconsArr.length; i++) {
                expect(waitForElDisplayed(labelsWithTextAndIconArr, i)).toBe(true);
            }
        } else {
            for (let i = 0; i < labelsWithIconsArr.length; i++) {
                expect(getText(labelsWithTextAndIconArr, i)).toEqual(infoLabelText);
                expect(getCSSPropertyByName(labelsWithTextAndIconArr, backgroundColor, i).value)
                    .toContain(semanticColorsArr[i].value);
                expect(getCSSPropertyByName(labelsWithTextAndIconArr, cssAlignmentAttribute, i).value)
                    .toEqual(labelContentAlignment);
                expect(getAttributeByName(labelsWithTextAndIconArr, labelIconAttribute, i))
                    .toBe(labelIconAttributeValue);

            }
            for (let i = 0; i < labelIconsArr.length; i++) {
                expect(waitForElDisplayed(labelsWithTextAndIconArr, i)).toBe(true);
            }
        }
    });

    it('should check info label with a number or an icon', () => {
        if (browserIsSafari()) {

            expect(getText(labelsWithNumberOrIconArr, 1)).toEqual(safariLargeNumberLabel);
            expect(getText(labelsWithNumberOrIconArr, 0)).toEqual(numberLabel);
            expect(getText(labelsWithNumberOrIconArr, 2)).toEqual(decimalLabel);
            expect(getAttributeByName(labelsWithNumberOrIconArr, labelIconAttribute, 3))
                .toEqual(labelIconAttributeValue);
        } else {
            expect(getText(labelsWithNumberOrIconArr, 1)).toEqual(largeNumberLabel);
            expect(getText(labelsWithNumberOrIconArr, 0)).toEqual(numberLabel);
            expect(getText(labelsWithNumberOrIconArr, 2)).toEqual(decimalLabel);
            expect(getAttributeByName(labelsWithNumberOrIconArr, labelIconAttribute, 3))
                .toEqual(labelIconAttributeValue);
        }
    });

    it('should check info label with aria label for accessibility', () => {
        const ariaAttrArr = elementArray(accessibilityAttrArr);

        if (browserIsSafari()) {
            expect(getElementAriaLabel(accessibilityLabelsArr)).not.toBe(null);
            expect(getAttributeByName(accessibilityLabelsArr, ariaLabelledByAttribute, 1))
                .not.toBe(null);

            expect(getText(accessibilityLabelsArr, 0)).toEqual(safariAriaLabelExample);
            expect(getText(accessibilityLabelsArr, 1)).toEqual(safariAriaSuccessLabel);

            for (let i = 0; i < ariaAttrArr.length; i++) {
                expect(getCSSPropertyByName(accessibilityAttrArr, backgroundColor, i).value)
                    .toContain(semanticColorsArr[1].value);
            }
        } else {
            expect(getElementAriaLabel(accessibilityLabelsArr)).not.toBe(null);
            expect(getAttributeByName(accessibilityLabelsArr, ariaLabelledByAttribute, 1))
                .not.toBe(null);

            expect(getText(accessibilityLabelsArr, 0)).toEqual(ariaLabelExample);
            expect(getText(accessibilityLabelsArr, 1)).toEqual(ariaSuccessLabel);

            for (let i = 0; i < ariaAttrArr.length; i++) {
                expect(getCSSPropertyByName(accessibilityAttrArr, backgroundColor, i).value)
                    .toContain(semanticColorsArr[1].value);
            }
        }
    });

    it('should check LTR and RTL orientation', () => {
        infoLabelPage.checkRtlSwitch();
    });

    it('should check examples basic visual regression', () => {
        infoLabelPage.saveExampleBaselineScreenshot();
        expect(infoLabelPage.compareWithBaseline()).toBeLessThan(3);
    });
});
