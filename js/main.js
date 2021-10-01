let buildLetterBox = (character) => {
    let s = document.createElement('span');
    s.innerText = character;
    return s;
}

let buildScene = (word1, word2) => {
    let scene = document.getElementById('scene');
    let word1LetterBoxes = [];
    let word2LetterBoxes = [];
    let letterBoxWidth = '10vw';
    console.log('letterBoxWidth: ', letterBoxWidth);
    // the first word should be the stationary one.
    for(let character of word1) {
        let letterBox = buildLetterBox(character);
        // adding styles to letterBox
        letterBox.style.fontSize = letterBoxWidth;
        // done adding styles to letterBox
        word1LetterBoxes.push(letterBox);
    }
    // the second word should be the mobile one.
    for(let character of word2) {
        let mobileLetterBox = buildLetterBox(character);
        mobileLetterBox.classList = 'mobileLetterBox';
        // adding styles to mobileLetterBox
        mobileLetterBox.style.fontSize = letterBoxWidth;
        mobileLetterBox.style.backgroundColor = 'rgba(255,0,0,0.1)';
        mobileLetterBox.style.borderLeft = '1px solid black';
        mobileLetterBox.style.borderRight = '1px solid black';
        // done adding styles to mobileLetterBox
        word2LetterBoxes.push(mobileLetterBox);
    }

    let wordDelta = Math.floor(Math.abs(word1.length - word2.length)/2);

    let mixedLetterBoxes = [];

    if (word1.length >= word2.length) {
        // fulfill the wordDelta from word1
        for(let i = 0; i < wordDelta; i++) {
            mixedLetterBoxes.push(word1LetterBoxes[0]);
            word1LetterBoxes.shift();
        }
        while( word1LetterBoxes.length > 0 || word2LetterBoxes.length > 0 ) {
            if(word1LetterBoxes.length > 0) {
                mixedLetterBoxes.push(word1LetterBoxes[0]);
                word1LetterBoxes.shift();
            }
            if(word2LetterBoxes.length > 0) {
                mixedLetterBoxes.push(word2LetterBoxes[0]);
                word2LetterBoxes.shift();
            }
        }
    } else {
        // fulfill the wordDelta from word2
        for(let i = 0; i < wordDelta; i++) {
            mixedLetterBoxes.push(word2LetterBoxes[0]);
            word2LetterBoxes.shift();
        }
        while( word1LetterBoxes.length > 0 || word2LetterBoxes.length > 0 ) {
            if(word2LetterBoxes.length > 0) {
                mixedLetterBoxes.push(word2LetterBoxes[0]);
                word2LetterBoxes.shift();
            }
            if(word1LetterBoxes.length > 0) {
                mixedLetterBoxes.push(word1LetterBoxes[0]);
                word1LetterBoxes.shift();
            }
        }
    }

    console.log(mixedLetterBoxes);
    for (let letterBox of mixedLetterBoxes) {
        scene.appendChild(letterBox);
    }
}

/**
 * Todo:
 *  - Vertically center the text
 *  - Allow the user to change the font size
 *  - Allow the user to move the letters up and down
 *  - Allow the user to choose the words in the GUI
 *  - Allow the user to vibrate the words
 *  - Allow the user to adjust the intensity of the vibrations
 */