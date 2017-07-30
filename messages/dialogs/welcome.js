module.exports = function () {

    bot.dialog('/welcome', [

        // WELCOME & ASK NAME
        function (session) {
            sendTextWithTyping(session, SECOND * 1, "สวัสดีค่ะ", 1);
            sendTextWithTyping(session, SECOND * 2, "หนูชื่อน้องจำจำ หนูจำเรื่องสมองเสื่อมได้เยอะเลยล่ะ");
            sendTextWithTyping(session, SECOND * 4, "หนูอยากชวนพี่มาเล่นถามตอบกัน รับรองว่าพี่จะรู้จักโรคสมองเสื่อมมากขึ้น");

            setTimeout(function () {
                builder.Prompts.text(session, "หนูอยากรู้จักพี่จังเลยค่ะ พี่ชื่ออะไรคะ?");
            }, SECOND * 7);

        },

        // START GAME or MORE INFO
        function (session, results) {
            session.userData.name = results.response;
            session.sendTyping();
            setTimeout(function () {
                builder.Prompts.choice(session, `พี่${session.userData.name} เรามาเริ่มเล่นกันเลยดีไหมคะ`,
                    ["เริ่มเล่น", "เล่นอย่างไร"]);
            }, SECOND * 1);
        },

        // ONBOARDING
        function (session, results) {
            if (results.response.entity === "เริ่มเล่น") {
                session.sendTyping();
                setTimeout(function () {
                    session.send("เย้ น้องจำจำมีเพื่อนเล่นแล้ว");
                    session.beginDialog('/thaiDementia');
                }, SECOND * 0.5);

            } else if (results.response.entity === "เล่นอย่างไร") {
                session.sendTyping();
                setTimeout(function () {
                    session.send("น้องจำจำ จะถามคำถามง่าย ๆ เกี่ยวกับโรคสมองเสื่อม");
                    session.sendTyping();
                }, SECOND * 1);

                session.sendTyping();
                setTimeout(function () {
                    session.send(`พี่${session.userData.name} เลือกคำตอบที่คิดว่าถูก`);
                    session.sendTyping();
                }, SECOND * 3);

                setTimeout(function () {
                    builder.Prompts.choice(session, `น้องจะเฉลยคำตอบ พี่${session.userData.name} จะได้รู้จักกับโรคสมองเสื่อมมากขึ้น`,
                        ["เริ่มเล่น"]);
                }, SECOND * 6);
            }

        },

        // START INTRO QUESTIONS
        function (session, results) {
            session.sendTyping();
            setTimeout(function () {
                session.send("เย้ น้องจำจำมีเพื่อนเล่นแล้ว");
                session.beginDialog('/thaiDementia');
            }, SECOND * 1);
        }
    ]);
}

