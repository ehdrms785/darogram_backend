import "./env";

import { adjectives, nouns } from "./words";
import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";

export const generatedSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = (msg) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sgMail
    .send(msg)
    .then(() => {
      console.log("Message sent");
    })
    .catch((error) => {
      console.log(error.response.body);
    });
};

export const sendSecretMail = (adress, secret) => {
  const msg = {
    to: adress,
    from: "daro.allway.ok@gmail.com",
    subject: "Sending with SendGrid is Fun",
    html: `Hello Here is Daro Company <br/> Your Secret Key is <strong>${secret}</strong>`,
  };
  return sendMail(msg);
};

// JWT TOKEN
export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
export const generateSecretCode = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET);
