import { registerAs } from "@nestjs/config";
import { ProvidersConfig } from "../interface";
import { ConfigKey } from "../enum";

const ProvidersConfig = registerAs(
    ConfigKey.PROVIDERS, (): ProvidersConfig => ({
        sms: {
            token: process.env.PROVIDERS_SMS_TOKEN,
            accountID: process.env.PROVIDERS_SMS_ACCOUNT_ID,
            from: process.env.PROVIDERS_SMS_FROM
        }
    }),
);

export default ProvidersConfig