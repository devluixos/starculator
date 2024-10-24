// need to import cargoBox

class CargoGridFiller{
    /**
     * 
     * @param {Array} cargoGrids All cargo grids that a ship has.
     *                              Each grid should contain [width, height, length] in that order.
     * @param {Array} cargoArray The cargo to be filled into the ship.
     */
    constructor(cargoGrids, cargoArray){
        this.cargoGrids = this.convertCargoGrid(cargoGrids);
        this.cargoArray = cargoArray;
    }

    /**
     * Converts each grid [width, height, length] to a 3d-Array with shape (width, length, height).
     * The change in the order is to ensure optimal cargo loading.
     * 
     * @param {Array} cargoGrids All cargo grids that a ship has.
     *                              Each grid should contain [width, height, length] in that order.
     */
    convertCargoGrid(cargoGrids){
        convertedGrids = [];
        logicalGrid = [[[]]];

        for (i=0; i<cargoGrids.length; i++){
            var cargoGrid = cargoGrids[i];
            var xDirection = Math.round(cargoGrid[0] / 1.25);
            var yDirection = Math.round(cargoGrid[2] / 1.25);
            var zDirection = Math.round(cargoGrid[1] / 1.25);

            for (j=0; j<xDirection; j++){
                for (k=0; k<yDirection; k++){
                    for (l=0; l<zDirection; l++){
                        logicalGrid[j][k].push(0);
                    }
                }
            }

            convertedGrids.push(logicalGrid);
        }
        
        return convertedGrids;
    }

    checkDirection(direction, box, i, j, k, currentGrid){
        var fits = true;
        //Work in progress
        return fits;
    }

    fillGrid(){
        var currentGrid = this.cargoGrids[0]
        var currentBoxAmmount = this.cargoArray[0];
        // var currentBoxSize = new CargoBox(32)
        var remainingGrids = this.cargoGrids.length;
        var fits = true;

        while (remainingGrids > 0){
            while (currentBoxAmmount > 0){
                for(i=0; i<currentGrid.length; i++){
                    for(j=0; j<currentGrid[i].length; j++){
                        for(k=0; k<currentGrid[i][j].length; k++){
                            for(boxDirection=0; boxDirection<2; boxDirection++){
                                fits = this.checkDirection(boxDirection, currentBoxSize, i, j, k, currentGrid);
                                if (fits){
                                    //WIP
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}