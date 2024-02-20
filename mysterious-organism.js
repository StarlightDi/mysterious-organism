// Returns a random DNA base
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
  //make instance, check survivability, if good put in array
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

const myAequor = pAequorFactory(1, mockUpStrand());
console.log("Specimen #1: ", myAequor.dna);

const mutatedDNA = myAequor.mutate();
console.log("Mutated #1: ", mutatedDNA);

const comparer = mockUpStrand();
console.log("Specimen #2: ", comparer);
myAequor.compareDNA(comparer);

const survival = myAequor.willLikelySurvive();
console.log(survivability(survival));

