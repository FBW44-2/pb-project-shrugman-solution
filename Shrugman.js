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
                'The Blind Side',
                'Enola Holmes',
                'Love Actually',
                'Onward',
                'The Invisible Man',
                'The Night Clerk'
            ],
            books: [
                'All Quiet on the Western Front',
                'Pride and Prejudice',
                'Arch of Triumph: A Novel of a Man Without a Country',
                'A Time to Love and a Time to Die',
                'Three Comrades',
                'My Name Is Red',
                'The Neverending Story',
                'Eleven Minutes',
                'A Strangeness in My Mind',
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

    getSecretWord(category) {
        let randomIndex = Math.floor(Math.random() * this.options[category].length);
        let secretWord = this.options[category][randomIndex];

        while (this.playedWords.includes(secretWord)) {
            randomIndex = Math.floor(Math.random() * this.options[category].length);
            secretWord = this.options[category][randomIndex];
        }

        this.playedWords.push(secretWord);

        return secretWord;
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
        this.currentWord = this.getSecretWord(this.category);
        // Only for debugging
        // console.log(this.currentWord, 'this.currentWord');
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