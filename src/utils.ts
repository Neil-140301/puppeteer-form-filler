import puppeteer, { Page } from 'puppeteer';
import { Selectors, UserData } from './constants';

/**
 * Adds a delay to the current thread.
 * @param amount The amount of time to delay in milliseconds.
 * @returns A promise that resolves after the delay.
 */
export async function delay(amount: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, amount);
	});
}

/**
 * Launches a puppeteer browser and navigates to the desired page.
 * @returns A puppeteer page.
 */
export async function initializeBrowserPage() {
	const browser = await puppeteer.launch(UserData.options);
	const [page] = await browser.pages();
	await page.goto(UserData.webUrl);
	return page;
}

/**
 * Enters the desired chain field value.
 * @param page A puppeteer page.
 */
export async function enterChainField(page: Page) {
	const inputElement = await page.$(Selectors.chainFieldInput);
	await inputElement.click();
	await inputElement.type(UserData.chain);

	const divOption = await page.$(Selectors.chainFieldOption);
	await divOption.click();
}

/**
 * Enters the desired you sell field value.
 * @param page A puppeteer page.
 */
export async function enterYouSellField(page: Page) {
	await page.locator(Selectors.youSellFieldInput).fill(UserData.youSellAmount);

	// click the select token button
	const youSellBtn = await page.waitForSelector(Selectors.selectTokenBtn);
	await youSellBtn.click();

	// search for the token
	const searchToken = await page.waitForSelector(Selectors.searchTokenInput);
	await searchToken.type(UserData.youSellToken);

	// wait for ui to update with results
	await delay(500);

	const token = await page.$(Selectors.selectTokenDiv);
	await token.click();
}

/**
 * Enters the desired you buy field value.
 * @param page A puppeteer page.
 */
export async function enterYouBuyField(page: Page) {
	// click the select token button
	const selectTokenButtons = await page.$$(Selectors.selectTokenBtn);
	const youBuyBtn = selectTokenButtons[1];
	await youBuyBtn.click();

	// search for the token
	const searchToken = await page.waitForSelector(Selectors.searchTokenInput);
	await searchToken.type(UserData.youBuyToken);

	// wait for ui to update with results
	await delay(500);

	const tokens = await page.$$(Selectors.selectTokenDiv);
	for (let token of tokens) {
		const text = await token.evaluate(
			(el) => el.querySelector('p > span').textContent
		);
		if (text.includes('(USDC)')) {
			await token.click();
			break;
		}
	}
}

/**
 * Selects the desired route.
 * @param page A puppeteer page.
 */
export async function selectRoute(page: Page) {
	const routes = await page.$$(Selectors.routeOption);
	await routes[1].click();
}
