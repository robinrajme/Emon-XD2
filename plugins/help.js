const { malvin } = require("../malvin");
const moment = require("moment");

let botStartTime = Date.now();
const ALIVE_IMG = "https://files.catbox.moe/faespg.jpg";

malvin({
    pattern: "help",
    desc: "Display all available bot commands",
    category: "main",
    react: "🧠",
    filename: __filename
}, async (conn, mek, m, { reply, from }) => {
    try {
        const pushname = m.pushName || "User";
        const now = moment();
        const time = now.format("HH:mm:ss");
        const date = now.format("dddd, MMMM Do YYYY");

        const uptime = (() => {
            const ms = Date.now() - botStartTime;
            const h = Math.floor(ms / (1000 * 60 * 60));
            const m = Math.floor((ms / (1000 * 60)) % 60);
            const s = Math.floor((ms / 1000) % 60);
            return `${h}h ${m}m ${s}s`;
        })();

        const caption = `
╭━━━〔 ⚡ 𝐄𝐌𝐨𝐧-𝐁𝐡𝐚𝐢-𝐁𝐨𝐭 ⚡ 〕━━━╮
┃ 👤 *User:* ${pushname}
┃ 📆 *Date:* ${date}
┃ 🕒 *Time:* ${time}
┃ ⏳ *Uptime:* ${uptime}
╰━━━━━━━━━━━━━━━━━━━━━━╯

🔸 *Available Commands Categories:*

📌 𝗚𝗲𝗻𝗲𝗿𝗮𝗹  
• say, ping, alive, infoBot, menu

🛠 𝗔𝘂𝗱𝗶𝗼 𝗘𝗳𝗳𝗲𝗰𝘁𝘀  
• bass, blown, deep, fast, nightcore, robot, reverse, slow, earrape

🎨 𝗔𝗜 / 𝗚𝗘𝗡𝗔𝗜  
• emon, emonai, ai, gpt, dalle, bug

🧰 𝗧𝗼𝗼𝗹𝘀  
• calculator, tts, tempmail, binary, attr, mp3, emojimix

📥 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗿𝘀  
• youtube, play, ytmp3, ytmp4, instagram, facebook, pinterest, apk

👥 𝗚𝗿𝗼𝘂𝗽 𝗠𝗮𝗻𝗮𝗴𝗲𝗺𝗲𝗻𝘁  
• kick, promote, demote, welcome, group, setppgc, setdesc, setname, linkgroup

🔎 𝗦𝗲𝗮𝗿𝗰𝗵  
• google, imdb, pinterest, play, youtube

👑 𝗢𝘄𝗻𝗲𝗿 𝗢𝗻𝗹𝘆  
• join, leave, block, unblock, setppbot, anticall

⭐ 𝗣𝗿𝗲𝗺𝗶𝘂𝗺 / 𝗕𝘂𝗴 𝗧𝗼𝗼𝗹𝘀  
• coming soon → bugmenu, docbug, unlimitedbug

🆘 *Use commands with prefix:*  .  or your configured one.

🧠 *Bot is fully online and operational!*  
🌐 *Built by:* ⚡ 𝐄𝐌𝐨𝐧-𝐁𝐡𝐚𝐢 ⚡
        `.trim();

        const isValidImage = ALIVE_IMG && ALIVE_IMG.startsWith("http");

        if (isValidImage) {
            await conn.sendMessage(from, {
                image: { url: ALIVE_IMG },
                caption,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420656466131@newsletter',
                        newsletterName: '𝐄𝐌𝐨𝐧-𝐁𝐡𝐚𝐢-𝐁𝐨𝐭',
                        serverMessageId: 143
                    }
                }
            }, { quoted: mek });
        } else {
            reply(caption);
        }

    } catch (err) {
        console.error("❌ Help command error:", err);
        reply(`⚠️ An error occurred while generating the help menu.\n\n${err.message}`);
    }
});
