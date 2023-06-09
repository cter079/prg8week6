import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"

// const csvFile = "./titanic.csv"
// const trainingLabel = "Survived"
// const ignoredColumns = ['Name']
// let correct = 0


// // inladen csv data
// function loadData() {
//     Papa.parse(csvFile, {
//         download: true,
//         header: true,
//         dynamicTyping: true,
//         complete: (results) => trainModel(results.data) // train het model met deze data
//     })

   

    
// }

// //when data is loaded, train the model
    

// //
// // MACHINE LEARNING - Bouw de Decision Tree
// //
// function trainModel(data) {
//     let trainData = data.slice(0, Math.floor(data.length * 0.8))
// let testData = data.slice(Math.floor(data.length * 0.8) + 1)


//     let decisionTree = new DecisionTree({
//         ignoredAttributes: ignoredColumns,
//         trainingSet: trainData,
//         categoryAttr: trainingLabel
//     })

//     // Teken de boomstructuur - DOM element, breedte, hoogte, decision tree
//     let visual = new VegaTree('#view', 2300, 1000, decisionTree.toJSON())
//     // console.log(testData[20])

//     // let passenger = testData[20]
//     // let passengerPrediction = decisionTree.predict(passenger)
    
//     // console.log(`Survived : ${passengerPrediction}`)
//     function testPassenger(passenger) {
//         // kopie van passenger maken, zonder het "survived" label
//         const passengerWithoutLabel = { ...passenger }
//         delete passengerWithoutLabel.Survived
    
//         // prediction
//         let prediction = decisionTree.predict(passengerWithoutLabel)
//         //convert prediction to int
//         prediction = parseInt(prediction)
    
//         // vergelijk de prediction met het echte label
//         let message = (prediction === passenger.Survived) ? "goed voorspeld!" : "fout voorspeld!"
//         // console.log(message)

//         if(prediction == 0 && passenger.Survived == 1) {
//             // console.log("Predicted death, but was alive! 😬")
//         }
//         if(prediction == 1 && passenger.Survived == 0) {
//             // console.log("Predicted alive, but was dead! 😬")
//         }

//         if (message === "goed voorspeld!") {
//             correct++
//         }
//     }
    
//     //loop over all passengers
//     for (let passenger of testData) {
//         testPassenger(passenger)
//         console.log(correct)
//         //messure accuracy
//         let accuracy = correct / testData.length
//         console.log(`Accuracy: ${accuracy}`)
//     }
    


//     let json = decisionTree.stringify()
//     console.log(json)

// }








// loadData()

let decisionTree



function loadSavedModel() {
    fetch("./model.json")
        .then((response) => response.json())
        .then((model) => modelLoaded(model))
}

function modelLoaded(model) {
     decisionTree = new DecisionTree(model)

    
}
function predictSurvival() {

    const sex = document.querySelector("#sex").value
    const age = document.querySelector("#age").value
    const sibsp = document.querySelector("#sibSp").value
    const parch = document.querySelector("#parch").value


    // test om te zien of het werkt
    let passenger = { Sex: sex, Age: age, SibSp: sibsp, Parch: parch }
    let prediction = decisionTree.predict(passenger)
    // console.log("predicted " + prediction)
    if(prediction == 0) {
        console.log("Unfortunately you died")
        document.querySelector("#result").innerHTML = "Unfortunately you would have died"
    }
    if(prediction == 1) {
        console.log("You survived!")
        document.querySelector("#result").innerHTML = "You would have survived!"
    }

}
loadSavedModel()

document.querySelector("#submit").addEventListener("click", predictSurvival)
