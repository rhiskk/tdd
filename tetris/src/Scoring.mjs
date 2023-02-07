export class Scoring {

  #score;
  #level;

  constructor(board) {
    board.subscribe(linesCleared => this.#updateScore(linesCleared));
    this.#level = 0;
    this.#score = 0;
  }

  #updateScore(linesCleared) {
    this.#score += this.#pointsFor(linesCleared);
  }

  #pointsFor(linesCleared) {
    switch (linesCleared) {
      case 1:
        return 40 * (this.#level + 1);
      case 2:
        return 100 * (this.#level + 1);
      case 3:
        return 300 * (this.#level + 1);
      case 4:
        return 1200 * (this.#level + 1);
      default:
        return 0;
    }
  }

  nextLevel() {
    this.#level++;
  }

  score() {
    return this.#score;
  }

}