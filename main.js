const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.field[0][0] = pathCharacter;
    this.locationX = 0;
    this.locationY = 0;
  }

  isHat() {
    return this.field[this.locationY][this.locationX] === hat;
  }

  isHole() {
    return this.field[this.locationY][this.locationX] === hole;
  }

  isInBounds() {
    return (
      this.locationY >= 0 &&
      this.locationX >= 0 &&
      this.locationY < this.field.length &&
      this.locationX < this.field[0].length
    );
  }

  print() {
    const displayString = this.field.map((x) => x.join("")).join("\n");
    console.log(displayString);
  }

  doGame() {
    let playing = true;
    while (playing) {
      this.print();
      this.askQuestion();
      if (!this.isInBounds()) {
        console.log("Out of bounds instruction!");
        playing = false;
        break;
      } else if (this.isHole()) {
        console.log("Sorry, you fell down a hole!");
        playing = false;
        break;
      } else if (this.isHat()) {
        console.log("Congrats, you found your hat!");
        playing = false;
        break;
      }
      this.field[this.locationY][this.locationX] = pathCharacter;
    }
  }

  askQuestion() {
    const answer = prompt("Which way? Enter U, D, L, or R.").toUpperCase();
    if (answer === "U") {
      this.locationY -= 1;
    } else if (answer === "D") {
      this.locationY += 1;
    } else if (answer === "L") {
      this.locationX -= 1;
    } else if (answer === "R") {
      this.locationX += 1;
    } else {
      console.log("Please retry and enter U, D, L, or R.");
      this.askQuestion();
    }
  }

  static generateField(height, width, percentHole) {
    var field = [...Array(height)].map((e) => Array(width));
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const prob1 = Math.random();
        field[i][j] = prob1 > percentHole ? fieldCharacter : hole;
      }
    }
    const randY = Math.floor(Math.random() * height - 1);
    const randX = Math.floor(Math.random() * width - 1);
    field[randY + 1][randX + 1] = hat;
    return field;
  }
}

const myField = new Field(Field.generateField(10, 10, 0.2));
myField.doGame();
