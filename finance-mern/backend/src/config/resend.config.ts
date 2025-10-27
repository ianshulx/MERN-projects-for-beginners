import { Resend } from "resend";
import { Env } from "./env.config";

export const resend = new Resend(Env.RESEND_API_KEY);
