
import { expect } from "@playwright/test";
export default class ElementsPage {

    constructor(page) {
        this.page = page;
        this.cards = page.locator('.card.mt-4.top-card h5');
         this.elementsCard = page.getByText('Elements', { exact: true });
        
    }

    async clickElementsCard() {
    await this.elementsCard.click();
}
    async validateElementsPageCards() {

        const expectedCards = [
            'Elements',
            'Forms',
            'Alerts, Frame & Windows',
            'Widgets',
            'Interactions',
            'Book Store Application'
        ];

        await expect(this.elementsCard).toBeVisible();
        await expect(this.cards).toHaveCount(expectedCards.length);
        const actualCards = await this.cards.allTextContents();
        expect(actualCards).toEqual(expectedCards);
    }

}


