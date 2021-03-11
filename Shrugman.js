class Shrugman {
    constructor() {
        this.gameOn = true;
        this.knownLettersList = [];
        this.playedWords = {
            movies: [],
            books: []
        };
        this.shugmanEmoji = '¯\\_(:/)_/¯'
        this.attempts = this.shugmanEmoji.length;
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
                'The Night Clerk',
                'Vanguard'
            ],
            books: [
                'Death In The Clouds',
                'Sparkling Cyanide',
                'The Body in the Library',
                'The Rose and the Yew Tree',
                'Murder in Mesopotamia',
                'Murder on the Orient Express',
                'All Quiet on the Western Front',
                'Pride and Prejudice',
                'And Then There Were None',
                'The ABC Murders',
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

        this.category = Object.keys(this.options)[0];
        this.currentWord = this.getSecretWord(this.category);
        // Only for debugging
        // console.log(this.currentWord, 'this.currentWord');
    }

    // Use this function to set category
    // return true if category was set successfully
    setCategory(category) {
        if (!this.options.hasOwnProperty(category)) {
            return false;
        }

        this.category = category;

        return true;
    }

    // Find a word to guess
    getSecretWord(category) {
        let randomIndex = Math.floor(Math.random() * this.options[category].length);
        let secretWord = this.options[category][randomIndex];

        // They have played all words in this category
        // Easiest is to reset the list of played words
        if (this.playedWords[this.category] === this.options[this.category]) {
            this.playedWords[this.category] = [];
        }

        while (this.playedWords[this.category].includes(secretWord)) {
            randomIndex = Math.floor(Math.random() * this.options[category].length);
            secretWord = this.options[category][randomIndex];
        }

        this.playedWords[this.category].push(secretWord);

        return secretWord;
    }

    // Validate guess
    validateGuess(letter) {
        if (!letter) {
            return false;
        }

        if (letter.length !== 1) {
            return false;
        }

        return !this.knownLettersList.includes(letter.toLowerCase());
    }

    // Update game and render screens
    update(letter) {
        this.knownLettersList.push(letter.toLowerCase());

        // Lower only if the letter is not included in the word
        if (!this.currentWord.toLowerCase().includes(letter)) {
            this.attempts--;
        }
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
        const shrugEmoji = this.shugmanEmoji.split('');

        return shrugEmoji.slice(0, shrugEmoji.length - this.attempts).join('');
    }

    // Stats
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

    // Check game state (is the user winning or our out attempts)
    isWinning() {
        return this.currentWord === this.renderWord();
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

    // Reset game
    reset() {
        this.knownLettersList = [];
        this.attempts = this.shugmanEmoji.length;
        this.currentWord = this.getSecretWord(this.category);
    }
}

module.exports = Shrugman;