class Shrugman {
    constructor() {
        this.category = 'movies';
        this.gameOn = false;
        this.knownLettersList = [];
        this.playedWords = [];
        this.attempts = 10;
        this.stats = [];
        this.options = {
            movies: [
                'The Godfather',
                'Forrest Gump',
                'Titanic',
                'Saving Private Ryan',
                'Braveheart',
            ],
            books: [
                'The Neverending Story',
                'Eleven Minutes',
                'The Catcher in the Rye',
                'Harry Potter and the Goblet of Fire'
            ]
        }
        this.currentWord = null;
    }

    setCategory(category) {
        if (!this.options.hasOwnProperty(category)) {
            return false;
        }

        this.category = category;

        return true;
    }

    getGuess(category) {
        let randomIndex = Math.floor(Math.random() * this.options[category].length);
        let guess = this.options[category][randomIndex];

        while (this.playedWords.includes(guess)) {
            randomIndex = Math.floor(Math.random() * this.options[category].length);
            guess = this.options[category][randomIndex];
        }

        this.playedWords.push(guess);

        return guess;
    }

    renderWord() {
        const characters = this.currentWord.split('');

        return characters.map((char) => {
            if (this.knownLettersList.includes(char.toLowerCase())) {
                return char;
            } else if (char === ' ') {
                return char;
            } else {
                return '_'
            }
        }).join('');
    }

    renderShrugMan() {
        const shrugEmoji = '¯\\_(:/)_/¯'.split('');

        return shrugEmoji.slice(0, shrugEmoji.length - this.attempts).join('');
    }

    play() {
        this.gameOn = true;
        this.currentWord = this.getGuess(this.category);
        // Only for debugging
        // console.log(this.currentWord, 'this.currentWord');
        // console.log(`\n`, this.renderWord(), `\n`);
    }

    validateGuess(letter) {
        if (!letter) {
            return false;
        }

        if (letter.length !== 1) {
            return false;
        }

        return !this.knownLettersList.includes(letter.toLowerCase());
    }

    update(letter) {
        this.knownLettersList.push(letter.toLowerCase());

        // Lower only if the letter is not included in the word
        if (!this.currentWord.toLowerCase().includes(letter)) {
            this.attempts--;
        }

        // console.log(`\n`, this.renderWord(), `\n`);
        // Update shrugman only if the letter is not included in the word
        // console.log(chalk.bold.magenta(`\n${this.renderShrugMan()}\n`));

        // return {
        //     word: this.renderWord(),
        //     shrugman: this.renderShrugMan()
        // };
    }

    isWinning() {
        return this.currentWord === this.renderWord()
    }

    updateStats(gameResult) {
        this.stats.push({
            word: this.currentWord,
            result: gameResult ? 'win' : 'loss'
        });
    }

    getFormattedStats() {
        return this.stats.map((stat, index) => {
            return `${index + 1}. ${stat.word} - ${stat.result}`;
        }).join('\n');
    }

    isGameOn() {
        if (this.attempts === 0) {
            return false;
        }

        if (this.isWinning()) {
            return false;
        }

        return true;
    }

    resetGame() {
        this.knownLettersList = [];
        this.attempts = 10;
        this.currentWord = null;
    }
}

module.exports = Shrugman;