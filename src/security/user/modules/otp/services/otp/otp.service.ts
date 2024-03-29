import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from 'src/security/user/entities/otp.entity';
import { User } from 'src/security/user/entities/user.entity';
import { UseCase, Type } from 'src/security/user/enums/otp.enum';
import { DatePK } from 'src/common/helpers/date';

@Injectable()
export class OtpService {
    constructor(
        @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
    ) { }


    async set(user: User, type: Type = Type.MAIL, useCase: UseCase = UseCase.FORGET_PASSWORD): Promise<Otp> {
        const registeredOtp: Otp = new Otp();

        registeredOtp.user = user;

        registeredOtp.use_case = useCase;
        registeredOtp.type = type;

        return this.otpRepository.save(registeredOtp);
    }
    async isValid(token: string, otp: string, ttl: number ): Promise<Otp> {
        const otpModel = await this.otpRepository.findOneOrFail({ where: { token } });

        if (otpModel.is_done) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_ACCEPTABLE,
                    error: 'token was not usable',
                },
                HttpStatus.NOT_ACCEPTABLE
            );
        }

        if (ttl) {
            const date = new DatePK()
            if (!date.isExpired(otpModel.createdAt, ttl)) {
                throw new HttpException(
                    {
                        status: HttpStatus.NOT_ACCEPTABLE,
                        error: 'token was expired',
                    },
                    HttpStatus.NOT_ACCEPTABLE
                );
            }
        }

        if (otpModel.otp !== otp) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_ACCEPTABLE,
                    error: 'OTP is not valid',
                },
                HttpStatus.NOT_ACCEPTABLE
            );
        }

        await this.otpRepository.update({
            id: otpModel.id,
            token
        }, {
            is_done: true
        })

        return otpModel
    }
}
