import puppeteer from 'puppeteer';
import { delay } from './utils';

async function main() {
	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport: null,
	});
	const page = await browser.newPage();

	await page.goto('http://swap.defillama.com/');

	// chain field
	const inputElement = await page.$('input#react-select-2-input');
	await inputElement.click();
	await inputElement.type('Arbitrum One');

	const divOption = await page.$(
		'div#react-select-2-listbox > div > div#react-select-2-option-4'
	);
	await divOption.click();

	// you sell field
	await delay(1000);
	await page.locator('input.chakra-input.css-lv0ed5').fill('12');

	const youSellBtn = await page.waitForSelector(
		'button.chakra-button.css-qjhap'
	);
	await youSellBtn.click();

	const searchToken = await page.waitForSelector(
		'input.chakra-input.css-s1d1f4'
	);
	await searchToken.type('Wrapped BTC');

	await delay(500);

	const token = await page.$('div.List > div > div');
	await token.click();

	// you buy field
	const selectTokenButtons = await page.$$('button.chakra-button.css-qjhap');
	const youBuyBtn = selectTokenButtons[1];
	await youBuyBtn.click();

	const searchToken2 = await page.waitForSelector(
		'input.chakra-input.css-s1d1f4'
	);
	await searchToken2.type('USDC');
	await delay(500);

	const tokens = await page.$$('div.List > div > div');
	for (let token of tokens) {
		const text = await token.evaluate(
			(el) => el.querySelector('p > span').textContent
		);
		if (text.includes('(USDC)')) {
			await token.click();
			break;
		}
	}

	await delay(12000);

	// select route
	const routes = await page.$$('div.sc-55ee4011-2.fcGAPg > div.RouteWrapper');
	console.log(
		await routes[1].evaluate(
			(el) => el.querySelector('div:last-child > p > p > p').textContent
		)
	);

	await routes[1].click();
}

main();
