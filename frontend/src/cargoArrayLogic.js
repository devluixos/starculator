class CargoArray{

    /**
     * Cargo amounts if given specifically.
     * 
     * @param {int} scu32 
     * @param {int} scu24 
     * @param {int} scu16 
     * @param {int} scu8 
     * @param {int} scu4 
     * @param {int} scu2 
     * @param {int} scu1 
     */
    constructor(scu32, scu24, scu16, scu8, scu4, scu2, scu1){
        this.cargoArray = [scu32, scu24, scu16, scu8, scu4, scu2, scu1];
    }

    /**
     * Initialize cargoArray to all 0 when using this function.
     * This should be called for each cargo objective in the mission
     * 
     * @param {int} missionCargo the cargo amount for a single mission objective.
     * @param {int} maxSCUSize the maximum scu size given in the mission description
     */
    
    addMissionCargoObjective(missionCargo, maxSCUSize) {
        var cargoBoxes = [32, 24, 16, 8, 4, 2, 1];
        var index = cargoBoxes.indexOf(maxSCUSize);
        
        var remainingCargo = missionCargo;

        while (remainingCargo != 0){
            currentBoxAmmount = Math.floor(remainingCargo / maxSCUSize);
            cargoArray[index] += currentBoxAmmount;
            remainingCargo = remainingCargo % maxSCUSize;
            index++;
            maxSCUSize = cargoBoxes[index];
        }
    }

    /**
     * 
     * @returns The array with the amounts of boxes for each scu size.
     */
    getArray(){
        if (this.cargoArray === null){
            this.cargoArray = [0, 0, 0, 0, 0, 0, 0];
        }

        return this.cargoArray;
    }

    /**
     * Adds a given cargo load to the total cargo array.
     * 
     * @param {Array} cargo An array containing the numbers of boxes to be added to the total cargo.
     * Shape should be as follows: [scu32, scu24, scu16, scu8, scu4, scu2, scu1].
     */
    addCargo(cargo){
        for (i=0; i < this.cargoArray.length; i++){
            this.cargoArray[i] += cargo[i];
        }
    }
}