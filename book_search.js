/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };
    scannedTextObj.forEach(book => {
        book.Content.forEach(sentence =>{
            if (sentence.Text.includes(searchTerm)){
                result.Results.push({
                    "ISBN": book.ISBN,
                    "Page": sentence.Page,
                    "Line": sentence.Line
                });
            }
        });
    });
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/** Example not found output object */
const notFound = {
    "SearchTerm": "not",
    "Results": []
}

/** Example multiple occurance output object */
const multi = findSearchTermInBooks("the", [
    {
        "Title": "Test1",
        "ISBN": "12345",
        "Content": [{"Page": 1, "Line": 1, "Text": "the dog is walking"}]
    },
    {
        "Title": "Test2",
        "ISBN": "678910",
        "Content": [{"Page": 2, "Line": 2, "Text": "singing the christmas song"}]
    }
]);
const multiOut = {
    "SearchTerm": "the",
    "Results": [
        { "ISBN": "12345", "Page": 1, "Line": 1 },
        { "ISBN": "678910", "Page": 2, "Line": 2 }
    ]
};
/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** We can check that, given an input that isn't in the data, we'll get an empty result*/
const test3result = findSearchTermInBooks("not", twentyLeaguesIn);
if (JSON.stringify(notFound) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", notFound);
    console.log("Received:", test3result);
}
/** We can check that, given two inputs that differ in capitalization, we'll get different results*/
const test4Capt = findSearchTermInBooks("The", twentyLeaguesIn);
const test4lower = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(test4Capt) === JSON.stringify(test4lower)) {
    console.log("Fail: Test 4");
    console.log("Unsuccessfully checked lowercase vs uppercase");
    console.log(test4Capt," should be different from ",test4lower);
} else {
    console.log("Pass: Test 4");
}

/** We can check that when we try to search on an empty input, we should get empty results*/
const empty = findSearchTermInBooks("the", []);
if (JSON.stringify(empty) === JSON.stringify({ "SearchTerm": "the", 
                                                "Results": [] })) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", { "SearchTerm": "the",
                                "Results": [] });
    console.log("Received:", emptyResult);
}

/** We can check that given a known input from multiple books, we should get the correct occurance from both books*/
if (JSON.stringify(multi) === JSON.stringify(multiOut)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", multiOut);
    console.log("Received:", multi);
}
