// Interface definitions (similar to TypeScript)
const University = class {
  constructor(name, thresholdScore) {
    this.name = name;
    this.thresholdScore = thresholdScore;
  }
};

const Specialty = class {
  constructor(name, untMinScores) {
    this.name = name;
    this.untMinScores = untMinScores;
  }
};

const Applicant = class {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
};

// Function to calculate possible UNT passing score (with rounding)
function calculatePossibleScore(applicant, university, specialty) {
  // ... (function implementation remains the same)
}

// Function to calculate admission chance (with rounding)
function calculateAdmissionChance(applicant, university, specialty) {
  // ... (function implementation remains the same)
}

// Example usage
const universities = [
  new University("University A", 100),
  new University("University B", 110),
];

const specialties = [
  {
    name: "Specialty 1",
    untMinScores: {
      2021: 95,
      2022: 93,
      2023: 97,
    },
  },
  {
    name: "Specialty 2",
    untMinScores: {
      2022: 105,
      2023: 110,
    },
  },
];

const applicants = [
  new Applicant("John Doe", 105),
  new Applicant("Jane Smith", 120),
];

for (const applicant of applicants) {
  for (const university of universities) {
    for (const specialty of specialties) {
      const chance = calculateAdmissionChance(applicant, university, specialty);
      const possibleScoreRoundedDown = Math.floor(
        calculatePossibleScore(applicant, university, specialty)
      );
      console.log(
        `${applicant.name} applying to ${university.name} for Specialty ${specialty.name}: ${chance}% (Possible Score: ${possibleScoreRoundedDown})`
      );
    }
  }
}


```





























// function calculateAdmissionChance() {
//   // Generate random data
//   let ENTPoint = Math.floor(Math.random() * 140) + 1; // Random ENT point between 1 and 140
//   let subject1 = "Subject 1"; // Subject 1 name
//   let subject2 = "Subject 2"; // Subject 2 name
//   let specialty = "Specialty"; // Specialty name

//   // Possible scores for different quotas
//   let possibleScores = {
//       generalCompetition: Math.floor(Math.random() * 140) + 1,
//       ruralQuota: Math.floor(Math.random() * 140) + 1,
//       orphanQuota: Math.floor(Math.random() * 140) + 1,
//       disabilityQuota: Math.floor(Math.random() * 140) + 1,
//       largeFamilyQuota: Math.floor(Math.random() * 140) + 1
//   };

//   // Calculate possible score and admission chance for each quota
//   for (let quota in possibleScores) {
//       let possibleScore = possibleScores[quota];
//       let admissionChance;

//       if (possibleScore >= ENTPoint) {
//           admissionChance = 0;
//       } else {
//           // Formula 1: Calculate possible score
//           possibleScore = possibleScore + possibleScore - possibleScore + possibleScore - possibleScore * 2 * 3;
//           possibleScore = possibleScore <= 140 ? possibleScore : 140;

//           // Formula 2: Calculate admission chance
//           admissionChance = 50 + (ENTPoint - possibleScore) / ((140 - possibleScore) * 3) * 100;
//           admissionChance = Math.min(Math.floor(admissionChance), 100);
//       }

//       console.log(`For ${quota}, the possible score is ${possibleScore} and the admission chance is ${admissionChance}%`);
//   }
// }

// // Call the function
// calculateAdmissionChance();



// function calculateAdmissionChance() {
//   // Generate random data
//   let ENTPoint = Math.floor(Math.random() * 140) + 1; // Random ENT point between 1 and 140
//   console.log(`ENTPoint: ${ENTPoint}`);
//   let subject1 = "Subject 1"; // Subject 1 name
//   let subject2 = "Subject 2"; // Subject 2 name
//   let specialty = "Specialty"; // Specialty name

//   // Possible scores for different quotas
//   let possibleScores:any = {
//       generalCompetition: Math.floor(Math.random() * 140) + 1,
//       ruralQuota: Math.floor(Math.random() * 140) + 1,
//       orphanQuota: Math.floor(Math.random() * 140) + 1,
//       disabilityQuota: Math.floor(Math.random() * 140) + 1,
//       largeFamilyQuota: Math.floor(Math.random() * 140) + 1
//   };

//   // Calculate possible score and admission chance for each quota
//   for (let quota in possibleScores) {
//       let possibleScore = possibleScores[quota];
//       let admissionChance;

//       if (possibleScore >= ENTPoint) {
//           admissionChance = 0;
//       } else {
//           // Formula 1: Calculate possible score
//           possibleScore = (possibleScore + possibleScore - possibleScore + possibleScore - possibleScore * 2) / 3;
//           possibleScore = possibleScore <= 140 ? possibleScore : 140;

//           // Formula 2: Calculate admission chance
//           admissionChance = 50 + ((ENTPoint - possibleScore) / (140 - possibleScore)) * 50;
//           admissionChance = Math.min(Math.floor(admissionChance), 100);
//       }

//       console.log(`For ${quota}, the possible score is ${possibleScore} and the admission chance is ${admissionChance}%`);
//   }
// }

// // Call the function
// calculateAdmissionChance();




// function calculateAdmissionChance() {
//   // Fixed data
//   let ENTPoint = 120; // Fixed ENT point
//   console.log(`ENTPoint: ${ENTPoint}`);
//   let subject1 = "Subject 1"; // Subject 1 name
//   let subject2 = "Subject 2"; // Subject 2 name
//   let specialty = "Specialty"; // Specialty name

//   // Possible scores for different quotas
//   let possibleScores:any = {
//       generalCompetition: 100,
//       ruralQuota: 110,
//       orphanQuota: 100,
//       disabilityQuota: 60,
//       largeFamilyQuota: 50
//   };

//   // Calculate possible score and admission chance for each quota
//   for (let quota in possibleScores) {
//       let possibleScore = possibleScores[quota];
//       let admissionChance;

//       if (possibleScore >= ENTPoint) {
//           admissionChance = 0;
//       } else {
//           // Formula 1: Calculate possible score
//           possibleScore = (possibleScore + possibleScore - possibleScore + possibleScore - possibleScore * 2) / 3;
//           possibleScore = possibleScore <= 140 ? possibleScore : 140;

//           // Formula 2: Calculate admission chance
//           admissionChance = 50 + ((ENTPoint - possibleScore) / (140 - possibleScore)) * 50;
//           admissionChance = Math.min(Math.floor(admissionChance), 100);
//       }

//       console.log(`For ${quota}, the possible score is ${possibleScore} and the admission chance is ${admissionChance}%`);
//   }
// }

// // Call the function
// calculateAdmissionChance();



// function calculateAdmissionChance() {
//   // Fixed data
//   let ENTPoint = 120; // Fixed ENT point
//   console.log(`ENTPoint: ${ENTPoint}`);
//   let subject1 = "Subject 1"; // Subject 1 name
//   let subject2 = "Subject 2"; // Subject 2 name
//   let specialty = "Specialty"; // Specialty name

//   console.log(`Subject 1: ${subject1}`);
//   console.log(`Subject 2: ${subject2}`);
//   console.log(`Specialty: ${specialty}`);

//   // Possible scores for different quotas
//   let possibleScores:any = {
//       generalCompetition: 100,
//       ruralQuota: 110,
//       orphanQuota: 120,
//       disabilityQuota: 130,
//       largeFamilyQuota: 140
//   };

//   // Calculate possible score and admission chance for each quota
//   for (let quota in possibleScores) {
//       let possibleScore = possibleScores[quota];
//       let admissionChance;

//       if (possibleScore >= ENTPoint) {
//           admissionChance = 0;
//       } else {
//           // Formula 1: Calculate possible score
//           possibleScore = (possibleScore + possibleScore - possibleScore + possibleScore - possibleScore * 2) / 3;
//           possibleScore = possibleScore <= 140 ? possibleScore : 140;

//           // Formula 2: Calculate admission chance
//           admissionChance = 50 + ((ENTPoint - possibleScore) / (140 - possibleScore)) * 50;
//           admissionChance = Math.min(Math.floor(admissionChance), 100);
//       }

//       console.log(`For ${quota}, the possible score is ${possibleScore} and the admission chance is ${admissionChance}%`);
//   }
// }

// // Call the function
// calculateAdmissionChance();



// function calculateAdmissionChance() {
//   // Fixed data
//   let ENTPoint = 120; // Fixed ENT point
//   console.log(`ENTPoint: ${ENTPoint}`);
//   let subject1 = "Subject 1"; // Subject 1 name
//   let subject2 = "Subject 2"; // Subject 2 name
//   let specialty = "Specialty"; // Specialty name

//   console.log(`Subject 1: ${subject1}`);
//   console.log(`Subject 2: ${subject2}`);
//   console.log(`Specialty: ${specialty}`);

//   // Adjusted possible scores for different quotas
//   let possibleScores:any = {
//       generalCompetition: 90,
//       ruralQuota: 80,
//       orphanQuota: 70,
//       disabilityQuota: 60,
//       largeFamilyQuota: 50
//   };

//   // Calculate possible score and admission chance for each quota
//   for (let quota in possibleScores) {
//       let possibleScore = possibleScores[quota];
//       let admissionChance;

//       if (possibleScore >= ENTPoint) {
//           admissionChance = 0;
//       } else {
//           // Formula 1: Calculate possible score
//           possibleScore = (possibleScore + possibleScore - possibleScore + possibleScore - possibleScore * 2) / 3;
//           possibleScore = possibleScore <= 140 ? possibleScore : 140;

//           // Formula 2: Calculate admission chance
//           admissionChance = 50 + ((ENTPoint - possibleScore) / (140 - possibleScore)) * 50;
//           admissionChance = Math.min(Math.floor(admissionChance), 100);
//       }

//       console.log(`For ${quota}, the possible score is ${possibleScore} and the admission chance is ${admissionChance}%`);
//   }
// }

// // Call the function
// calculateAdmissionChance();






// function calculateAdmissionChance() {
//   // Fixed data
//   let ENTPoint = 120; // Fixed ENT point
//   console.log(`ENTPoint: ${ENTPoint}`);
//   let subject1 = "Subject 1"; // Subject 1 name
//   let subject2 = "Subject 2"; // Subject 2 name
//   let specialty = "Specialty"; // Specialty name

//   console.log(`Subject 1: ${subject1}`);
//   console.log(`Subject 2: ${subject2}`);
//   console.log(`Specialty: ${specialty}`);

//   // Adjusted possible scores for different quotas
//   let possibleScores:any = {
//       generalCompetition: 90,
//       ruralQuota: 85,
//       orphanQuota: 80,
//       disabilityQuota: 75,
//       largeFamilyQuota: 70
//   };

//   // Calculate possible score and admission chance for each quota
//   for (let quota in possibleScores) {
//       let possibleScore = possibleScores[quota];
//       let admissionChance;

//       if (possibleScore >= ENTPoint) {
//           admissionChance = 0;
//       } else {
//           // Formula 1: Calculate possible score
//           possibleScore = (possibleScore + possibleScore - possibleScore + possibleScore - possibleScore * 2) / 3;
//           possibleScore = possibleScore <= 140 ? possibleScore : 140;

//           // Formula 2: Calculate admission chance
//           admissionChance = 50 + ((ENTPoint - possibleScore) / (140 - possibleScore)) * 50;
//           admissionChance = Math.min(Math.floor(admissionChance), 100);
//       }

//       console.log(`For ${quota}, the possible score is ${possibleScore} and the admission chance is ${admissionChance}%`);
//   }
// }

// // Call the function
// calculateAdmissionChance();



// function calculateAdmissionChance(ENTPoint, possibleScores) {
//   // Calculate possible score and admission chance for each quota
//   for (let quota in possibleScores) {
//       let possibleScore = possibleScores[quota];
//       let admissionChance;

//       if (possibleScore >= ENTPoint) {
//           admissionChance = 0;
//       } else {
//           // Formula 1: Calculate possible score
//           possibleScore = (possibleScore + possibleScore - possibleScore + possibleScore - possibleScore * 2) / 3;
//           possibleScore = possibleScore <= 140 ? possibleScore : 140;

//           // Formula 2: Calculate admission chance
//           admissionChance = 50 + ((ENTPoint - possibleScore) / (140 - possibleScore)) * 50;
//           admissionChance = Math.min(Math.floor(admissionChance), 100);
//       }

//       console.log(`For ${quota}, the possible score is ${possibleScore} and the admission chance is ${admissionChance}%`);
//   }
// }

// // Call the function with user input and admin panel data
// let ENTPoint = 120; // User will enter this in the calculator on the front side
// let possibleScores = {
//   generalCompetition: 90, // Admin added this in the admin panel for the concrete specialty
//   ruralQuota: 85,
//   orphanQuota: 80,
//   disabilityQuota: 75,
//   largeFamilyQuota: 70
// };

// calculateAdmissionChance(ENTPoint, possibleScores);

```










For generalCompetition, the chance of admission is 87%
For ruralQuota, the chance of admission is 30%
For orphanQuota, the chance of admission is 40%
For disabilityQuota, the chance of admission is 55%
For largeFamilyQuota, the chance of admission is 68%