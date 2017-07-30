module.exports = function () {
    bot.dialog('/thaiDementia', [
        // thaiDementia1 HOW MANY PATIENTS
        function (session) {
            sendTextWithTyping(session, SECOND * 2, "มารู้จักสถานการณ์ของโรคสมองเสื่อมในประเทศไทยกันก่อนเนอะ", 1);
            setTimeout(() => {
                builder.Prompts.choice(session, `พี่${session.userData.name} คิดว่ามีจำนวนผู้ป่วยโรคสมองเสื่อมในไทยประมาณกี่คนคะ`, "1 แสน|3 แสน|6 แสน|1 ล้าน 2 แสน");
            }, SECOND * 4);
        },

        function (session, results) {
            if (results.response.entity == "6 แสน") {
                session.send("correct_answer");
            } else {
                session.send("wrong_answer");
            }

            sendTextWithTyping(session, SECOND * 2, "ในปี 2558 มีการคาดการณ์ว่ามีจำนวนผู้ป่วยประมาณ 600,000 คน", 1);

            sendTextWithTyping(session, SECOND * 4, "และจะเพิ่มขึ้นเป็น 2 ล้านคนในอีกประมาณ 30 ปี จากภาวะสังคมผู้สูงอายุ");

            // next question
            setTimeout(() => {
                session.send("==================");
                builder.Prompts.choice(session, `พี่${session.userData.name} คิดว่าในคนไทยที่ป่วยเป็นโรคสมองเสื่อมทั้งหมด มีประมาณกี่ % ได้รับการวินิจฉัยโดยแพทย์`, "1-10 %|10-30 %|30-60 %|60-100%");
            }, SECOND * 6); 
        },

        // thaiDementia2 DIAGNOSTIC GAP
        function (session, results) {
            if (results.response.entity == "1-10 %") {
                session.send("correct_answer");
            } else {
                session.send("wrong_answer");
            }

            sendTextWithTyping(session, SECOND * 2, "มีเพียงแค่ 4 % เท่านั้นที่ได้รับการวินิจฉัย และการรักษาจากแพทย์ น่าตกใจเนอะ", 1);

            // next question
            setTimeout(() => {
                session.send("==================");
                builder.Prompts.choice(session, `พี่${session.userData.name} ลองทายสิคะว่า ประเทศไทย เสียเงินไปกับโรคสมองเสื่อม ประมาณกี่ล้านบาทต่อปี`, "570 ล้าน|5,700 ล้าน|57,000 ล้าน");
            }, SECOND * 5);
        },

        // thaiDementia3 Expense
        function (session, results) {
            if (results.response.entity == "57,000 ล้าน") {
                session.send("correct_answer");
            } else {
                session.send("wrong_answer");
            }

            sendTextWithTyping(session, SECOND * 2, "ประเทศไทย มีการใช้จ่ายที่เกี่ยวข้องกับโรคสมองเสื่อมถึง 57,000 ล้านบาท", 1);
            sendTextWithTyping(session, SECOND * 5, "ค่าใช้จ่ายนี้รวม การรักษาทางการแพทย์ (เช่น ค่ายา ค่าบริการทางการแพทย์) การดูแลที่ใช่การแพทย์ (เช่น การบริการทางสังคม) และค่าใช้จ่ายโดยอ้อม (เช่น สมาชิกในบ้านที่ต้องดูแลผู้ป่วยโดยไม่สามารถทำงานได้)");

            // Finishing
            sendTextWithTyping(session, SECOND * 8, "==================");
            sendTextWithTyping(session, SECOND * 8, "น้องจำจำคิดว่า สถานการณ์น่าเป็นห่วงมากเลย");

            setTimeout(() => {
                builder.Prompts.choice(session, `พี่${session.userData.name} ` +
                    `เห็นด้วยหรือไม่คะ`, ["เห็นด้วย", "ไม่เห็นด้วย"]);
            }, SECOND * 12);
        },

        // Move to the next dialog
        function (session, results) {
            if (results.response.entity === "เห็นด้วย") {
                sendTextWithTyping(session, SECOND * 2, "เย้ น้องจำจำดีใจ มีคนคิดเหมือนน้อง", 1);
                sendTextWithTyping(session, SECOND * 5, "เรามาทำความรู้จักกับ โรคสมองเสื่อม กันจริง ๆ จัง ๆ ดีกว่า", -1);
            } else if (results.response.entity === "ไม่เห็นด้วย") {
                sendTextWithTyping(session, SECOND * 2, "ว้าาา น้องจำจำเสียใจ");
                sendTextWithTyping(session, SECOND * 5, "เรามาทำความรู้จักกับ โรคสมองเสื่อม กันจริง ๆ จัง ๆ ดีกว่า", 1);
                sendTextWithTyping(session, SECOND * 8, `เผื่อพี่ ${session.userData.name} จะได้เห็นว่าโรคนี้น่ากลัวจริง ๆ นะ`, -1);
            }
            setTimeout(() => {
                session.beginDialog('/DKQ');
            }, SECOND * 9);
        }

    ]);
}
