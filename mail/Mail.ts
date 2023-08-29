import {mail} from './Initialize'

export default async function (receiver) {
    await mail().sendMail({
        from: '"botprzemek" <info@mail.botprzemek.pl>',
        to: receiver,
        subject: 'Witaj!',
        html: '<h1>Test</h1>',
    });
};