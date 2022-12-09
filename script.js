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
	if (isNaN(Prev) || isNaN(Curr))
		throw 'Input includes incorrect symbols!'
	else
		return parseInt(Curr) - parseInt(Prev);
}


function CalculateResult() {
	try {
		let lightDiff = getDiff(document.getElementById('PMV_Light').value, document.getElementById('CMV_Light').value);
		let gasDiff = getDiff(document.getElementById('PMV_Gas').value, document.getElementById('CMV_Gas').value);
		let waterDiff = getDiff(document.getElementById('PMV_Water').value, document.getElementById('CMV_Water').value);

		if (lightDiff > 250)
			lightCost = (250 * document.getElementById('Light').value) + (lightDiff - 250) * document.getElementById('LightLarge').value;
		else
			lightCost = lightDiff * document.getElementById('Light').value;


		document.getElementById('Result').textContent = `Счет за свет: ${lightCost} руб.\nСчет за газ: ${gasDiff * document.getElementById('Gas').value} руб.\nСчет за воду: ${waterDiff * document.getElementById('Water').value} руб.`;

	} catch (exception) {
		alert(exception);
	}
}

