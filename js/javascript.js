const $horas = document.querySelectorAll('.actividades__horas')
const $titulo = document.querySelectorAll('.actividades__titulo')
const $pasado = document.querySelectorAll('.actividades__pasado')
const $opciones = document.querySelectorAll('.lista__opcion')

const diario = new Array
const semanal = new Array
const mensual = new Array

const archivo = new XMLHttpRequest()
archivo.open('GET', './asset/json/data.json')
archivo.onreadystatechange = () => {
    if (archivo.readyState == 4 && archivo.status == 200) {
        const datos = JSON.parse(archivo.responseText)

        datos.forEach((dato, i) => {
            $titulo[i].textContent = `${datos[i].title}`

            diario.push(datos[i].timeframes.daily)
            semanal.push(datos[i].timeframes.weekly)
            mensual.push(datos[i].timeframes.monthly)
            
            cambiar(semanal,'Semana Pasada')
        });
    }
}
archivo.send()

$opciones.forEach((opcion, i) => {
    opcion.addEventListener('click', (e) => {
        $opciones.forEach(i => i.classList.remove('lista__opcion--activo'))
        opcion.classList.add('lista__opcion--activo')

        switch (e.target.textContent) {
            case 'Diario': cambiar(diario,'Dia anterior')
                break;

            case 'Semanal': cambiar(semanal,'Semana Pasada')
                break;

            case 'Mensual': cambiar(mensual,'Mes pasado')
                break;

            default: cambiar(semanal,'Semana Pasada')
                break;
        }
    })
});

const cambiar = (tiempo, texto) => {
    tiempo.forEach((valor, i) => {
        $horas[i].textContent = `${valor.current}hrs`
        $pasado[i].textContent = `${texto} - ${valor.previous}hrs`
    });
}