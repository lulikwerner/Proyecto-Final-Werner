
let gender = "";
let heightSelector = "";
let weight = "";
let height = "";
let lifestyle = "";
let goal = "";
let level = "";
let enter_patient = "";
let options = "";
let options_doc = 0;
const peopl = [];


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

    get macro() {
        alert(
            "" +
            this.userName + this.lastName +
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
    }

}

let patient = true;
while(patient){
    let enter_patient = prompt('Desea ingresar un nuevo paciente (SI/NO): ');

    if(enter_patient.toUpperCase() == 'NO'){
        patient = false;
        console.log(peopl);
        
        do{
        let options_doc = parseInt(prompt('Desea hacer alguna de las siguientes consultas:\n 1 - Ver todos los pacientes \n 2 - Ordenar de la A a la Z por apellido \n 3 - Ordenar de la Z a la A por apellido \n 4 - Filtrar por edad \n 5 - Filtrar por sexo \n 6 - Salir:  '));
         
        if( options_doc <= 6 && options_doc>=1){
            console.log('Entro');
    
            console.log(createString(peopl));   
            
            }
        

        }while(options_doc <= 0 || options_doc > 6)
    }
    
    let userName = prompt("Ingresa el nombre del paciente: ");
    console.log(userName);
    let lastName = prompt("Ingresa el apellido del paciente: ");
    console.log(lastName);
    let age = parseInt(prompt("Ingrese la edad del paciente: "));
    console.log(age);
   

do {
    gender = prompt(' Ingrese el sexo de la persona "M" para masculino o "F" para femenino: ').toUpperCase();
    console.log(gender);
    
    if (gender === "M" ||  gender === "F" ) {
        do {
            heightSelector = prompt(
                ' Para ingresar la altura en pies escribir "P" si prefiere ingresar la altura en metros ingresar "Me": '
            ).toUpperCase();
            console.log(heightSelector);
            if (
                heightSelector == "P" ||
                heightSelector == "ME"
                ){
                if (heightSelector == "P") {
                    height = parseFloat(prompt("Ingrese la altura en Pies: "));
                    console.log(height);
                    weight = parseFloat(prompt("Ingrese el peso en libras: "));
                    console.log(weight);
                } else if (
                    heightSelector == "ME" 
                    ){
                    height = parseFloat(prompt("Ingrese la altura en Metros: "));
                    console.log(height);
                    weight = parseFloat(prompt("Ingrese el peso en kilogramos: "));
                    console.log(weight);
                }
             
                /*Calcula el BMR*/
                var metabolic = calculate_BMR(gender, heightSelector, weight, height, age);
                /*alert('Su BMR es ' + metabolic)*/
                console.log("El BMR es " + metabolic);
                lifestyle = prompt(
                    "Ingrese una de las siguientes opciones, si el estilo de vida de " + userName + " es :\n A) Sedentaria\n B) Trabaja en oficina y va mas de  3 veces a la semana al gimnasio\n C) Es activa y va 4 o mas veces a la semana al gimnasio "
                );
                console.log(lifestyle);

                /*Calcula el TDEE*/
                var energy = Number(calculate_TDEE(metabolic, lifestyle));
                console.log("El TDEE de es " + energy);
                alert("El TDEE  de " + userName + " es " + energy);

                /*Calcula el TDCI*/
                goal = parseInt(
                    prompt(
                        "Ingrese:\n 1) Si la meta es bajar de peso\n 2) Si la meta es ganar musculo "
                    )
                );
                console.log(goal);
                if (goal == 2) {
                    level = parseInt(
                        prompt(
                            "Ingrese el nivel para:\n 1)  Beginner\n 2)  Novice\n 3)  Intermedio\n 4)   Avanzado "
                        )
                    );
                }

                var calorieIntake = calculate_TDCI(energy, heightSelector, weight, goal, level);
                console.log("El TDCI de es " + calorieIntake + " calorias");
                alert(userName + " Deberia consumir por dia " + calorieIntake + " calorias");

                /*Calcula la Proteina*/
                var proteinIntake = Protein(heightSelector, weight);
                console.log("El PROTEIN intake es  " + proteinIntake + " gramos");
                alert(userName + " Deberia consumir por dia " + proteinIntake + " de proteina");

                /*Calcula el FAT intake*/
                var fatIntake = Fat(calorieIntake, goal);
                console.log("El FAT intake  es " + fatIntake + " gramos");
                alert(userName + " Deberia consumir por dia " + fatIntake + " gramos de fat");

                /*Calcula los CARBS*/
                var carbsIntake = Carbs(calorieIntake, fatIntake, proteinIntake)
                console.log("El carbs intake  es " + carbsIntake + " gramos");
                alert(userName + " Deberia consumir por dia " + carbsIntake + " gramos de carbs");

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
               
                peopl.push(macro_1);
                console.log(peopl);
                console.log(macro_1.macro);
                
                
            }
        } while (
            heightSelector != "P" &&
            heightSelector != "ME" 
        );
    }
} while (gender != "M" && gender != "F" );

}


function calculate_BMR(gender, heightSelector, weight, height, age) {
    if (
        (gender == "M" ) &&
        (heightSelector == "P" )
    ) {
        BMR = 66 + 6.2 * weight + 12.7 * height - 6.8 * age;
    } else if (
        (gender == "M" ) &&
        (heightSelector == "ME" )
    ) {
        BMR = 66 + 13.7 * weight + 5 * height - 6.8 * age;
    } else if (
        (gender == "F" ) &&
        (heightSelector == "P" )
    ) {
        BMR = 655 + 4.4 * weight + 4.6 * height - 4.7 * age;
    } else if (
        (gender == "F" ) &&
        (heightSelector == "ME")
    ) {
        BMR = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
    }
    return BMR.toFixed(2);
}

function calculate_TDEE(BMR, lifestyle) {
    if (lifestyle == "A" || lifestyle == "a") {
        TDEE = BMR * 1.35;
    } else if (lifestyle == "B" || lifestyle == "b") {
        TDEE = BMR * 1.55;
    } else if (lifestyle == "C" || lifestyle == "c") {
        TDEE = BMR * 1.75;
    }
    return Number(TDEE).toFixed(2);
}

function calculate_TDCI(TDEE, heightSelector, weight, goal, level) {
    switch (true) {
        case goal == 1 && (heightSelector == "P"):
            TDCI = TDEE - weight * 0.00075 * 500;
            break;
        case goal == 1 &&
            ( heightSelector == "ME" ):
            TDCI = TDEE - weight * 0.00075 * 1100;
            break;
        case goal == 2 &&
            level == 1 &&
            (heightSelector == "P" ):
            TDCI = TDEE + weight * 0.02 * 150;
            break;
        case goal == 2 &&
            level == 2 &&
            (heightSelector == "P" ):
            TDCI = TDEE + weight * 0.015 * 150;
            break;
        case goal == 2 &&
            level == 3 &&
            (heightSelector == "P" ):
            TDCI = TDEE + weight * 0.01 * 150;
            break;
        case goal == 2 &&
            level == 4 &&
            (heightSelector == "P" ):
            TDCI = TDEE + weight * 0.005 * 150;
            break;
        case goal == 2 &&
            level == 1 &&
            ( heightSelector == "ME" ):
            TDCI = Number(TDEE) + weight * 0.02 * 150;
            break;
        case goal == 2 &&
            level == 2 &&
            (heightSelector == "ME" ):
            TDCI = TDEE + weight * 0.015 * 150;
            break;
        case goal == 2 &&
            level == 3 &&
            ( heightSelector == "ME" ):
            TDCI = TDEE + weight * 0.01 * 150;
            break;
        case goal == 2 &&
            level == 4 &&
            ( heightSelector == "ME" ):
            TDCI = TDEE + weight * 0.005 * 150;
            break;
    }
    return Number(TDCI).toFixed(2);
}

function Protein(heightSelector, weight) {
    if (heightSelector == "P" ) {
        PROT = 1 * weight;
    } else if (
        heightSelector == "ME"
    ) {
        PROT = 2.2 * weight;
    }
    return Number(PROT).toFixed(2);
}

function Fat(TDCI, goal) {
    if (goal == 1) {
        FAT = (TDCI * 0.15 + TDCI * 0.25) / 2 / 9;
    } else if (goal == 2) {
        FAT = (TDCI * 0.2 + TDCI * 0.3) / 2 / 9;
    }
    return Number(FAT).toFixed(2);
}

function Carbs(TDCI, Fat, Protein){
 CARBS =((TDCI / 4) - Fat - Protein);
 return CARBS.toFixed(2);
}

function Opt_doc(option_doc, options_doc, peopl){
    /*let arrayOrd = peopl.slice[0]*/
    switch(option_doc){
        case options_doc == 1:
            peopl.forEach(element => alert(element));
        case options_doc == 2:
            return  arrayOrd.sort((a,b)=>b.lastName.localeCompare(a.lastName));
        case options_doc == 3:
            return  arrayOrd.sort((a,b)=>a.lastName.localeCompare(b.lastName));
        case options_doc == 4:
            let agesf = parseInt(prompt('Ingrese la edad de pacientes que desea obtener: '))
            let ageFilter = peopl.filter(agesf => { this.age == agesf});
                console.log(ageFilter);
        case options_doc == 5:
            let genderf = parseInt(prompt('Ingrese la edad de pacientes que desea obtener: '))
            let genderFilter = peopl.filter(genderf => { this.gender == genderf});
                console.log(genderfilter);
        case  option_doc == 6:
                alert('Gracias por su consulta. Adios')
                break;
            }
            

    }

    function createString(array){
        /*let info = '';
        array.forEach(element => {
            info+= 'Nombre: ' + element.userName + '\nApellido: ' + element.lastName + '\nEdad: ' + element.age + '\nSexo: ' + element.gender + '\nPeso: ' + element.weight + '\nAltura: ' + element.height + '\nCalorias diarias a consumir: ' + element.TDCI + '\nProteinas: ' + element.PROT + '\nCarbohidratos: ' + element.CARBS+ '\nGrasas: ' + element.FAT + '\n\n';
        })
        return info;*/
        for (const key in array){
            console.log(`${key}: ${array[key]}\n`);
        
        }
    }

