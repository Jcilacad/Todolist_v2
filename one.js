studentInfos = [
    {
        totalScore: 6.5
    },

    {
        totalScore: 6.5
    },
    {
        totalScore: 6.5
    },

    {
        totalScore: 6.0
    },

    {
        totalScore: 5.5
    },

    {
        totalScore: 4.5
    }
]


let sum = 1;
let indexFlag = 2
let rank = 0
let rankArr = []
let totalScoreArr = []

let anotherTotalScore = [];
for (let i = 0; i < studentInfos.length; i++) {
    anotherTotalScore.push(studentInfos[i].totalScore)
}


let anotherSet = new Set(anotherTotalScore)
let anotherDistinctElems = [...anotherSet]

// Counting occurences of 'totalScore' values
let anotherOccurenceArr = anotherTotalScore.reduce((accumulator, value) => {
    accumulator[value] = ++accumulator[value] || 1;

    return accumulator;
}, {});

// Sorting the occurences of 'totalScore' values
let anotherSortedOccuranceArr = [];

for (let vehicle in anotherOccurenceArr) {
    anotherSortedOccuranceArr.push(anotherOccurenceArr[vehicle]);
}

anotherSortedOccuranceArr.sort(function (a, b) {
    return b - a;
});

let myMap = new Map();

for (let i = 0; i < anotherDistinctElems.length; i++) {
    myMap.set(anotherDistinctElems[i], anotherSortedOccuranceArr[i]);
}

for (let [key, value] of myMap) {
    console.log(`${key} is ${value}`);
}


for (let i = 0; i < studentInfos.length - 1; i++) {

    // Push each totalScore into an array called 'totalScoreArr'
    totalScoreArr.push(studentInfos[i].totalScore)

    // Main logic for ranking
    if (studentInfos[i].totalScore === studentInfos[i + 1].totalScore) {
        sum = sum + indexFlag++

        if (i === studentInfos.length - 2) {
            rank = sum / myMap.get(studentInfos[i].totalScore);
            rankArr.push(rank);
        }
    } else if (studentInfos[i].totalScore !== studentInfos[i + 1].totalScore) {

        rank = sum / myMap.get(studentInfos[i].totalScore);
        rankArr.push(rank)
        sum = indexFlag++
        if (i === studentInfos.length - 2) {
            rank = --indexFlag;
            rankArr.push(rank)
        }
    }

}

// Pushing the totalScore of the last index into 'totalScoreArr'
totalScoreArr.push(studentInfos[studentInfos.length - 1].totalScore)

// Making a set from 'totalScoreArr'
// let set = new Set(totalScoreArr)
// let distinctElems = [...set]

// Counting occurences of 'totalScore' values
let occurenceArr = totalScoreArr.reduce((accumulator, value) => {
    accumulator[value] = ++accumulator[value] || 1;

    return accumulator;
}, {});

// Sorting the occurences of 'totalScore' values
let sortedOccuranceArr = [];

for (let vehicle in occurenceArr) {
    sortedOccuranceArr.push(occurenceArr[vehicle]);
}

sortedOccuranceArr.sort(function (a, b) {
    return b - a;
});

let finalRanking = []

for (let i = 0; i < rankArr.length; i++) {
    for (let j = 0; j < sortedOccuranceArr[i]; j++) {
        finalRanking.push(rankArr[i])
    }
}

// console.log("totalScoreArr " + totalScoreArr)
console.log("FinalRanking " + finalRanking)
// console.log("RankArray " + rankArr)
// console.log("Distict Elemets " + distinctElems + " Sorted Occurance " + sortedOccuranceArr)


