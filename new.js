$(function () {
	// Обработка submit формы
	$('#form').submit(function (event) {
		event.preventDefault();

		// // Валидация
		// const inputs =
		// 	[
		// 		parseFloat($('#light_tariff').val()),
		// 		parseFloat($('#light_over_tariff').val()),
		// 		parseFloat($('#gas_tariff').val()),
		// 		parseFloat($('#water_tariff').val()),
		// 		parseFloat($('#ligth_prev_meter').val()),
		// 		parseFloat($('#gas_prev_meter').val()),
		// 		parseFloat($('#water_prev_meter').val()),
		// 		parseFloat($('#ligth_curr_meter').val()),
		// 		parseFloat($('#gas_curr_meter').val()),
		// 		parseFloat($('#water_curr_meter').val())
		// 	];

		// if (inputs.some((el) => el < 0))
		// 	alert('Inputs contain negative value!');
		// else {
			// Расчет
			calc_result();

			// Показ модального окна
			$('.js-modal').addClass('is-show');
			$('.js-modal-overlay').addClass('is-show');
		//}
	});

	// Обработчик нажатия на модальный крест
	$('.js-modal-close').click(function () {
		$(this).parent().removeClass('is-show');
		$('.js-modal-overlay').removeClass('is-show');
	});

	// Обработчик нажатия на модальную подложку
	$('.js-modal-overlay').click(function () {
		$('.js-modal').removeClass('is-show');
		$('.js-modal-overlay').removeClass('is-show');
	});

	$('#form').validate({
		rules: {
			light_tariff: {
				min: 6
			},
			ligth_prev_meter: {
				required: true,
			}
		}, 
		messages: {
			light_tariff: 'Минимальная длина должна быть больше 6!'
		}
	});
});

function calc_result() {
	// Тарифы
	const tariffs =
	{
		lightTariff: parseFloat($('#light_tariff').val()),
		lightOverTariff: parseFloat($('#light_over_tariff').val()),
		gasTariff: parseFloat($('#gas_tariff').val()),
		waterTariff: parseFloat($('#water_tariff').val())
	};

	// Предыдущие показания счетчика
	const prevMeterData =
	{
		light: parseFloat($('#ligth_prev_meter').val()),
		gas: parseFloat($('#gas_prev_meter').val()),
		water: parseFloat($('#water_prev_meter').val())
	};

	// Текущие показания счетчика
	const currMeterData =
	{
		light: parseFloat($('#ligth_curr_meter').val()),
		gas: parseFloat($('#gas_curr_meter').val()),
		water: parseFloat($('#water_curr_meter').val())
	};

	// Результат
	const result = $('#result');

	// Разница показаний счетчика
	const lightParamsDiff = currMeterData.light - prevMeterData.light;
	const gasParamsDiff = currMeterData.gas - prevMeterData.gas;
	const waterParamsDiff = currMeterData.water - prevMeterData.water;

	// Расчет стоимости показаний
	if (lightParamsDiff > 250)
		lightCost = 250 * tariffs.lightTariff + (lightParamsDiff - 250) * tariffs.lightOverTariff;
	else lightCost = lightParamsDiff * tariffs.lightTariff;

	const gasCost = gasParamsDiff * tariffs.gasTariff;
	const waterCost = waterParamsDiff * tariffs.waterTariff;


	// Формирование результирующей строки
	let resultString = `Расчет стоимости света: `;
	resultString += `${currMeterData.light} - ${prevMeterData.light} = ${lightParamsDiff};\n`;

	if (lightParamsDiff > 250) {
		resultString += `250кВатт считается по обычному тарифу, а все, что свыше - по увеличенному: `;
		resultString += `250 * ${tariffs.lightTariff} + (${lightParamsDiff} - 250) * ${tariffs.lightOverTariff}`;
	}
	else {
		resultString += `${lightParamsDiff} считается по обычному тарифу: `;
		resultString += `${lightParamsDiff} * ${tariffs.lightTariff}`;
	}

	resultString += `\n=> Итого, цена за свет = ${lightCost}\n\n`;

	resultString += `Расчет стоимости газа: `;
	resultString += `${currMeterData.gas} - ${prevMeterData.gas} = ${gasParamsDiff};\n`;
	resultString += `${gasParamsDiff} считается по обычному тарифу: `;
	resultString += `${gasParamsDiff} * ${tariffs.gasTariff} `;
	resultString += `\n=> Итого, цена за газ = ${gasCost}\n\n`;

	resultString += `Расчет стоимости воды: `;
	resultString += `${currMeterData.water} - ${prevMeterData.water} = ${waterParamsDiff};\n`;
	resultString += `${waterParamsDiff} считается по обычному тарифу: `;
	resultString += `${waterParamsDiff} * ${tariffs.waterTariff} `;
	resultString += `\n=> Итого, цена за воду = ${waterCost}\n\n`;

	// Вывод результата
	result.val(resultString);
}