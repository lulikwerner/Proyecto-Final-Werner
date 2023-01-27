import { v4 } from 'https://cdn.skypack.dev/uuid';
let id =v4();
let BMR = "";
let TDCI = "";
let PROT = "";
let FAT = "";
let CARBS = "";
let showInfo;

let users = [
  { email: "doc@mail.com", pw: "user123" },
  { email: "doc2@mail.com", pw: "user2123" },
];

class Person {
  constructor(
    id,
    userName,
    lastName,
    gender,
    weight,
    height,
    age,
    TDCI,
    CARBS,
    FAT,
    PROT
  ) {
    this.id =id;
    this.userName = userName;
    this.lastName = lastName;
    this.gender = gender;
    this.weight = weight;
    this.height = height;
    this.age = parseInt(age);
    this.TDCI = parseInt(TDCI);
    this.CARBS = parseInt(CARBS);
    this.FAT = parseInt(FAT);
    this.PROT = parseInt(PROT);
  }
  asignId(array){
    return this.id = v4();
}
}

/*Es el array donde voy a guardar los pacientes que cargo*/
let peopl= JSON.parse(localStorage.getItem('patient'))||[];
let pip=[];
let newpeopl=peopl.concat(pip)
console.log(newpeopl)
/*fetch('./local.json')
  .then (res => res.json())
  .then(json =>pip=json.map(obj =>obj.id, obj.userName, obj.lastName, obj.gender, t.weight,
    obj.heightobjt.age,obj.TDCI,obj.CARBS,obj.FAT,obj.PROT));

    console.log(pip)*/
fetch('./local.json')
  .then (res => res.json())
  .then(data => { 
 
    data.forEach(pat =>{
    
       let newPat = new Person (pat.id, pat.userName, pat.lastName, pat.gender, pat.weight,
        pat.height,pat.age,pat.TDCI,pat.CARBS,pat.FAT,pat.PROT)
        pip.push(newPat)
        

    })
console.log(pip)
  })
  .catch(err => console.log(err));
console.log(pip)


//Llama al modal del Login
  $(document).ready(function () {
  $("#loginModal").modal("hide");

  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
});

//Para el modal de data
const personalData = document.querySelector("#data");

//Para mostrar la informacion del form
let forms = document.querySelector("#form_cal");

const userNamef = document.querySelector("#name");
const lastNamef = document.querySelector("#last_name");

//Eventos
userNamef.addEventListener("input", function () {
  if (userNamef.value === "") {
    Swal.fire('Por favor ingrese un nombre');
  }
});

lastNamef.addEventListener("input", function () {
  if (lastNamef.value === "") {
    Swal.fire('Por favor ingrese un apellido');
  }
});

showInfo = forms.addEventListener("submit", function (e) {
  const age = parseFloat(document.querySelector("#ages").value);
  const height = parseFloat(document.querySelector(".heights").value);
  const weight = parseFloat(document.querySelector(".weights").value);
  const userName = document.querySelector("#name").value.toUpperCase();
  const lastName = document.querySelector("#last_name").value.toUpperCase();

  e.preventDefault();

  //Traigo el valor del gender seleccionado
  const genderInputs = document.getElementsByName("sexo");
  let gender = "";
  let i;
  for (i = 0; i < genderInputs.length; i++) {
    if (genderInputs[i].checked) {
      gender = genderInputs[i].value;
    }
  }
  // Traigo el valor de la metrica seleccionada
  const metricInputs = document.getElementsByName("metrics");
  let metric = "";
  let x;
  for (x = 0; x < metricInputs.length; x++) {
    if (metricInputs[x].checked) {
      metric = metricInputs[x].value;
    }
  }

  /*Calcula el BMR*/
  var metabolic = calculate_BMR(gender, metric, weight, height, age);
  let lifestyle = document.querySelector("#activity").value;

  /*Calcula el TDEE*/
  var energy = Number(calculate_TDEE(metabolic, lifestyle));

  /*Calcula el TDCI*/

  // Traigo el valor del goal
  const goalInputs = document.getElementsByName("goals");
  let goal = "";
  let z;
  for (z = 0; z < goalInputs.length; z++) {
    if (goalInputs[z].checked) {
      goal = goalInputs[z].value;
    }
  }

  let level = document.querySelector("#levels").value;

  let calorieIntake = calculate_TDCI(energy, metric, weight, goal, level);


  /*Calcula la Proteina*/
  let proteinIntake = Protein(metric, weight);


  /*Calcula el FAT intake*/
  let fatIntake = Fat(calorieIntake, goal);


  /*Calcula los CARBS*/
   Carbs(calorieIntake, fatIntake, proteinIntake);


  /*Devuelve la MACRO de la persona que se ingreso*/
  let macro_1 = new Person(
    id,
    userName,
    lastName,
    gender,
    weight,
    height,
    age,
    TDCI,
    CARBS,
    FAT,
    PROT
  );

  //Subo al array el nuevo "paciente"*/
  peopl.push(macro_1);
  macro_1.asignId(peopl);


  localStorage.setItem('patient', JSON.stringify(macro_1));
  console.log(peopl)
  //Convierto el array en un string
  JSON.stringify(peopl);

  //Creo un modal mostrando la informacion de la persona ingresada
  const modal = document.createElement("div");

  modal.innerHTML += `
       <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog modal-dialog-centered" role="document">
         <div class="modal-content">
           <div class="modal-header border-bottom-0">
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">×</span>
             </button>
           </div>
           <div class="modal-body">
             <div class="form-title text-center">
               <h4>${userName} ${lastName}</h4>
             </div>
             <div class="d-flex flex-column ">
             <div class="modal-body">
             <p> Deberia consumir por dia: ${parseFloat(TDCI).toFixed(
               2
             )} calorias.<br> De los cuales se componene:
             <br>Proteina: ${parseFloat(PROT).toFixed(2)}  gramos
             <br>Grasas Fat: ${parseFloat(FAT).toFixed(2)} gramos
             <br>Carbohidratos: ${parseFloat(CARBS).toFixed(2)} gramos
           </div>
     
           <div class="d-flex flex-column modal-footer">
           <p class="text-left">Para ver otros pacientes por favor logearse</p>
           </div>

             
           
           </div>
         </div>
       
       </div>
     </div>
     </div>

     
  `;

  //Muestra y esconde el modal con los datos de la persona
  $(document).ready(function () {
    $("#myModal").modal("show");
    $("#myModal").modal("hide");

    $(function () {
      modal.innerHTML = "";
    });
  });

  personalData.appendChild(modal);

  //Borra la info cargada en  el form
  document.getElementById("form_cal").reset();
});


/*Funcion para calcular el BMR*/
function calculate_BMR(gender, metric, weight, height, age) {
  if (gender === "hombre" && metric === "lbs") {
    BMR = 66 + 6.2 * weight + 12.7 * height - 6.8 * age;
  } else if (gender === "hombre" && metric === "kls") {
    BMR = 66 + 13.7 * weight + 5 * height - 6.8 * age;
  } else if (gender === "mujer" && metric === "lbs") {
    BMR = 655 + 4.4 * weight + 4.6 * height - 4.7 * age;
  } else if (gender === "mujer" && metric === "kls") {
    BMR = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
  }
  return BMR;
}

/*Funcion para calcular el TDEE*/
function calculate_TDEE(BMR, lifestyle) {
  let TDEE;
  (lifestyle == "sedent")? TDEE = BMR * 1.35:
  (lifestyle == "moderate")? TDEE = BMR * 1.55:
   TDEE = BMR * 1.75

  return Number(TDEE).toFixed(2);
}

/*Funcion para calcular el consumo de calorias diarias*/
function calculate_TDCI(TDEE, metric, weight, goal, level) {
  switch (true) {
    case goal === "shred" && metric === "lbs":
      TDCI = TDEE - weight * 0.00075 * 500;
      break;
    case goal === "shred" && metric === "kls":
      TDCI = TDEE - weight * 0.00075 * 1100;
      break;
    case goal === "gains" && level === "begginer" && metric === "lbs":
      TDCI = TDEE + weight * 0.02 * 150;
      break;
    case goal === "gains" && level === "novice" && metric === "lbs":
      TDCI = TDEE + weight * 0.015 * 150;
      break;
    case goal === "gains" && level === "intermediate" && metric === "lbs":
      TDCI = TDEE + weight * 0.01 * 150;
      break;
    case goal === "gains" && level === "advance" && metric === "lbs":
      TDCI = TDEE + weight * 0.005 * 150;
      break;
    case goal === "gains" && level === "begginer" && metric === "kls":
      TDCI = Number(TDEE) + weight * 0.02 * 150;
      break;
    case goal === "gains" && level === "novice" && metric === "kls":
      TDCI = TDEE + weight * 0.015 * 150;
      break;
    case goal === "gains" && level === "intermediate" && metric === "kls":
      TDCI = TDEE + weight * 0.01 * 150;
      break;
    case goal === "gains" && level === "advance" && metric === "kls":
      TDCI = TDEE + weight * 0.005 * 150;
      break;
  }
  return Number(TDCI).toFixed(2);
}

/*Funcion para calcular el consumo de proteinas diarias*/
function Protein(metric, weight) {
   (metric == "lbs")? PROT = 1 * weight : PROT = 2.2 * weight;
  return Number(PROT).toFixed(2);
}

/*Funcion para calcular el consumo de grasas diarias*/
function Fat(TDCI, goal) {
  (goal === "shred") ? FAT = (TDCI * 0.15 + TDCI * 0.25) / 2 / 9 : FAT = (TDCI * 0.2 + TDCI * 0.3) / 2 / 9;
  return Number(FAT).toFixed(2);
}

/*Funcion para calcular el consumo de carbohidratos diarias*/
function Carbs(TDCI, Fat, Protein) {
  CARBS = TDCI / 4 - Fat - Protein;
  return Number(CARBS).toFixed(2);
}

/*Aca empieza lo que sucede apartir de clickear Login*/

//Log in
const btnLogin = document.getElementById("btnIngres"),
  toggles = document.querySelectorAll(".toggles"),
  remember = document.getElementById("remember"),
  emailLog = document.getElementById("email1"),
  pwLog = document.getElementById("password1"),
  contingo = document.getElementById("ingo");

function saveLogin(userDB, storage) {
  const user = { email: userDB.email, pw: userDB.pw };
  /*Seteo un usuaio*/
  storage.setItem("user", JSON.stringify(user));
}
/*Traigo un usuario del storage*/
function retriveUser(storage) {
  return JSON.parse(storage.getItem("user"));
}

function showPatients(array){

    contingo.innerHTML ='';
    let i=1;
    array.forEach((e,i) => {
      i++;
     

        let html = `  
        <table class="table table-striped">
        <thead>

        <tr>
        <td style="display:none" id="rowDe">${e.id}</td>
        <td id="row">${i}</td>
        <td >${e.userName}</td>
        <td >${e.lastName}</td>
        <td>${e.gender}</td>
        <td>${e.age}</td>
        <td>${e.weight}</td>
        <td>${e.height}</td>
        <td>${e.TDCI}</td>
        <td>${e.CARBS}</td>
        <td>${e.FAT}</td>
        <td>${e.PROT}</td>
        <td> <button id="${e.id}" class="clearbt" data-toggle="modal">x</button></td>
        </tr>
        </thead>
        </table>
      `
      contingo.innerHTML +=html;
});


/*Llamo al evento que va a permitir elimina las filas*/
let btnDeleteRow= document.querySelectorAll(".clearbt")
btnDeleteRow.forEach(btn => btn.addEventListener("click",deleteR));
}






/*Funcion para borrar las filas de las tablas*/
function deleteR(ele){
  Swal.fire({
    title: 'Estas seguro',
    text: "Que deseas eliminar el paciente?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Si, deseo eliminarlo',
  })
    .then((result) => {
      if (result.isConfirmed) {
      const idEle = ele.target.id;
      peopl = peopl.filter(el => el.id !=idEle)
      showPatients(peopl)
        Swal.fire(
          'Borrado!',
          'El paciente ha sido eliminado satisfactoriamente',
        )
      } 
    })
}
 




function magic(array, clase) {
  array.forEach((e) => {
    e.classList.toggle(clase);
  });
}
/*Valido si el usuario ya existe*/
function validateUser(userDB, emailLog, pwLog) {
  do {
    let found = userDB.find((userDB) => userDB.email == emailLog.value);
    if (typeof found === "undefined") {
      return false;
    } else {
      if (found.pw != pwLog.value) {
        return false;
      } else {
        return found;
      }
    }
  } while (emailLog.value != "" || pwLog.value != "");
}

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  let data = validateUser(users, emailLog, pwLog);
  if (emailLog.value === "" || pwLog.value === "") {
    alert("Por favor complete todos los campos");
  } else {
    if (data === false && pwLog.value != "") {
      alert("Usuario o contrasenia erroneos");
    } else {
      if (remember.checked) {
        saveLogin(data, localStorage);

        Toastify({
          text:'Su usuario ha sido guardado Exitosamente',
          duration: 3000,
      }).showToast();
      } else {
        saveLogin(data, sessionStorage);
      }
      //Cierro el modal
      $("#loginModal").modal("hide");
      magic(toggles, "d-none");
      showPatients(peopl)
    }
  }
});


/*Escondo cuando apreto logout*/
let logoutLink = document.getElementById("btnLogout");
logoutLink.addEventListener("click", function () {
  magic(toggles, "d-none");
});
/*Muestra la tabla de pacientes cuando uno esta loggead*/
function logged(user) {
  if (user) {
  showPatients(peopl)
    
   
  }
}

logged(retriveUser(localStorage));

/*Busca en el search box por Nombre Apellido o genero*/
let newPeopl = "";
document.getElementById("myInput").addEventListener("keyup", function () {
  let search = this.value.toUpperCase();
  
  let newArray = peopl.filter(function (val) {
    if (
      val.userName.includes(search) ||
      val.lastName.includes(search) ||
      val.gender.includes(search)
    ) {
      newPeopl = [
        {
          userName: val.userName,
          lastName: val.lastName,
          gender: val.gender,
          age: val.age,
          weight: val.weight,
          height: val.height,
          TDCI: val.TDCI,
          CARBS: val.CARBS,
          FAT: val.FAT,
          PROT: val.PROT,
        },
      ];
      return newPeopl;
    }
  });
  showPatients(newArray);
});


