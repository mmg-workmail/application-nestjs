
export class DatePK {

    isExpired(date: Date, ttl: number = 0) : boolean {
        const milisecond_ttl = ttl * 1000;
        const now = +new Date() ;
        const expiredTimestamp = +new Date(date) + milisecond_ttl
        return now < expiredTimestamp
    }
}