export async function delay(amount: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, amount);
	});
}
