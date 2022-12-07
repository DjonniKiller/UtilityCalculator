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
    if (parseInt(Prev)!=Number() || parseInt(Curr)!=Number)
        throw 'Input includes incorrect symbols!'
    else
        return Curr - Prev; 
}


function CalculateResult(){
    let result = document.getElementById('Result');

    try{
        let LightDiff = getDiff(document.getElementById("PMV_Light").value, document.getElementById("CMV_Light").value);
        let GasDiff = getDiff(document.getElementById('PMV_Gas').value, document.getElementById('CMV_Gas').value);
        let WaterDiff = getDiff(document.getElementById('PMV_Water').value, document.getElementById('CMV_Water').value);

        
        alert('Свет '+LightDiff+'\nГаз '+GasDiff+'\nВода '+WaterDiff);  
    }catch(exception){
        alert(exception);
    }  
}

