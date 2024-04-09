import { Environment } from "../enum";

export interface AppConfig{
    env : Environment,
    port: number,
    appName: string,
    log: boolean
}