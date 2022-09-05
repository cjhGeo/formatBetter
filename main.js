let formatBtn = document.querySelector("#formatBtn");

let getText = function () {
    let getText = (document.querySelector("#paragraph-text").value).toString();
    return getText;
}

// Add spaces before (or after) punctuation marks when necessary
function punctuation(text) {
    let punctuationPresentAP; //space after punctuation (AP: After punctuation)
    let punctuationPresentFP; //space before punctuation (FP: Front of punctuation)
    let prevChar; //Previous Character
    let periodPresent;
    let autoAdd = true; // Auto add is just normal appending at line 49
    let counter = 0; // counter for the weird checking if period requires space
    let result = ""; // final result of this function
    text = (text.toString()).split(""); //Splitting every character in the string into an array

    // Going through every character in array
    for (let i = 0; i < text.length; i++) {
        // Checking if and adding space after punctuation if required
        if (punctuationPresentAP) {
            text[i] = (text[i] == " " ? text[i] : " " + text[i]);
        }

        // Checking for punctuation
        punctuationPresentAP = (text[i] == "," || text[i] == "?" || text[i] == ")" || text[i] == "!" || text[i] == ":" || text[i] == "&" || text[i] == "-" || text[i] == "+" || text[i] == "=" || text[i] == "]" || text[i] == "}" || text[i] == "<" || text[i] == ">" ? true : false);
        punctuationPresentFP = (text[i] == "(" || text[i] == "[" || text[i] == "{" || text[i] == "&" || text[i] == "<" || text[i] == ">" ? true : false);
        periodPresent = (text[i] == "." ? true : false);

        // The lengthy and ineffiecient period space requirement checker and do-er?
        if (periodPresent || (counter < 3 && counter > 0)) {
            autoAdd = false;
            counter += 1;
        }
        if (counter == 3) {
            text[i] = (text[i] == "." ? "." + prevChar + text[i] : (prevChar == " " ? "." + prevChar + text[i] : ". " + prevChar + text[i]));
            counter = 0;
            periodPresent = false;
            autoAdd = true;
        }

        if (punctuationPresentFP) {
            text[i] = (prevChar == " " ? text[i] : " " + text[i]);
        }

        //Basically just setting the next previous character
        prevChar = text[i];

        if (autoAdd) {
            result = result + text[i];
        }
    }
    if (!autoAdd) {
        result = result + "."
    }
    return result;
}

// function capitalise(text) {

// }

formatBtn.addEventListener("click", function () {
    let result = "";
    let text = getText();

    result = result + punctuation(text);

    console.log(result);

    document.querySelector("#paragraph-text").value = result;
});