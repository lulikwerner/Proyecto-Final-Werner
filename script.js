let BMR = '';
let TDCI ='';
let PROT ='';
let FAT = '';





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

   /* get macro() {
        alert(
            "" +
            this.userName.value + " " + this.lastName.value + " " +
            this.age +
            " anios de edad. Deberia consumir por dia " +
            this.TDCI +
            " calorias. De los cuales " +
            this.PROT +
            " son gramos de proteina, " +
            this.FAT +
            " son gramos de grasas fat y " +
            this.CARBS+
            " son gramos de carbs. " 
           
        );
    }*/

}

  /*Creo ya pacientes en el array para poder hacer las comparaciones necesarias en las opciones que tiene el doctor sin tener que cargar muchos pacientes*/ 
  let peopl = [{userName: "Sophie", lastName: "Werner", gender: "F", age: 70, weight:1.7, height:32, TDCI:1234 , CARBS:23,FAT:45,PROT :600 },
               {userName: "Thomas", lastName: "Perez", gender: "M", age: 18,weight: 1.9, height: 28, TDCI: 1900 , CARBS: 123, FAT: 78, PROT:950 },
               {userName: "Juan", lastName: "Fernandez", gender: "M", age: 39, weight: 1.87 , heihgt: 40 , TDCI: 1350 , CARBS: 785, FAT: 56, PROT: 340 },
               {userName: "Felicitas", lastName: "Zabuleta", gender: "F", age: 50, weight: 1.66, height: 18, TDCI: 1200 , CARBS: 985, FAT: 87, PROT: 506 },
            ];


let userName = document.querySelector("#name");
let lastName = document.querySelector("#last_name");
let age = parseInt(document.querySelector("#age_in").value);
let weight = parseInt(document.querySelector(".weights").value);
let height = parseInt(document.querySelector(".heights").value);
//Eventos
userName.addEventListener("input",function(){
    console.log(userName.value)
  /*if(userName.value ===""){
        alert("Por favor ingrese un nombre")
    }*/
});

lastName.addEventListener("input",function(){
    if(lastName.value ===""){
        alert("Por favor ingrese un apellido")
    }
});

let forms = document.querySelector("#form_cal");


const showInfo = forms.addEventListener("submit", function(e){
    e.preventDefault();

//Traigo el valor del gender seleccionado
    const genderInputs = document.getElementsByName('sexo');
    let gender='' ;

    for (i = 0; i < genderInputs.length; i++) {
        if (genderInputs[i].checked) {
         gender = genderInputs[i];
        } 
    }
 // Traigo el valor de la metrica seleccionada
    const metricInputs =document.getElementsByName('metrics');
    let  metric='';

    for (x = 0; i < metricInputs.length; x++) {
        if (metricInputs[x].checked) {
            metric = metricInputs[x];
        }
    }

// Traigo el valor del goal
const goalInputs =document.getElementsByName('goals');
let  goal='';

for (z = 0; i < goalInputs.length; z++) {
    if (goalInputs[z].checked) {
        goal = goalInputs[z];
    }
}

              
    /*Calcula el BMR*/
    var metabolic = calculate_BMR(gender, metric, weight, height, age);
    /*alert('Su BMR es ' + metabolic)*/
    console.log("El BMR es " + metabolic);
    let lifestyle = document.querySelector("#activity").value

    
    /*Calcula el TDEE*/
    var energy = Number(calculate_TDEE(metabolic, lifestyle));
    console.log("El TDEE de es " + energy);
    /*alert("El TDEE  de " + userName.value + " es " + energy);*/
    
    /*Calcula el TDCI*/
  
    let level = document.querySelector(".train_level").value
    if (goal === "gains") {
   
        level.innerHTML = `<select name=" " >
        <h3> Ingrese el nivel de entrenamiento: </h3>
        <br>
    <option value="beginner">Principiante</option>
    <option value="novice">Novato</option>
    <option value="intermediate">Intermedio</option>
    <option value="advance">Avanzado</option>;
    </select>`;
    }
 
   

    
    var calorieIntake = calculate_TDCI(energy, metric, weight, goal, level);
    console.log("El TDCI de es " + calorieIntake + " calorias");
    /*alert(userName.value + " Deberia consumir por dia " + calorieIntake + " calorias");*/
    
    /*Calcula la Proteina*/
    var proteinIntake = Protein(metric, weight);
    console.log("El PROTEIN intake es  " + proteinIntake + " gramos");
    /*alert(userName.value + " Deberia consumir por dia " + proteinIntake + " de proteina");*/
    
    /*Calcula el FAT intake*/
    var fatIntake = Fat(calorieIntake, goal);
    console.log("El FAT intake  es " + fatIntake + " gramos");
    /*alert(userName.value + " Deberia consumir por dia " + fatIntake + " gramos de fat");*/
    
    /*Calcula los CARBS*/
    var carbsIntake = Carbs(calorieIntake, fatIntake, proteinIntake)
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
                  
    /*Subo al array el nuevo "paciente"*/
    peopl.push(macro_1);
    console.log(peopl);
    
    /*Muestro por consola el mensaje de get macro*/
    ver = macro_1.macro;
    
    /*Convierto el array en un string*/
    JSON.stringify(peopl);                     
 
    });

    
    /*Funcion para calcular el BMR*/ 
    function calculate_BMR(gender, metric, weight, height, age) {
        console.log(gender);
        console.log(metric);
        console.log(age);
        console.log(height);
        console.log(weight);
        if (
            (gender === "hombre") && (metric ==="lbs")
            
        ) {
            console.log('gender');
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



 /*//Agrego la informacion del formulario en el DOM
 let forms = document.querySelector("#form_cal");
 let info = document.querySelector(".info");

 const showInfo = forms.addEventListener("submit", function(e){
    e.preventDefault();

    info.innerHTML = `
    <div class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">${userName.value}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
>`
 });








/*



function consult(array){
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