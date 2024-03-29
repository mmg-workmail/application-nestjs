import { registerAs } from "@nestjs/config";
import { Auth } from "../interface";
import { ConfigKey } from "../enum";

const AuthConfig = registerAs(
    ConfigKey.AUTH, (): Auth => ({

        secret : 'sada;lskjdpaosjdasipoda',
        expiresIn : '1h',
        expiresForgetPassword: 180
    }),
);

export default AuthConfig