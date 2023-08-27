import transporter from './Initialize'

export default async function (receiver) {
    await transporter().sendMail({
        from: '"Knury Knurów" <info@system.knuryknurow.pl>',
        to: receiver,
        subject: 'Potwierdzenie rejestracji na turniej Knury Streetball 2023 🏀🔥',
        html: '<h1>Test</h1>',
    });
    console.log(`[mail] sent mail to ${receiver}`)
};