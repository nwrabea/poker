function checkDecision() {
    const position = document.getElementById('position').value;
    const hand = document.getElementById('cards').value;
    const playerAction = document.getElementById('action').value;

    if (!position || !hand || !playerAction) {
        document.getElementById('result').innerHTML = 'Please select all options';
        return;
    }

    const correct = pokerData[position][hand];
    if (correct) {
        const isCorrect = correct.action === playerAction;
        document.getElementById('result').innerHTML = isCorrect 
            ? `Correct! ${correct.reasoning}`
            : `Incorrect. The recommended action is: ${correct.action}. ${correct.reasoning}`;
    } else {
        document.getElementById('result').innerHTML = 'No data for this combination';
    }
}