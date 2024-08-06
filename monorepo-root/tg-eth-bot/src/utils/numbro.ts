import numbro from 'numbro';

/**
 * 格式化数字
 * @param value
 */
export const formatNumbro = (value: any) => {
	const numberValue = numbro(value).value();
	if (numberValue > 0 && numberValue < 1) {
		const [integer, decimal] = numberValue.toString().split('.');
		const firstNonZeroIndex = decimal.search(/[^0]/);
		return firstNonZeroIndex === 0 ?
			`${integer}.${decimal.slice(firstNonZeroIndex, firstNonZeroIndex + 2)}` :
			`${integer}.{${firstNonZeroIndex}}${decimal.slice(firstNonZeroIndex, firstNonZeroIndex + 2)}`;
	}
	return numbro(numberValue)
		.format({
			mantissa: 2,
			trimMantissa: true,
			average: true,
		})
		.toUpperCase();
};

/**
 * 格式化人数
 * @param value
 */
export const formatPeoples = (value: any) => {
	return numbro(value).format({ thousandSeparated: true });
};

export const diff = (value: any, value2: any): number => {
	return numbro(value).subtract(numbro(value2).value()).value();
};

export const diffPercent = (value: any, value2: any): string => {
	return percent(
		numbro(
			diff(value, value2)
		).divide(
			numbro(value2).value()
		)
	);
};

export const percent = (value: any): string => {
	return numbro(value).format({
		output: 'percent',
		mantissa: 2,
	});
};