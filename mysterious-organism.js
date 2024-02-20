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
    },
    survivability(survive) {
      return survive ? "This sample has a good chance of survival." : "This sample has a bad chance of survival.";
    },
    makeInstances() {
      //makes an array of 30 instances with unique specimen numbers
      count = 0;
      const dnaInstances = [];
      do {
       const newInst = pAequorFactory(count+100, mockUpStrand());
        const survival = newInst.willLikelySurvive();
        console.log(newInst.survivability(survival));
        if(survival) {
          dnaInstances.push(newInst);
          count++;
        }
      } while (count < 30);
      return dnaInstances;
    },
    complementStrand(dna)  {
      // make a stand that swaps As for Ts and Cs for Gs and visa versa
      const newStrand = [];
      for (i = 0; i < dna.length; i++) {
        switch (dna[i]) {
          case 'A':
            newStrand.push('T');
            break;
          case 'T':
            newStrand.push('A');
            break;
          case 'C':
            newStrand.push('G');
            break;
          case 'G':
            newStrand.push('C');
            break;
        }
      }
      return newStrand;
    }
  }
};

// create an instance
const myAequor = pAequorFactory(1, mockUpStrand()); 

// create 30 Instances for Later research
console.log(myAequor.makeInstances()); 

console.log("Specimen #1: ", myAequor.dna);

//mutate a random index to another base
const mutatedDNA = myAequor.mutate(); 
console.log("Mutated #1: ", mutatedDNA);

//compare a new strand with myAequor
const comparer = mockUpStrand();
console.log("Specimen #2: ", comparer);
myAequor.compareDNA(comparer);

//check the likelyhood of survival
const survival = myAequor.willLikelySurvive();
console.log(myAequor.survivability(survival));

//creates a complement strand swapping As for Ts and Gs for Cs and visa versa
console.log("Specimen #1: ", myAequor.dna);
console.log("Complement:  ", myAequor.complementStrand(myAequor.dna));
