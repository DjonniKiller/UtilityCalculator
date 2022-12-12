function calc_result() {
	const lightTariff = parseFloat($('#light_tariff').val());
	const lightOverTariff = parseFloat($('#light_over_tariff').val());
	const gasTariff = parseFloat($('#gas_tariff').val());
	const waterTariff = parseFloat($('#water_tariff').val());

	const tariffs =
	{
		lightTariff: parseFloat($('#light_tariff').val()),
		lightOverTariff: parseFloat($('#light_over_tariff').val()),
		gasTariff: parseFloat($('#gas_tariff').val()),
		waterTariff: parseFloat($('#water_tariff').val())
	}

	const prevMeterData =
	{
		light: parseFloat($('#ligth_prev_meter').val()),
		gas: parseFloat($('#gas_prev_meter').val()),
		water: parseFloat($('#water_prev_meter').val())
	}

	const currMeterData =
	{
		light: parseFloat($('#ligth_curr_meter').val()),
		gas: parseFloat($('#gas_curr_meter').val()),
		water: parseFloat($('#water_curr_meter').val())
	}

	const result = $('#result_output');

	const lightParamsDiff = currMeterData.light - prevMeterData.light;
	const gasParamsDiff = currMeterData.gas - prevMeterData.gas;
	const waterParamsDiff = currMeterData.water - prevMeterData.water;


	if (lightParamsDiff > 250)
		lightCost = 250 * tariffs.lightTariff + (lightParamsDiff - 250) * tariffs.lightOverTariff;
	else lightCost = lightParamsDiff * tariffs.lightTariff;

	const gasCost = gasParamsDiff * tariffs.gasTariff;
	const waterCost = waterParamsDiff * tariffs.waterTariff;

	let resultString = `Расчет стоимости света: `;
	resultString += `${currMeterData.light} - ${prevMeterData.light} = ${lightParamsDiff} ; `;

	if (lightParamsDiff > 250) {
		resultString += `250кВатт считаются по обычному тарифу, а все, что свыше - по увеличенному\n`;
		resultString += `250 * ${tariffs.lightTariff} + (${lightParamsDiff} - 250) * ${tariffs.lightOverTariff}`;
	}
	else {
		resultString += `${lightParamsDiff} считаются по обычному тарифу\n`;
		resultString += `${lightParamsDiff} * ${tariffs.lightTariff}\n`;
	}

	resultString += `Итого, цена за свет = ${lightCost}\n\n`;
	resultString += `Расчет стоимости газа:`;

	$('#popup').css('display', 'flex');
	result.val(resultString);
	$('form').css('display', 'none');
}

function returnHome() {
	location.reload();
}