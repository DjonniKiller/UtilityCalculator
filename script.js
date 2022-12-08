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
function getDiff(Prev, Curr){
    if (isNaN(Prev) || isNaN(Curr))
        throw 'Input includes incorrect symbols!'
    else
        return parseInt(Curr) - parseInt(Prev); 
}


function CalculateResult(){
    let result = document.getElementById('Result');
    let lightTariff = document.getElementById('Light').value;
    let waterTariff = document.getElementById('Water').value;
    let lightLargeTariff = document.getElementById('LightLarge').value;
    let gasTariff = document.getElementById('Gas').value;

    try{
        let lightDiff = getDiff(document.getElementById('PMV_Light').value, document.getElementById('CMV_Light').value);
        let gasDiff = getDiff(document.getElementById('PMV_Gas').value, document.getElementById('CMV_Gas').value);
        let waterDiff = getDiff(document.getElementById('PMV_Water').value, document.getElementById('CMV_Water').value);

        if (lightDiff > 250)
            lightCost = (250 * lightTariff) + (lightDiff - 250) * lightLargeTariff;
        else
            lightCost = lightDiff * lightTariff;
        
        
        result.textContent = `Счет за свет: ${lightCost} руб.\nСчет за газ: ${gasDiff * gasTariff} руб.\nСчет за воду: ${waterDiff * waterTariff} руб.`;
    }catch(exception){
        alert(exception);
    }  
}

