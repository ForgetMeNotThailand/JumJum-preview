module.exports = function () {
    bot.dialog('/randomFacts', [

        function (session) {
            sendTextWithTyping(session, SECOND * 2, "ตอนนี้ น้องจำจำ กำลังเตรียมเกมใหม่ ๆ มาให้พี่ ๆ เล่นกันอยู่ค่ะ", 1);

            var msg = new builder.Message(session)
                .text(`ระหว่างรอพี่${session.userData.name} อยากทำอะไรดีคะ`)
                .suggestedActions(
                    builder.SuggestedActions.create(
                        session, [
                            builder.CardAction.imBack(session, "รับสาระน่ารู้", "รับสาระน่ารู้"),
                            builder.CardAction.imBack(session, "ให้ข้อเสนอแนะ", "ให้ข้อเสนอแนะ"),
                            builder.CardAction.imBack(session, "ติดต่อผู้พัฒนา", "ติดต่อผู้พัฒนา")
                        ]
                    ));
            setTimeout(() => {
                builder.Prompts.text(session, msg);
            }, SECOND * 3);
        },

        function (session, results) {
            switch (results.response) {
            case "รับสาระน่ารู้":
                sendTextWithTyping(session, SECOND * 1, "สาระ", 1);
                session.beginDialog('/randomFacts');
                break;

            case "ให้ข้อเสนอแนะ":
                builder.Prompts.text(session, "อยากให้ น้องจำจำ พัฒนาตรงไหน บอกมาเลยนะคะ");
                break;

            case "ติดต่อผู้พัฒนา":
                sendTextWithTyping(session, SECOND * 1, "ส่งข้อความมาที่เพจ \"อย่าปล่อยให้ฉันลืม\" นะคะ", 1);
                session.beginDialog('/randomFacts');
                break;

            default:
                sendTextWithTyping(session, SECOND * 1, "น้องจำจำไม่เข้าใจ เลือกจากตัวเลือกนะคะ", 1);
                session.beginDialog('/randomFacts');
                break;
            }
        },

        function (session, results) {
            sendTextWithTyping(session, SECOND * 1, "ขอบคุณสำหรับข้อเสนอแนะค่ะ", 1);
            session.beginDialog('/randomFacts');
        }

    ]);
}
