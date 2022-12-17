let userName = prompt("Ingresa su nombre: ");
console.log(userName);
let age = parseInt(prompt("Ingrese su edad: "));
console.log(age);
let gender = "";
let heightSelector = "";
let weight = "";
let height = "";
let lifestyle = "";
let goal = "";
let level = "";
const peopl = [];

class Person {
    userName;
    gender;
    weight;
    height;
    age;
    TDCI;
    CARBS;
    FAT;
    PROT;

    constructor(userName, gender, weight, height, age, TDCI, CARBS, FAT, PROT) {
        this.userName = userName;
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
            this.userName +
            " de " +
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

do {
    gender = prompt(' Ingrese su sexo "M" para masculino o "F" para femenino: ').toUpperCase();
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
                    height = parseFloat(prompt("Ingrese su altura en Pies: "));
                    console.log(height);
                    weight = parseFloat(prompt("Ingrese su peso en libras: "));
                    console.log(weight);
                } else if (
                    heightSelector == "ME" 
                    ){
                    height = parseFloat(prompt("Ingrese su altura en Metros: "));
                    console.log(height);
                    weight = parseFloat(prompt("Ingrese su peso en kilogramos: "));
                    console.log(weight);
                }
                /*Calcula el BMR*/
                var metabolic = BMR(gender, heightSelector, weight, height, age);
                /*alert('Su BMR es ' + metabolic)*/
                console.log("El BMR es " + metabolic);
                lifestyle = prompt(
                    "Ingrese una de las siguientes opciones, si su estilo de vida es :\n A) Sedentaria\n B) Trabaja en oficina y va mas de  3 veces a la semana al gimnasio\n C) Es activa y va 4 o mas veces a la semana al gimnasio "
                );
                console.log(lifestyle);

                /*Calcula el TDEE*/
                var energy = Number(TDEE(metabolic, lifestyle));
                console.log("El TDEE es " + energy);
                alert("Su TDEE es " + energy);

                /*Calcula el TDCI*/
                goal = parseInt(
                    prompt(
                        "Ingrese:\n 1) si su meta es bajar de peso\n 2) si su meta es ganar musculo "
                    )
                );
                console.log(goal);
                if (goal == 2) {
                    level = parseInt(
                        prompt(
                            "Ingrese su nivel:\n 1) para Beginner\n 2) para Novice\n 3) para Intermedio\n 4) para avanzado "
                        )
                    );
                }

                var calorieIntake = TDCI(energy, heightSelector, weight, goal, level);
                console.log("El TDCI es " + calorieIntake + " calorias");
                alert("Deberia consumir por dia " + calorieIntake + " calorias");

                /*Calcula la Proteina*/
                var proteinIntake = Protein(heightSelector, weight);
                console.log("El PROTEIN intake es  " + proteinIntake + " gramos");
                alert("Deberia consumir por dia " + proteinIntake + " de proteina");

                /*Calcula el FAT intake*/
                var fatIntake = Fat(calorieIntake, goal);
                console.log("El FAT intake  es " + fatIntake + " gramos");
                alert("Deberia consumir por dia " + fatIntake + " gramos de fat");

                /*Calcula los CARBS*/
                var carbsIntake = Carbs(calorieIntake, fatIntake, proteinIntake)
                console.log("El carbs intake  es " + carbsIntake + " gramos");
                alert("Deberia consumir por dia " + carbsIntake + " gramos de carbs");

                /*Devuelve la MACRO de la persona que se ingreso*/
                
                let macr = new Person(
                    userName,
                    gender,
                    weight,
                    height,
                    age,
                    TDCI,
                    CARBS,
                    FAT,
                    PROT
                );
                console.log(macr.macro)
                peopl.push(macr)
                console.log(peopl)
                
            }
        } while (
            heightSelector != "P" &&
            heightSelector != "ME" 
        );
    }
} while (gender != "M" && gender != "F" );




function BMR(gender, heightSelector, weight, height, age) {
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

function TDEE(BMR, lifestyle) {
    if (lifestyle == "A" || lifestyle == "a") {
        TDEE = BMR * 1.35;
    } else if (lifestyle == "B" || lifestyle == "b") {
        TDEE = BMR * 1.55;
    } else if (lifestyle == "C" || lifestyle == "c") {
        TDEE = BMR * 1.75;
    }
    return Number(TDEE).toFixed(2);
}

function TDCI(TDEE, heightSelector, weight, goal, level) {
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



