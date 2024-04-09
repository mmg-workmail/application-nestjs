import { Global, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AclModule } from './acl/acl.module';

@Global()
@Module({
    imports: [UserModule, AuthModule, AclModule],
    exports: [UserModule, AuthModule, AclModule],
})
export class SecurityModule { }
