let fiveLetterWords = ['seven', 'world', 'about', 'again', 'heart', 'pizza', 'water', 'happy', 'sixty', 'board', 'month', 'Angel', 'death', 'green', 'music', 'fifty', 'three', 'party', 'piano', 'Kelly', 'mouth', 'woman', 'sugar', 'amber', 'dream', 'apple', 'laugh', 'tiger', 'faith', 'earth', 'river', 'money', 'peace', 'forty', 'words', 'smile', 'abate', 'house', 'alone', 'watch', 'lemon', 'South', 'erica', 'anime', 'after', 'santa', 'women', 'admin', 'cough', 'story '];
let sixLetterWords = ['purple', 'orange', 'family', 'twelve', 'silver', 'Godard', 'thirty', 'donate', 'people', 'future', 'Heaven', 'banana', 'Africa', 'Monday', 'office', 'nature', 'eleven', 'Mumbai', 'animal', 'twenty', 'snitch', 'Rachel', 'Friday', 'Father', 'yellow', 'poetry', 'August', 'broken', 'potato', 'Sunday', 'circle', 'school', 'breath', 'moment', 'circus', 'person', 'scarce', 'London', 'energy', 'sister', 'spring', 'change', 'monkey', 'system', 'Austin', 'secret', 'pirate', 'turtle', 'ninety']

let randomizeStaticWord = () => {
    let staticField = document.getElementById('word1Input');
    staticField.value = sixLetterWords[ Math.ceil( Math.random() * 49 ) ];
}

let randomizeMobileWord = () => {
    let mobileField = document.getElementById('word2Input');
    mobileField.value = fiveLetterWords[ Math.ceil( Math.random() * 49 ) ];
}

let colorify = () => {
    let mobileLetterBoxes = getMobileLetterBoxes();
    for ( let box of mobileLetterBoxes ) {
        box.classList.toggle('colorify');
    }
}

let vibrate = () => {
    let mobileLetterBoxes = getMobileLetterBoxes();
    for ( let box of mobileLetterBoxes ) {
        box.classList.toggle('vibrate');
    }
}

let stopVibrationAndColorization = () => {
    let mobileLetterBoxes = getMobileLetterBoxes();
    for ( let box of mobileLetterBoxes ) {
        box.classList.remove('vibrate');
        box.classList.remove('colorify');
    }
    document.getElementById('vibrationCheckbox').checked = false;
    document.getElementById('colorifyCheckbox').checked = false;
}

let initializeMainSlider = () => {
    document.getElementById('mainSlider').value = 0;
}



let slideMobileLetterBoxes = () => {
    stopVibrationAndColorization();
    let mobileLetterBoxes = getMobileLetterBoxes();
    let mainSlider = document.getElementById('mainSlider');
    let delta = (mainSlider.value / 100 * 20);
    //console.log('delta: ', delta);
    for ( let mobileLetterBox of mobileLetterBoxes ) {
        mobileLetterBox.style.top = (45 - delta).toString() + 'vh';
    }
}

let toggleMenu = () => {
    let menu = document.getElementById('menuLarge');
    let menuBtn = document.getElementById('menuToggleBtn');
    menu.classList.toggle('hidden');
    menu.classList.toggle('menu-large');
    menuBtn.classList.toggle('hidden');
    menuBtn.classList.toggle('menu-large');
}

let buildSliderBox = (character) => {
    let s = document.createElement('span');
    s.innerText = character;
    return s;
}

let getMobileLetterBoxes = () => {
    return document.getElementsByClassName('mobileLetterBox');
}

let getMobileSliderBoxes = () => {
    return document.getElementsByClassName('mobileSliderBox');
}

// debugOn is a boolean. If true, turn debugMode on. Turn off otherwise.
let setDebug = (debugOn) => {
    let mobileLetterBoxes = getMobileLetterBoxes();
    let mobileSliderBoxes = getMobileSliderBoxes();
    if (debugOn) {
        for( let mobileLetterBox of mobileLetterBoxes ) {
            mobileLetterBox.style.backgroundColor = 'rgba(255,0,0,0.1)';
            mobileLetterBox.style.border = '1px solid rgba(0, 0, 0, 0.3)';
        }
        for( let mobileSliderBox of mobileSliderBoxes ) {
            mobileSliderBox.style.backgroundColor = 'rgba(255,0,0,0.05)';
            mobileSliderBox.style.border = '1px solid rgba(0, 0, 0, 0.3)';
        }
    } else {
        for( let mobileLetterBox of mobileLetterBoxes ) {
            mobileLetterBox.style.backgroundColor = '';
            mobileLetterBox.style.border = '';
        }
        for( let mobileSliderBox of mobileSliderBoxes ) {
            mobileSliderBox.style.backgroundColor = '';
            mobileSliderBox.style.border = '';
        }
    }
}

let toggleDebug = () => {
    let debugCheckbox = document.getElementById('debugCheckbox');
    if (debugCheckbox.checked) {
        setDebug(true);
    } else {
        setDebug(false);
    }
}

let buildLetterBox = (character, isMobile, width) => {
    let s = document.createElement('span');
    s.style.position = 'relative';
    s.style.fontSize = width;
    s.innerText = character;
    if (isMobile) {
        s.classList.add('mobileLetterBox');
    } else {
        s.classList.add('staticLetterBox');
    }
    return s;
}

let buildScene = (word1, word2) => {
    word1 = word1.toUpperCase();
    word2 = word2.toUpperCase();
    let scene = document.getElementById('scene');
    scene.innerHTML = '';
    let word1SliderBoxes = [];
    let word2SliderBoxes = [];
    let sliderBoxWidth = (95 / (word1.length + word2.length)).toString() + 'vw';
    //console.log('sliderBoxWidth: ', sliderBoxWidth);
    // the first word should be the stationary one.
    for(let character of word1) {
        let sliderBox = document.createElement('span');
        sliderBox.appendChild(buildLetterBox(character, false, sliderBoxWidth));
        // adding styles to letterBox
        sliderBox.style.width = sliderBoxWidth;
        sliderBox.style.display = 'block';
        sliderBox.style.textAlign = 'center';
        // done adding styles to letterBox
        word1SliderBoxes.push(sliderBox);
    }
    // the second word should be the mobile one.
    for(let character of word2) {
        let mobileSliderBox = buildSliderBox('');
        mobileSliderBox.appendChild(buildLetterBox(character, true, sliderBoxWidth));
        // add mobileSliderBox class to mobileSliderBox to make it easy to
        // pick out
        mobileSliderBox.classList.add('mobileSliderBox');
        // adding styles to mobileLetterBox
        mobileSliderBox.style.width = sliderBoxWidth;
        mobileSliderBox.style.display = 'block';
        mobileSliderBox.style.textAlign = 'center';
        // done adding styles to mobileLetterBox
        word2SliderBoxes.push(mobileSliderBox);
    }

    let wordDelta = Math.floor(Math.abs(word1.length - word2.length)/2);

    let mixedSliderBoxes = [];

    if (word1.length >= word2.length) {
        // fulfill the wordDelta from word1
        for(let i = 0; i < wordDelta; i++) {
            mixedSliderBoxes.push(word1SliderBoxes[0]);
            word1SliderBoxes.shift();
        }
        while( word1SliderBoxes.length > 0 || word2SliderBoxes.length > 0 ) {
            if(word1SliderBoxes.length > 0) {
                mixedSliderBoxes.push(word1SliderBoxes[0]);
                word1SliderBoxes.shift();
            }
            if(word2SliderBoxes.length > 0) {
                mixedSliderBoxes.push(word2SliderBoxes[0]);
                word2SliderBoxes.shift();
            }
        }
    } else {
        // fulfill the wordDelta from word2
        for(let i = 0; i < wordDelta; i++) {
            mixedSliderBoxes.push(word2SliderBoxes[0]);
            word2SliderBoxes.shift();
        }
        while( word1SliderBoxes.length > 0 || word2SliderBoxes.length > 0 ) {
            if(word2SliderBoxes.length > 0) {
                mixedSliderBoxes.push(word2SliderBoxes[0]);
                word2SliderBoxes.shift();
            }
            if(word1SliderBoxes.length > 0) {
                mixedSliderBoxes.push(word1SliderBoxes[0]);
                word1SliderBoxes.shift();
            }
        }
    }

    //console.log(mixedSliderBoxes);
    for (let sliderBox of mixedSliderBoxes) {
        scene.appendChild(sliderBox);
    }
    
    initializeMainSlider();
    toggleDebug();
}

let guiBuildScene = () => {
    let word1 = document.getElementById('word1Input');
    let word2 = document.getElementById('word2Input');
    if(word1.value == "") {
        word1.value = "aren't effective"
    }
    if(word2.value == "") {
        word2.value = "empty strings"
    }
    buildScene(word1.value, word2.value);
}

let reset = () => {
    document.getElementById('word1Input').value = "";
    document.getElementById('word2Input').value = "";
    buildScene('language', 'grammar');
}


/**
 * Todo:
 *  - Vertically center the text - DONE
 *  - Allow the user to change the font size - NO NEED
 *  - Allow the user to move the letters up and down - DONE
 *  - Allow the user to choose the words in the GUI - DONE
 *  - Allow the user to vibrate the words
 *  - Allow the user to adjust the intensity of the vibrations
 */