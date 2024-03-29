
import { Otp } from "src/security/user/entities/otp.entity";
import { UseCase } from "src/security/user/enums/otp.enum";
import { TypeTemplate, Property } from "../../interfaces/templates";

export class SmsTemplate {
    private templates: TypeTemplate = {
        forget_password : {
            tpl: `Hello Dear {{username}}, it's mail verification code : {{code}} `,
            property: (otp: Otp) => {
                return [
                    {
                        key: 'username',
                        value: otp.user.username
                    },
                    {
                        key: 'code',
                        value: otp.otp
                    }
                ]
            }
        }
    }
    private generate(tpl: string, property: Property[]) {

        let html = tpl;
        for (let key in property) {
            const p = property[key]
            html = html.replace(new RegExp('{{' + p.key + '}}', 'g'), p.value);
        }
        return html;
    }
    get(otp: Otp) {
        const useCase: UseCase = otp.use_case
        return this.generate(this.templates[useCase]?.tpl, this.templates[useCase]?.property(otp))
    }
}