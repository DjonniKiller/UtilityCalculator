// Напиши небольшой калькулятор коммунальных услуг.
// У тебя должно быть 3 итоговых значения: Свет, Газ, Вода
// Я могу задавать значения тарифа сам, но изначально везде должны быть тарифы по умолчанию.

// * ПЗС - прошлое значение счётчика, * ТЗС - текущее значения счётчика
// Формулы для расчёта.
// Вода -> (ТЗС - ПЗС) * тариф
// Газ -> (ТЗС - ПЗС) * тариф
// Свет -> Сперва нужно вычесть из ТЗС - ПЗС и получить кол-во киловат. Далее если киловаты превышают 250, то в таком случае
// необходимо от килловат вычесть 250, полученное значение умножить на тариф1. Далее  250 необходимо умножить на тариф2. Оба итоговых значения сложить.
// Тарифы можешь ставить произвольные.
function getDiff(Prev, Curr) {
	if (isNaN(Prev) || isNaN(Curr) || Prev === '' || Curr === '')
		throw 'Input includes incorrect symbols!'
	else
		return parseInt(Curr) - parseInt(Prev);
}


function CalculateResult() {
	try {
		// Показания счётчиков
		const lightMetterPrev = parseFloat($('#PMV_Light').val());
		const lightMetterCurr = parseFloat($('#CMV_Light').val());
		const gazMetterPrev = parseFloat($('#PMV_Gas').val());
		const gazMetterCurr = parseFloat($('#CMV_Gas').val());
		const waterMewtterPrev = parseFloat($('#PMV_Water').val());
		const waterMewtterCurr = parseFloat($('#CMV_Water').val());
		
		// Тарифы
		const tarifLight = parseFloat($('#Light').val());
		const tarifLightOver = parseFloat($('#LightLarge').val());
		const tarifGaz = parseFloat($('#Gas').val());
		const tarifWater = parseFloat($('#Water').val());

		// Поле результата
		const resultField = $('#Result');
		
		// Разница показаний
		let lightMetterDiff = getDiff(lightMetterPrev, lightMetterCurr);
		let gasMetterDiff = getDiff(gazMetterPrev, gazMetterCurr);
		let waterMetterDiff = getDiff(waterMewtterPrev, waterMewtterCurr);
		
		// Вычисления
		if (lightMetterDiff > 250)
			lightCost = (250 * tarifLight) + ((lightMetterDiff - 250) * tarifLightOver);
		else lightCost = lightMetterDiff * tarifLight;
		
		const gazCost = gasMetterDiff * tarifGaz;
		const waterCost = waterMetterDiff * tarifWater;
		

		// Вывод результата
		let resultString = `Счет за свет: ${lightCost.toFixed(2)} руб.`;
		resultString += `\nСчет за газ: ${gazCost.toFixed(2)} руб.`; 
		resultString += `\nСчет за воду: ${waterCost.toFixed(2)} руб.`;
		resultField.val(resultString);  

	} catch (e) {
		const error = new Error(e);
		alert(error.message);
	}
}

