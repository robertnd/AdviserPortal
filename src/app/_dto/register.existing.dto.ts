import { DataPlatformAdviser } from "./data_platform/data-platform.adviser.dto"

export type RegistrationDto = {
    userName: string
    password: string
    otp: string
    dpAdviser: DataPlatformAdviser
}