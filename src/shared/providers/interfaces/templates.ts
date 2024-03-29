import { UseCase } from "src/security/user/enums/otp.enum"

export interface Template{
    tpl: string,
    property: Function
}
export interface TypeTemplate{
    [UseCase.FORGET_PASSWORD]: Template
}
export interface Property{
    key: string,
    value: string
}