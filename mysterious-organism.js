
// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      //chooses a random index in the current dna specimen 
      //and mutates it to a base that isn't the same as the location
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      const currentBase = this.dna[randomIndex];
      const possibleBases = ["A", "T", "C", "G"].filter(
        (base) => base !== currentBase);
      const newBase =
        possibleBases[Math.floor(Math.random() * possibleBases.length)];
      this.dna[randomIndex] = newBase;
      return this.dna;
    },
     compareDNA(pAeqour) {
      //compare pAeqour.dna with this.dna
      const newpAeqour = pAeqour.join("");
      const currDna = this.dna.join("");
      let count = 0;
      for (let i = 0; i < pAeqour.length; i++) {
        if (newpAeqour[i] === currDna[i]) {
          count++;
        }
      }
      count = (count / 15) * 100;
      console.log(
        `Specimen #1 and Specimen #2 have ${count.toFixed(2)}% DNA in common`
      );
    },
    willLikelySurvive() {
      // If there is a higher instances of C and G in the dna 
      //strand it is more likely to survive
      const currDna = this.dna.join("");
      let count = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          count++;
        }
      }
      count = (count / 15) * 100;
      console.log(`${count.toFixed(2)}%`);
      if (count >= 60) return true;
      else return false;
    }
  }
};

const survivability = (survive) => {
  return survive ? "This sample has a good chance of survival." : "This sample has a bad chance of survival.";
};

const makeInstances = () => {
  //makes an array of 30 instances with unique specimen numbers
  count = 0;
  const dnaInstances = [];
  do {
    const newInst = pAequorFactory(count+100, mockUpStrand());
    const survival = newInst.willLikelySurvive();

    console.log(survivability(survival));
    if(survival) {
      dnaInstances.push(newInst);
      count++;
    }
  } while (count < 30);

  return dnaInstances;
}

console.log(makeInstances()); // create 30 Instances for Later research

const myAequor = pAequorFactory(1, mockUpStrand()); // create an instance
console.log("Specimen #1: ", myAequor.dna);

const mutatedDNA = myAequor.mutate(); //mutate a random index to another base
console.log("Mutated #1: ", mutatedDNA);

const comparer = mockUpStrand();  //compare a new strand with myAequor
console.log("Specimen #2: ", comparer);
myAequor.compareDNA(comparer);

const survival = myAequor.willLikelySurvive(); //check the likelyhood of survival
console.log(survivability(survival));

