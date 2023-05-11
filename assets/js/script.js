let totalGastos = 0;
let id = 0;
let arrayGastos = [];
let presupuesto = 0;
let saldo = 0;

const getId = () => {
    id++;
    return id;
}

const inputPresupuesto = () => {
    presupuesto = parseInt(document.getElementById("presupuestoInput").value); // al presupuesto le asigno el valor

    document.getElementById('despliegaPresupuesto').innerText = presupuesto; // al elemento le asigno el valor que esta guardado en la variable presupuesto
    calculoSaldo();
}

const getGastoObj = (nombre, cantidad) => {
    const NewGasto = {
        id: getId(),
        nombre: nombre,
        cantidad: parseInt(cantidad)
    }
    return JSON.parse(JSON.stringify(NewGasto));
}

const addGastoTabla = (Gasto) => {
    const tbody = document.getElementById('tcontenido');
    tbody.innerHTML += `<tr id="elemento${Gasto.id}">
        <td>${Gasto.id}</td>
        <td>${Gasto.nombre}</td>
        <td>${Gasto.cantidad}</td> 
        <td>
            <a href="#" onclick="borrarGasto(${Gasto.id})" > <i class="bi bi-trash3"></i> </a>
        </td>
    </tr> `;
}

const inputGasto = () => {
    let gastoNombre = document.getElementById("nombreInput").value;
    let gastoCantidad = document.getElementById("cantidadInput").value;

    let Gasto = getGastoObj(gastoNombre, gastoCantidad);
    console.log('Gasto:', Gasto);

    totalGastos += Gasto.cantidad;
    console.log('totalGastos:', totalGastos);

    arrayGastos.push(Gasto);
    console.log('arrayGastos:', arrayGastos);

    document.getElementById('despliegaTotal').innerText = totalGastos;

    addGastoTabla(Gasto);
    calculoSaldo();
}

const borrarGasto = (id) => {
    console.log('arrayGastos:', arrayGastos);
    console.log('id:', id);

    arrayGastos = arrayGastos.filter((gasto) => {
        if (gasto.id == id) {
            let filaABorrar = document.getElementById("elemento" + gasto.id);
            filaABorrar.remove();
            return false;
        }
        return true; 
    });

    totalGastos = arrayGastos.reduce((total, valor) => total + valor.cantidad, 0);
    document.getElementById('despliegaTotal').innerText = totalGastos;
    console.log('2.- arrayGastos:', arrayGastos);
    calculoSaldo();
}

function calculoSaldo () {
    let resta = presupuesto - totalGastos;
    document.getElementById('despliegaSaldo').innerText = resta;
}
