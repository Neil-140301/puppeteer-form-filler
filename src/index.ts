import {
	delay,
	enterChainField,
	enterYouBuyField,
	enterYouSellField,
	initializeBrowserPage,
	selectRoute,
} from './utils';

(async function () {
	// launch browser
	const page = await initializeBrowserPage();

	// chain field
	await enterChainField(page);

	// wait for ui to update
	await delay(1000);

	// you sell field
	await enterYouSellField(page);

	// you buy field
	await enterYouBuyField(page);

	// wait for ui to update with best routes
	await delay(10000);

	// select route
	await selectRoute(page);

	// end
	console.log('Program complete. Leaving browser open.');
})();
