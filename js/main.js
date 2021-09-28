let modifyCharHeight = () => {
    const allowedDelta = 20;
    let mobileChars = document.getElementsByClassName('mobileChar');
    let rangeSliderValue = document.getElementById('rangeSlider').value;
    let newTop = 45 - ((rangeSliderValue/100) * allowedDelta)
    console.log(rangeSliderValue);
    for (let mobileChar of mobileChars) {
        mobileChar.style.top = newTop.toString() + 'vh';
    }
}