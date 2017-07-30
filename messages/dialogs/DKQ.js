module.exports = function () {
    var DKQ_answers = require('../answers/DKQ_mockAnswers.json');   // They are mock for the preview.
    var DKQ_noQuestions = ['0', '1_1', '1_2', '1_3', '2', '3', '4', '5', '6_1', '6_2', '6_3', '6_4', '6_5', '6_6', '7_1', '7_2', '7_3', '7_4', '7_5', '7_6', '7_7', '7_8'];

    bot.dialog('/DKQ', [

        function (session) {
            if (session.userData.indexQuestion_DKQ) {
                session.userData.noQuestion_DKQ = DKQ_noQuestions[session.userData.indexQuestion_DKQ];
                session.userData.indexQuestion_DKQ += 1; 
            } else {
                session.userData.noQuestion_DKQ = DKQ_noQuestions[0];
                session.userData.indexQuestion_DKQ = 1;
            }

            session.sendTyping();
            setTimeout(() => {
                builder.Prompts.choice(session, "DKQ_Q_" + session.userData.noQuestion_DKQ, 
                    session.localizer.gettext(session.preferredLocale(), "DKQ_C_" + session.userData.noQuestion_DKQ));
            }, SECOND * 2);
        },

        function (session, results) {            
            if (DKQ_answers[session.userData.noQuestion_DKQ] == results.response.index) {
                session.send("correct_answer");
            } else {
                session.send("wrong_answer");
            }

            switch (session.userData.noQuestion_DKQ) {
            case "0":
            case "1_3":
            case "3":
            case "4":
            case "5":
                sendTextWithTyping(session, SECOND * 2, "DKQ_A_" + session.userData.noQuestion_DKQ, 1);
                sendTextWithTyping(session, SECOND * 4, "DKQ_A_" + session.userData.noQuestion_DKQ + "_2", -1);
                break;
            case "2":
            case "6_6":
            case "7_8":
                session.sendTyping();
                sendTextWithTyping(session, SECOND * 2, "DKQ_A_" + session.userData.noQuestion_DKQ, -1);
                break;
            default:
                break;
            }

            
            setTimeout(() => {
                session.send("==================");
                
                if (session.userData.indexQuestion_DKQ < 22) {
                    // next question
                    session.beginDialog('/DKQ');
                } else {
                    session.beginDialog('/randomFacts');
                }
            }, SECOND * 5);
            
        }

    ]);
}
