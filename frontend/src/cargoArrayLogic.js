class CargoArray{
    //insert possible constructor if needed
    constructor(){

    }

    getNextBox(scuAmmount) {
        switch (scuAmmount) {
            case 32:
                index = 0;
                break;
            case 2:
                index = 5;
                break;
            case 4:
                index = 4;
                break;
            case 8:
                index = 3;
                break;
            case 16:
                index = 2;
                break;
            case 24:
                index = 1;
                break;
            default:
                index = 6;
        }
        return index;
    }

    calcMissionCargo(missionCargo, maxSCUSize) {
        var cargoArray = [0, 0, 0, 0, 0, 0, 0];
        var index = this.getNextBox(maxSCUSize);
        
        var remainingCargo = missionCargo;

        while (remainingCargo != 0){
            currentBoxAmmount = Math.floor(missionCargo / maxSCUSize);
            cargoArray[index] = currentBoxAmmount;

            remainingCargo = missionCargo % maxSCUSize;
            index++;
        }
    }
}