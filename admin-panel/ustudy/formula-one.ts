// // function calculateAdmissionChance(startScore: number, e1: number, e2: number, e3: number, userScore: number): number {
// //   if (startScore >= userScore) {
// //       return 0;
// //   } else {
// //       let possibleScore = calculatePossibleScore(e1, e2, e3);
// //       // console.log(possibleScore);

// //       let admissionChance = calculateChance(userScore, possibleScore);
// //       return Math.min(Math.floor(admissionChance), 100);
// //   }
// // }

// // function calculatePossibleScore(e1: number, e2: number, e3: number): number {
// //   let possibleScore = e1 + e2 - e1 + e3 - e2 * 2 * 3;
// //   return possibleScore <= 140 ? possibleScore : 140;
// // }

// // function calculateChance(userScore: number, possibleScore: number): number {
// //   let chance = 50 + (userScore - possibleScore) / ((140 - possibleScore) * 3) * 100;
// //   return chance;
// // }
// const calculateAdmissionChance = (startScore: number, e1: number, e2: number, e3: number, userScore: number): number => {
//   let possibleScore = calculatePossibleScore(e1, e2, e3);
//   let admissionChance = calculateChance(userScore, possibleScore);
//   return Math.min(Math.floor(admissionChance), 100);
// }

// const calculatePossibleScore = (e1: number, e2: number, e3: number): number => {
//   let possibleScore = e1 + e2 - e1 + e3 - e2 * 2 * 3;
//   return possibleScore <= 140 ? possibleScore : 140;
// }

// const calculateChance = (userScore: number, possibleScore: number): number => {
//   let chance;
//   // if (userScore < 50) {
//   //   chance = 50 + ((userScore - 50) + (140 - 50)) / 3;
//   // } else {
    
//   //   chance = 50 + ((userScore - possibleScore) + (140 - possibleScore)) / 3;
//   //   // chance = 50 + (userScore - possibleScore) / ((140 - possibleScore) * 3) * 100;
//   // }
//   chance = 50 + (userScore - possibleScore) / ((140 - possibleScore) * 3) * 100;
//   return chance;
// }


// let startScore = 100; // University Theshold
// let e1 = 100;          // 2021
// let e2 = 100;          // 2022
// let e3 = 100;          // 2023
// let userScore = 99;  // Ent Scrore
// let admissionChance = calculateAdmissionChance(startScore, e1, e2, e3, userScore);
// console.log(`The chance of admission is ${admissionChance}%`);




// If the student's score is less than 50 points: =50+((UserPoint-50)+(140-50))/3
// If the student's score is greater than 50 points: =50+((UserPoint-possible score)+(140-possible score))/3



// // function calculateAdmissionChance(startScore: number, e1: number, e2: number, e3: number, userScore: number): number {
// //   if (startScore >= userScore) {
// //       return 0;
// //   } else {
// //       let possibleScore = calculatePossibleScore(e1, e2, e3);
// //       let admissionChance = calculateChance(userScore, possibleScore);
// //       return Math.min(Math.floor(admissionChance), 100);
// //   }
// // }

// // function calculatePossibleScore(e1: number, e2: number, e3: number): number {
// //   let possibleScore = e1 + e2 - e1 + e3 - e2 * 2 * 3;
// //   return possibleScore <= 140 ? possibleScore : 140;
// // }

// // function calculateChance(userScore: number, possibleScore: number): number {
// //   let chance = 50 + (userScore - possibleScore) / ((140 - possibleScore) * 3) * 100;
// //   return chance;
// // }

// // let possibleScores = {
// //   generalCompetition: {startScore: 90, e1: 95, e2: 93, e3: 97, userScore: 200},
// //   ruralQuota: {startScore: 85, e1: 94, e2: 92, e3: 96, userScore: 195},
// //   orphanQuota: {startScore: 80, e1: 93, e2: 91, e3: 95, userScore: 190},
// //   disabilityQuota: {startScore: 75, e1: 92, e2: 90, e3: 94, userScore: 185},
// //   largeFamilyQuota: {startScore: 70, e1: 91, e2: 89, e3: 93, userScore: 180}
// // };

// // for (let quota in possibleScores) {
// //   let {startScore, e1, e2, e3, userScore} = possibleScores[quota];

// //   let admissionChance = calculateAdmissionChance(startScore, e1, e2, e3, userScore);

// //   console.log(`For ${quota}, the chance of admission is ${admissionChance}%`);
// // }


// // let possibleScores = {
// //   generalCompetition: {startScore: 90, e1: 95, e2: 93, e3: 97, userScore: 200}, // 87%
// //   ruralQuota: {startScore: 110, e1: 95, e2: 93, e3: 97, userScore: 200}, // Adjust this to get 30%
// //   orphanQuota: {startScore: 105, e1: 95, e2: 93, e3: 97, userScore: 200}, // Adjust this to get 40%
// //   disabilityQuota: {startScore: 100, e1: 95, e2: 93, e3: 97, userScore: 200}, // Adjust this to get 55%
// //   largeFamilyQuota: {startScore: 95, e1: 95, e2: 93, e3: 97, userScore: 200} // Adjust this to get 68%
// // };

// // for (let quota in possibleScores) {
// //   let {startScore, e1, e2, e3, userScore} = possibleScores[quota];

// //   let admissionChance = calculateAdmissionChance(startScore, e1, e2, e3, userScore);

// //   console.log(`For ${quota}, the chance of admission is ${admissionChance}%`);
// // }






// interface University {
//   specialThreshold: number; // Minimum points for admission
// }

// interface Specialty {
//   e1?: number; // Min score for 2021 (optional)
//   e2?: number; // Min score for 2022 (optional)
//   e3?: number; // Min score for 2023 (optional)
//   // quota data could be added here if needed
// }

// function calculateAdmissionChance(userScore: number, university: University, specialty: Specialty): number {
//   const possibleScore = calculatePossibleScore(specialty);

//   if (university.specialThreshold > userScore) {
//     return 0; // No chance if below threshold
//   }

//   const chance = 50 + ((userScore - possibleScore) * (140 - possibleScore)) / ((140 - possibleScore) * 3 * 100);
//   return Math.floor(chance * 100) / 100; // Round down to two decimal places
// }

// function calculatePossibleScore(specialty: Specialty): number {
//   let score = 0;
//   let count = 0;

//   if (specialty.e3 !== undefined) {
//     score += specialty.e3;
//     count++;
//   }

//   if (specialty.e2 !== undefined) {
//     score += specialty.e2;
//     count++;
//   }

//   if (specialty.e1 !== undefined) {
//     score += specialty.e1;
//     count++;
//   }

//   // Handle missing data (use previous year's value if available)
//   if (count === 1) {
//     score *= 2; // Only one year, use it twice
//   } else if (count === 2) {
//     if (specialty.e1 === undefined) {
//       score += specialty.e2?.valueOf() || 0; // Use second year or 0 if missing
//     } else if (specialty.e2 === undefined) {
//       score += specialty.e1?.valueOf() || 0; // Use first year or 0 if missing
//     }
//   }
  

//   return Math.min(score, 140); // Limit score to maximum
// }

// // Example usage
// const userScore = 125;
// const university: University = { specialThreshold: 110 };
// const specialty: Specialty = { e1: 95, e2: 93, e3: 97 };

// const admissionChance = calculateAdmissionChance(userScore, university, specialty);
// console.log("Admission Chance:", admissionChance, "%");













// class University {
//   startScore: number;
//   e1: number;
//   e2: number;
//   e3: number;

//   constructor(startScore: number, e1: number, e2: number, e3: number) {
//       this.startScore = startScore;
//       this.e1 = e1;
//       this.e2 = e2;
//       this.e3 = e3;
//   }

//   calculateAdmissionChance(userScore: number): number {
//       if (this.startScore >= userScore) {
//           return 0;
//       } else {
//           let possibleScore = this.calculatePossibleScore();
//           let admissionChance = this.calculateChance(userScore, possibleScore);
//           return Math.floor(admissionChance * 100) / 100; // rounding down to 2 decimal places
//       }
//   }

//   calculatePossibleScore(): number {
//       let possibleScore = this.e1 + this.e2 - this.e1 + this.e3 - this.e2 * 2 * 3;
//       return possibleScore <= 140 ? possibleScore : 140;
//   }

//   calculateChance(userScore: number, possibleScore: number): number {
//       let admissionChance = 50 + (userScore - possibleScore) / ((140 - possibleScore) * 3) * 100;
//       return admissionChance;
//   }
// }

// let university = new University(91, 95, 95, 95); // replace with actual values
// let userScore = 67.67; // replace with actual value
// let admissionChance = university.calculateAdmissionChance(userScore);
// console.log(`The admission chance is ${admissionChance}%`);


class University {
  startScore: number;
  e1: number;
  e2: number;
  e3: number;

  constructor(startScore: number, e1: number, e2: number, e3: number) {
      this.startScore = startScore;
      this.e1 = e1;
      this.e2 = e2;
      this.e3 = e3;
  }

  calculateAdmissionChance(userScore: number): number {
      let possibleScore = this.calculatePossibleScore();
      let admissionChance = this.calculateChance(userScore, possibleScore);
      return Math.floor(admissionChance * 100) / 100; // rounding down to 2 decimal places
  }

  calculatePossibleScore(): number {
      let possibleScore = this.e1 + this.e2 - this.e1 + this.e3 - this.e2 * 2 * 3;
      return possibleScore <= 140 ? possibleScore : 140;
  }

  calculateChance(userScore: number, possibleScore: number): number {
      let admissionChance;
      if (userScore < 50) {
          admissionChance = 50 + ((userScore - 50) + (140 - 50)) / 3;
      } else {
          admissionChance = 50 + ((userScore - possibleScore) + (140 - possibleScore)) / 3;
      }
      return admissionChance;
  }
}

let university = new University(91); // replace with actual values
let userScore = 91; // replace with actual value
let admissionChance = university.calculateAdmissionChance(userScore);
console.log(`The admission chance is ${admissionChance}%`);
