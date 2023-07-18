export class Colors {
    COLORS = "rgybmc";

    getRandomColor(){
        return this.COLORS[parseInt(Math.random() * this.COLORS.length)];
    }

    validColor(color){
        for (let i = 0; i < this.COLORS.length; i++) {
            if (this.COLORS[i] === color) {
                return true;
            }
        }
        return false;
    }

    toString(){
        return this.COLORS;
    }
}