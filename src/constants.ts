import { PuppeteerLaunchOptions } from 'puppeteer';

/**
 * User data for the [UserData.webUrl] form and launch options.
 */
export class UserData {
	static webUrl = 'http://swap.defillama.com/';
	static options: PuppeteerLaunchOptions = {
		headless: false,
		defaultViewport: null,
	};

	static chain = 'Arbitrum One';
	static youSellAmount = '12';
	static youSellToken = 'Wrapped BTC';
	static youBuyToken = 'USDC';
}

/**
 * Selectors for the [UserData.webUrl] website.
 */
export class Selectors {
	/**
	 * The selector for the chain field.
	 */
	static chainFieldInput = 'input#react-select-2-input';

	/**
	 * The selector for the chain field option. specific to [UserData.chain]
	 */
	static chainFieldOption =
		'div#react-select-2-listbox > div > div#react-select-2-option-4';

	/**
	 * The selector for the you sell field.
	 */
	static youSellFieldInput = 'input.chakra-input.css-lv0ed5';

	/**
	 * The selector for the select token button.
	 */
	static selectTokenBtn = 'button.chakra-button.css-qjhap';

	/**
	 * The selector for the token div.
	 */
	static selectTokenDiv = 'div.List > div > div';

	/**
	 *  The selector for the search token input.
	 */
	static searchTokenInput = 'input.chakra-input.css-s1d1f4';

	/**
	 *  The selector for a route.
	 */
	static routeOption = 'div.sc-55ee4011-2.fcGAPg > div.RouteWrapper';
}
