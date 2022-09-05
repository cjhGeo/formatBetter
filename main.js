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

        // This checks for the first period and starts the checking
        if (periodPresent || (counter < 3 && counter > 0)) {
            // console.log(counter) //if you really don't understand, console.log here
            autoAdd = false;
            counter += 1;
        }
        // This takes action based on the determined necessacity for a space behind the period
        if (counter == 3) {
            // console.log("Current: " + text[i] + " Previous: " + prevChar + " " + counter + " What") //if you really don't understand, console.log
            text[i] = (text[i] == "." ? "." + prevChar + text[i] : (prevChar == " " ? "." + prevChar + text[i] : ". " + prevChar + text[i]));
            counter = 0;
            periodPresent = false;
            autoAdd = true;
        }

        // This adds a space in front of the character which should have it
        if (punctuationPresentFP) {
            text[i] = (prevChar == " " ? text[i] : " " + text[i]);
        }

        //Basically just setting the next previous character
        prevChar = text[i];
        // console.log(prevChar) //if you really don't understand, console.log

        // The normal appending/stitching of the string back together character by character (with the exception of periods)
        if (autoAdd) {
            result = result + text[i];
        }
    }

    //Checking whether final period is required because above period checker cuts off period if it is present at the very end
    if (!autoAdd) {
        result = result + "."
    }

    //returns the hopefull less blinding paragraph
    return result;
}

// function capitalise(text) {

// }

// On button click
formatBtn.addEventListener("click", function () {
    let result = "";
    let text = getText();

    result = result + punctuation(text);

    console.log(result);

    document.querySelector("#paragraph-text").value = result;
});