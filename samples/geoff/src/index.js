/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Geoff why Canada is so awesome"
 *  Alexa: "Canada is really awesome because ..."
 */

/**
 * App ID for your skill. You don't need this to get started,
 * but if you want to ensure that the function only serves
 * requests from your skill, then come back and fill in the
 * app ID here after you've created your skill. You'll find
 * the app ID on the Information tab of your skill after you've
 * created it. Remember to re-upload the code for this function
 * to Lambda after you've updated the value!
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing reasons why Canada is awesome and amazing.
 */
var CANADA_AWESOMENESS = [
    "Canada has ketchup chips.",
    "Canada has cities called Moose Jaw, Elbow, and Eyebrow. Yep, seriously. In Moose Jaw they even have a giant moose statue, and people call each other moose as a term of endearment.",
    "Canadians apologize when it's clearly your fault. Sorry.",
    "in Canada, maple syrup is actually made from maple trees.",
    "Canadians invented hockey.",
    "a Canadian invented basketball.",
    "you know that weird screw that's got a square hole in it and works amazingly? That was invented by a Canadian.",
    "there's not only a one-dollar coin, a two-dollar coin, but there's also a MILLION-DOLLAR COIN. True story. It's made out of 99.999% gold and weighs 100 kilograms (that's 220 pounds).",
    "a third of all the French fries in the entire world come from Canada."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * Geoff is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Geoff = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Geoff.prototype = Object.create(AlexaSkill.prototype);
Geoff.prototype.constructor = Geoff;

Geoff.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("Geoff onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Geoff.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("Geoff onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Geoff.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("Geoff onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Geoff.prototype.intentHandlers = {
    "HomeIntent": function (intent, session, response) {
        response.tell("Geoff lives in Canada, which is a really awesome country!")
    },

    "CanadaIsGreatIntent": function (intent, session, response) {
        handleCanadaRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Geoff where he lives, or why Canada is so awesome, or you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye!";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye!";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleCanadaRequest(response) {
    // Get a random reason why Canada is awesome from the list
    var factIndex = Math.floor(Math.random() * CANADA_AWESOMENESS.length);
    var fact = CANADA_AWESOMENESS[factIndex];

    // Create speech output
    var speechOutput = "Canada is really awesome because " + fact;

    response.tellWithCard(speechOutput, "Geoff", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Geoff skill.
    var geoff = new Geoff();
    geoff.execute(event, context);
};
