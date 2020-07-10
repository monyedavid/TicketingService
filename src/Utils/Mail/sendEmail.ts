import { mailer } from "../../Mail";

export const sendEmail = async (reciepient: string, url: string) => {
    mailer(reciepient, url).catch(console.error);
};
