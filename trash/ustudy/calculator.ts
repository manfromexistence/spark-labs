function calculateScore(UserPoint: number, possibleScore: number): string {
    let result: number;
    if (UserPoint >= 50) {
        result = 50 + ((UserPoint - possibleScore) + (140 - possibleScore)) / 3;
    } else {
        result = 50 + ((UserPoint - 50) + (140 - 50)) / 3;
    }
    return result.toFixed(2);
}

// Test the function
let UserPoint = 95;
let possibleScore = 91;
console.log(calculateScore(UserPoint, possibleScore)); // Outputs: "67.67"
