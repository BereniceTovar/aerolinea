//Declarar un arreglo que representará los asientos de nuestro avion con false indicando que estos estan vacios.
//Asiento ocupado = true.

var airlineSeats = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false
];

//Contador que nos ayudará a rastrear el número de asientos ocupados.

var busySeats = 0;

var paintSeats = function(array) {
  var containerSeats = document.getElementById('seats');

  for(var i = 0; i<array.length; i++) {
    var seat = document.createElement('div');
    seat.className = 'seats';

    //del 1er elemento al 4to va a ser primera clase, que sería del indice 0 al indice 3. Representados de color morado.

    if(i < 4) {
      seat.style.background = '#AFD5E9';
    } else {
      seat.style.background = '#9AE587';
    }
    containerSeats.appendChild(seat);
  }
};

var reserve = function() {
  var btn = document. getElementById('btn');
  btn.addEventListener('click', chooseZone);
};
var chooseZone = function() {
  var choice = prompt(
    '¿En que zona prefieres reservar? \n 1.Primera Clase \n 2. Clase Económica \n \n Por favor ingresa el número de tu preferencia'
  );
  if(choice == 1) {
    checkFirstClassZone();
  } else if(choice == 2) {
    checkEconomicZone();
  } else {
    alert('Por favor ingresa un número valido');
  }
};

var checkFirstClassZone = function() {
  var zone = 'Primera Clase';
  //Recorre del elemento 0 al elemento 3 y verifica cuales están disponibles.
  for(var index = 0; index < 4; index++ ) {
    if(airlineSeats[index] == false) {
      airlineSeats[index] = true;
      //Al reservar un asiento no necesitamos seguir recorriendo arreglo.
      //Rompemos el for con el break.
      reserveSeat(index);
      //Dibujar el ticket (abajo)
      paintTicket(index, zone);
      busySeats++; //Activar contador
      break;
      //Se agrega else if de abajo para completar la parte de si hay no hay asientos disponibles- primera clase- económica (viceversa).
    } else if (index == 3 && airlineSeats[index] == true) {
      reasignEconomicZone(zone);
    }
  }
};

var checkEconomicZone = function() {
  var zone = "Clase Económica";
  for(var index = 4; index <  10; index++) {
    if(airlineSeats[index] == false) {
      airlineSeats[index] = true;
      //Mandar a llamar funcion reserveSeat
      reserveSeat(index);
      paintTicket(index, zone);
      busySeats++;
      break;
      //Se agrega else if de abajo para completar la parte de si hay -no hay asientos disponibles-primera clase-económica(viceversa).
    } else if (index == 9 && airlineSeats[index] == true) {
      reasignFirstClassZone(zone);
    }
  }
};
//Si no hay asientos disponibles en primera clase dar opción al usuario de reservar en clase económica.
//Si no hay asientos disponibles en clase económica dar opción al usuario de reservar en primera clase.

var reasignEconomicZone = function(zone) {
  //Alternativa para usuario si ya no hay asientos disponibles.
  if(busySeats == 10) {
    noSeats();
    nextFlight();
  } else {
  var reasign = confirm(
    'Ya no quedan asientos disponibles en ' + zone + ' :( \n ¿Quieres reservar en zona Económica? '
     ); //Si el usuario dice que si, buscar asientos en la otra zona.
  if(reasign == true) {
    checkEconomicZone();
  } else {
    nextFlight();
  }
 }
};

//Función para saber cuál de nuestros asientos ha sido reservado.
var reserveSeat = function(indexToPaint){
  var seat = document.getElementsByClassName('seats');
  seat[indexToPaint].textContent = 'Ocupado';
};


var reasignFirstClassZone = function(zone) {
  if(busySeats == 10) {
    noSeats();
    nextFlight();
  } else {
  var reasign = confirm(
    'Ya no quedan asientos en ' + zone + ' :( \n ¿Quieres reservar en Primera Clase?'
  );

  if(reasign == true) {
    checkFirstClassZone();
  } else {
    nextFlight();
  }
 }
};

//Para que se imprima el boleto-tickets con información

var paintTicket = function(index, zone) {
  var containerTickets = document.getElementById('tickets');
  var ticket = document.createElement('div');
  ticket.className = 'seats';
  var title = document.createElement('p');
  var reservedSeating = document.createElement('p');
  var zoneClass = document.createElement('p');
  title.textContent = 'PASE DE ABORDAR';
  reservedSeating.textContent = 'No. de asiento: ' + (index + 1);
  zoneClass.textContent = zone;
  ticket.appendChild(title);
  ticket.appendChild(reservedSeating);
  ticket.appendChild(zoneClass);
  containerTickets.appendChild(ticket);
};

var nextFlight = function() {
  alert('Nuestro próximo vuelo sale en 3 horas');
};

var noSeats = function() {
  alert('Lo sentimos :( \n Ya no quedan asientos disponibles en este vuelo');
};

paintSeats(airlineSeats);
reserve();
