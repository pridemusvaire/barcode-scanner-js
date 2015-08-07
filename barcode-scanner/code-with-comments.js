// only init when the page has loaded
$(document).ready(function() {
    // variable to ensure we wait to check the input we are receiving
    // you will see how this works further down
    var pressed = false; 
    // Variable to keep the barcode when scanned. When we scan each
    // character is a keypress and hence we push it onto the array. Later we check
    // the length and final char to ensure it is a carriage return - ascii code 13
    // this will tell us if it is a scan or just someone writing on the keyboard
    var chars = []; 
    // trigger an event on any keypress on this webpage
    $(window).keypress(function(e) {
        // check the keys pressed are numbers
        if (e.which >= 48 && e.which <= 57) {
            // if a number is pressed we add it to the chars array
            chars.push(String.fromCharCode(e.which));
        }
        // debug to help you understand how scanner works
        console.log(e.which + ":" + chars.join("|"));
        // Pressed is initially set to false so we enter - this variable is here to stop us setting a
        // timeout everytime a key is pressed. It is easy to see here that this timeout is set to give 
        // us 1 second before it resets everything back to normal. If the keypresses have not matched 
        // the checks in the readBarcodeScanner function below then this is not a barcode
        if (pressed == false) {
            // we set a timeout function that expires after 1 sec, once it does it clears out a list 
            // of characters 
            setTimeout(function(){
                // check we have a long length e.g. it is a barcode
                if (chars.length >= 10) {
                    // join the chars array to make a string of the barcode scanned
                    var barcode = chars.join("");
                    // debug barcode to console (e.g. for use in Firebug)
                    console.log("Barcode Scanned: " + barcode);
                    // assign value to some input (or do whatever you want)
                    $("#barcode").val(barcode);
                }
                chars = [];
                pressed = false;
            },500);
        }
        // set press to true so we do not reenter the timeout function above
        pressed = true;
    });
});
// this bit of code just ensures that if you have focus on the input which may be in a form
// that the carriage return does not cause your form to be submitted. Some scanners submit
// a carriage return after all the numbers have been passed.
$("#barcode").keypress(function(e){
    if ( e.which === 13 ) {
        console.log("Prevent form submit.");
        e.preventDefault();
    }
});