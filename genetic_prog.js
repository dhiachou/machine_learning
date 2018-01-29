var TARGET="METHINKS IT IS LIKE A WEASEL";
var ALPHABET = "ABCDEFGHIJKLMONPQRSTUVWXYZ ";
var MUT_PROB = 10;

var generateGenome = function(){
    var genome = [];
    for (var i =0; i<28;++i){
        genome[i]=ALPHABET[Math.floor(Math.random()*ALPHABET.length)];
    }
    return genome.join("");
};

var getFitness = function(genome){
    var fitness=0;
    for (var i=0; i<TARGET.length;++i){
        if (genome[i]===TARGET[i]){
            fitness++;
        }
    }
    return fitness;
}; 

var getGenePool = function(genome){
    var pool = [];
    for (var i=0; i<50;++i){
        pool[i] = genome;
    }
    return pool;
};

var getFittest = function(pool){
    var fittestLoc = 0;
    var fittest = 0;
    for (var i=0; i<pool.length;++i){
        if (getFitness(pool[i]) >fittest){
            fittest = getFitness(pool[i]);
            fittestLoc = i;
        }
    }
    return pool[fittestLoc];
};

function doMutation(genome){
    var newGenome = "";
    for (var i =0; i<genome.length; i++){
        if(Math.floor(Math.random()*MUT_PROB)===1){
            newGenome += ALPHABET[Math.floor(Math.random()*ALPHABET.length)];
        } else {
            newGenome += genome[i];
        }
    }
    return newGenome;
}

function evolve() {
    var genome = generateGenome();
    var genePool = getGenePool(genome);
    var fittest = "";
    var iteration = 0;
    do {
        fittest = getFittest(genePool);
        if(iteration % 10 === 0){
            console.log( "["+ iteration + "] : Fittest : " + fittest);
        }
        for(var i = 0 ; i< genePool.length; i++){
            genePool[i] = doMutation(fittest);
        }
        iteration ++ ;
    } while(getFitness(getFittest(genePool)) < 28);
    console.log("Finished in " + iteration + " itearations");
}

evolve();

