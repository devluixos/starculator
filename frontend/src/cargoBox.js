class CargoBox{
    constructor(size){
        switch (size){
            case 32:
                this.setDimensions(2, 8, 2);
                break;
            case 24:
                this.setDimensions(2, 6, 2);
                break;
            case 16:
                this.setDimensions(2, 4, 2);
                break;
            case 8:
                this.setDimensions(2, 2, 2);
                break;
            case 4:
                this.setDimensions(2, 2, 1);
                break;
            case 2:
                this.setDimensions(1, 2, 1);
                break;
            default:
                this.setDimensions(1, 1, 1);
        }
    }

    /**
     * Sets dimensions of the box.
     * 
     * @param {*} xDir 
     * @param {*} yDir 
     * @param {*} zDir 
     */
    setDimensions(xDir, yDir, zDir){
        this.xDir = xDir;
        this.yDir = yDir;
        this.zDir = zDir;
    }
}