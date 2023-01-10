let BMR = '';
let TDCI ='';
let PROT ='';
let FAT = '';


let users =[{email:"doc@mail.com", pw:"user123"},{email:"doc2@mail.com", pw:"user2123"}];

class Person {
    

    constructor(userName, lastName, gender, weight, height, age, TDCI, CARBS, FAT, PROT) {
        this.userName = userName;
        this.lastName = lastName;
        this.gender = gender;
        this.weight = weight;
        this.height = height;
        this.age = parseInt(age);
        this.TDCI = parseInt (TDCI);
        this.CARBS = parseInt (CARBS);
        this.FAT= parseInt (FAT);
        this.PROT = parseInt (PROT);
    }

}

/*Creo ya pacientes en el array para poder hacer las comparaciones necesarias en las opciones que tiene el doctor sin tener que cargar muchos pacientes*/ 
let peopl = [{userName: "Sophie", lastName: "Werner", gender: "F", age: 70, weight:1.7, height:32, TDCI:1234 , CARBS:23,FAT:45,PROT :600 },
               {userName: "Thomas", lastName: "Perez", gender: "M", age: 18,weight: 1.9, height: 28, TDCI: 1900 , CARBS: 123, FAT: 78, PROT:950 },
               {userName: "Juan", lastName: "Fernandez", gender: "M", age: 39, weight: 1.87 , heihgt: 40 , TDCI: 1350 , CARBS: 785, FAT: 56, PROT: 340 },
               {userName: "Felicitas", lastName: "Zabuleta", gender: "F", age: 50, weight: 1.66, height: 18, TDCI: 1200 , CARBS: 985, FAT: 87, PROT: 506 },
            ];

//Llama al modal del Login
$(document).ready(function() {             
    $('#loginModal').modal('hide');

      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
    });

//Para el modal de data
const personalData= document.querySelector("#data");

//Para mostrar la informacion del form
let forms = document.querySelector("#form_cal");
    
const showInfo = forms.addEventListener("submit", function(e){
    

    const age = parseFloat(document.querySelector("#ages").value);
    const height = parseFloat(document.querySelector(".heights").value);
    const weight = parseFloat(document.querySelector(".weights").value);
    const userName = (document.querySelector("#name").value).toUpperCase();
    const lastName = (document.querySelector("#last_name").value).toUpperCase();
    const userNamef = document.querySelector("#name");
    const lastNamef = document.querySelector("#last_name");

    //Eventos
    userNamef.addEventListener("input",function(){
    if(userNamef.value ===""){
            alert("Por favor ingrese un nombre")
        }
    });

    lastNamef.addEventListener("input",function(){
        if(lastName.value ===""){
            alert("Por favor ingrese un apellido")
        }
    });

    e.preventDefault();


    
    //Traigo el valor del gender seleccionado
    const genderInputs = document.getElementsByName('sexo');
    let gender='' ;
    
    for (i = 0; i < genderInputs.length; i++) {
        if (genderInputs[i].checked) {
         gender = genderInputs[i].value;
        } 
    }
    // Traigo el valor de la metrica seleccionada
    const metricInputs =document.getElementsByName('metrics');
    let  metric='';
    for (x = 0; x < metricInputs.length; x++) {
        if (metricInputs[x].checked) {
            metric = metricInputs[x].value;
        }
    }


              
    /*Calcula el BMR*/
    var metabolic = calculate_BMR(gender, metric, weight, height, age);
    /*alert('Su BMR es ' + metabolic)*/
    console.log("El BMR es " + metabolic);
    let lifestyle = document.querySelector("#activity").value;

    
    /*Calcula el TDEE*/
    var energy = Number(calculate_TDEE(metabolic, lifestyle));
    console.log("El TDEE de es " + energy);
    /*alert("El TDEE  de " + userName.value + " es " + energy);*/
    
    /*Calcula el TDCI*/


    // Traigo el valor del goal 
    const goalInputs =document.getElementsByName('goals');
    let  goal='';
    for (z = 0; z < goalInputs.length; z++) {
    if (goalInputs[z].checked) {
    goal = goalInputs[z].value;
    console.log(goal);
    }
}
    
    let level = document.querySelector("#levels").value;   

    
    let calorieIntake = calculate_TDCI(energy, metric, weight, goal, level);
    console.log("El TDCI de es " + calorieIntake + " calorias");
    /*alert(userName.value + " Deberia consumir por dia " + calorieIntake + " calorias");*/
    
    /*Calcula la Proteina*/
    let proteinIntake = Protein(metric, weight);
    console.log("El PROTEIN intake es  " + proteinIntake + " gramos");
    /*alert(userName.value + " Deberia consumir por dia " + proteinIntake + " de proteina");*/
    
    /*Calcula el FAT intake*/
    let fatIntake = Fat(calorieIntake, goal);
    console.log("El FAT intake  es " + fatIntake + " gramos");
    /*alert(userName.value + " Deberia consumir por dia " + fatIntake + " gramos de fat");*/
    
    /*Calcula los CARBS*/
    let carbsIntake = Carbs(calorieIntake, fatIntake, proteinIntake)
    console.log("El carbs intake  es " + carbsIntake + " gramos");
    /*alert(userName.value + " Deberia consumir por dia " + carbsIntake + " gramos de carbs");*/
    
                 
                  
    /*Devuelve la MACRO de la persona que se ingreso*/
    let macro_1 = new Person(
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
    console.log(peopl);
    
    //Muestro por consola el mensaje de get macro
    ver = macro_1.macro;
    
    //Convierto el array en un string
    JSON.stringify(peopl);     
    
    //Creo un modal mostrando la informacion de la persona ingresada
       const modal = document.createElement("div");
      
    
        modal.innerHTML += 
       `
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
             <p> Deberia consumir por dia: ${TDCI.toFixed(2)} calorias.<br> De los cuales se componene:
             <br>Proteina: ${parseFloat(PROT).toFixed(2)}  gramos
             <br>Grasas Fat:${parseFloat(FAT).toFixed(2)} gramos
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
        $('#myModal').modal('show');   
        $('#myModal').modal('hide');

    $(function () {
            modal.innerHTML ='';
        })
    });  

    personalData.appendChild(modal);

    //Borra la info cargada en  el form
    document.getElementById("form_cal").reset();
});
 

/*Funcion para calcular el BMR*/ 
function calculate_BMR(gender, metric, weight, height, age) {
        if (
            (gender === "hombre") && (metric ==="lbs")
            
        ) {
            BMR = 66 + 6.2 * weight + 12.7 * height - 6.8 * age;
        } else if (
            (gender === "hombre") && (metric ==="kls")
        ) {
            BMR = 66 + 13.7 * weight + 5 * height - 6.8 * age;
        } else if (
            (gender === "mujer") && (metric ==="lbs")
        ) {
            BMR = 655 + 4.4 * weight + 4.6 * height - 4.7 * age;
        } else if (
            (gender === "mujer") && (metric ==="kls")
        ) {
            BMR = 655 + 9.6 * weight+ 1.8 * height - 4.7 * age;
        }
        return BMR;
        
}
    
/*Funcion para calcular el TDEE*/ 
function calculate_TDEE(BMR, lifestyle) {
        if (lifestyle == "sedent") {
            TDEE = BMR * 1.35;
        } else if (lifestyle == "moderate") {
            TDEE = BMR * 1.55;
        } else if (lifestyle == "active") {
            TDEE = BMR * 1.75;
        }
        return Number(TDEE).toFixed(2);
}
    
/*Funcion para calcular el consumo de calorias diarias*/ 
function calculate_TDCI(TDEE, metric, weight, goal, level) {
        console.log(goal);
        console.log(TDEE);
        console.log(level);
        console.log(metric);
        switch (true) {
            case (goal === "shred") && (metric === "lbs"):
                TDCI = TDEE - weight * 0.00075 * 500;
                break;
            case (goal === "shred") &&
                ( metric === "kls" ):
                TDCI = TDEE - weight * 0.00075 * 1100;
                break;
            case (goal === "gains") &&
                (level === "begginer") &&
                (metric === "lbs" ):
                TDCI = TDEE + weight * 0.02 * 150;
                break;
            case (goal === "gains") &&
                (level === "novice") &&
                (metric === "lbs"):
                TDCI = TDEE + weight * 0.015 * 150;
                break;
            case (goal === "gains") &&
                (level === "intermediate") &&
                (metric === "lbs" ):
                TDCI = TDEE + weight * 0.01 * 150;
                break;
            case (goal === "gains") &&
                (level === "advance") &&
                (metric === "lbs" ):
                TDCI = TDEE + weight * 0.005 * 150;
                break;
            case (goal === "gains") &&
                 (level === "begginer") &&
                 ( metric === "kls" ):
                 TDCI = Number(TDEE) + weight * 0.02 * 150;
                break;
            case (goal === "gains") &&
                (level === "novice") &&
                (metric === "kls" ):
                TDCI = TDEE + weight * 0.015 * 150;
                break;
            case (goal === "gains") &&
                (level === "intermediate") &&
                ( metric === "kls" ):
                TDCI = TDEE + weight * 0.01 * 150;
                break;
            case (goal === "gains") &&
            (level === "advance") &&
                ( metric === "kls" ):
                TDCI = TDEE + weight * 0.005 * 150;
                break;
        }
        return Number(TDCI).toFixed(2);
}
    
/*Funcion para calcular el consumo de proteinas diarias*/ 
function Protein(metric, weight) {
        if (metric == "lbs" ) {
            PROT = 1 * weight;
        } else if (
            metric == "kls"
        ) {
            PROT = 2.2 * weight;
        }
        return Number(PROT).toFixed(2);
}
    
/*Funcion para calcular el consumo de grasas diarias*/ 
function Fat(TDCI, goal) {
        if (goal === "shred") {
            FAT = (TDCI * 0.15 + TDCI * 0.25) / 2 / 9;
        } else if (goal === "gains") {
            FAT = (TDCI * 0.2 + TDCI * 0.3) / 2 / 9;
        }
        return Number(FAT).toFixed(2);
}
    
/*Funcion para calcular el consumo de carbohidratos diarias*/ 
function Carbs(TDCI, Fat, Protein){
     CARBS =((TDCI / 4) - Fat - Protein);
     return CARBS.toFixed(2);
}


/*Aca empieza lo que sucede apartir de clickear Login*/


//Log in
coninform = document.getElementById('inform');
toggles = document.querySelectorAll('.toggles')

function saveLogin(userDB, storage){
    const user={'email': userDB.email,
                'pw': userDB.pw
               
}
/*Seteo un usuaio*/
console.log('entro a savelogin');
storage.setItem('user',JSON.stringify(user));
}
/*Traigo un usuario del storage*/
function retriveUser(storage){
    let userInStorage = JSON.parse(storage.getItem('user'));
    console.log('entro a retrive');

    return userInStorage
}

function showPatients(array){
    console.log('entro a showpatients');
    continform.innerHTML='';
    array.forEach(e =>{
        i=1;
        let html = `
        <tbody class="e.userName">
        <tr>
        <td>{e.i}</td>
        <td>{e.userName}</td>
        <td>{e.lastName}</td>
        <td>{e.rgender}</td>
        <td>{e.age}</td>
        <td>{e.weight}</td>
        <td>{e.height}</td>
        <td>{e.TDCI}</td>
        <td>{e.CARBS}</td>
        <td>{e.FAT}</td>
        <td>{e.PROT}</td>
        <td>@mdo</td>
      </tr>
      </tbody>
   
      `
      i++;
      continform.innerHTML +=html;
    })
}

function magic(array, clase){
    array.forEach(e =>{
        e.classList.toggle(clase)
    });
}
/*Valido si el usuario ya existe*/
function validateUser(userDB,email,pw){
    console.log('entro a validateusers');
    let found= userDB.find((userDB) =>userDB.email == email);
    if (typeof found ==='undefined'){
        return false;
    }else{
        if(found.pw!=pw){
            return false;
        }else{
            return found;

}
    }
}

btnLogin.addEventListener('click', (e)=>{
    e.preventDefault();
console.log(email.value)
console.log(pw.value)
    if(!email.value||!pw.value ){
        alert('Por favor complete todos los campos');
    }else{
         let data = validateUser(users, email.value, pw.value)
    }
    if(!data){
        alert("Usuario o contrasenia erroneos");
    }else{
        if(remember.checked){
            storageinfo(data,localStorage);
        }else{
            storageinfo(data, sessionStorage);
        }
        //Cierro el modal
        modal.hide();
        showPatients(Person);
        magic(toggles,'d-none');
    } 
});

function logged(user){
    if(user){
        showPatients(Person);
        magic(toggles,'d-none');
    }
}

logged(retriveUser(localStorage));









/*function consult(array){
    do{
       options_doc = parseInt(prompt('Desea hacer alguna de las siguientes consultas:\n 1  - Ordenar de la A a la Z por apellido \n 2 - Ordenar de la Z a la A por apellido \n 3 - Filtrar por edad \n 4 - Filtrar por sexo \n 5 - Salir  '));
        if( options_doc < 5 && options_doc>=1){
            console.log(createString(Opt_doc(options_doc, array)));   
        }else if( options_doc == 5){
                alert('Gracias por su consulta. Adios')
                break;
        }

        }while(options_doc != 5)
}




 /*Funcion con las distintas opciones que tiene el medico para ver la informacion
 function Opt_doc(options_doc, array){
    let genderf = "";
    let agesf = 0;
    switch(true){
        
        case options_doc == 1:
            return  array.sort((a,b)=>a.lastName.localeCompare(b.lastName));

        case options_doc == 2:
            return  array.sort((a,b)=>b.lastName.localeCompare(a.lastName));

        case options_doc == 3:
            const newArrayp = [];
            agesf = prompt('Ingrese la edad de pacientes que desea obtener: ');
            /*Guardo en un nuevo array para poder mostrar en pantalla solo lo filtrado
            array.forEach((patient) => {
                if (patient.age === agesf) {
                    newArrayp.push(patient);
                    console.log(newArrayp)
                }
            });
            return array.filter(a=>  a.age == agesf); 

       case options_doc == 4:
            do{
                genderf =prompt('Ingrese el sexo del pacientes que desea obtener F para femenino o m para masculino: ').toUpperCase();
                return array.filter(a =>  a.gender == genderf);
                
            }while( genderf !='M' && genderf !='F')
        
            }
    }


const miPropioFilter = (array, dato) => {
        const nuevoArray = [];
        
        array.forEach((producto) => {
            if (producto.age === dato) {
                nuevoArray.push(producto);
            }
        });
    
        return nuevoArray;
    };
    



/*Funcion que me trae como va a ver el usuario la informacion
function createString(array){
    let info ='';
        array.forEach(element =>
            info += 'Nombre: ' + element.userName + '\n' + 'Apellido: ' + element.lastName + '\n'+ 'Edad: ' + element.age + '\n' + 'Genero: ' + element.gender + '\n' + 'Calorias diarias: ' + element.TDCI + '\n' + 'Proteinas diarias: ' + element.PROT + ' gr \n' + 'Carbs diarios: ' + element.CARBS + ' gr \n'+ 'Grasas  diarias: ' + element.FAT + ' gr \n\n');
            alert(info);
        return info;
    }
    */


  