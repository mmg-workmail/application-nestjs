
export class GenerateToken {
    private numeric: string = '0123456789'
    private alpha: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    makeNumeric(length : number) : string {
        return this.makeid(length, this.numeric)
    }
    makeAlpha(length : number) : string {
        return this.makeid(length, this.alpha)
    }
    makeCharacters(length: number) : string {
        return this.makeid(length, this.alpha + this.numeric)
    }

    private makeid(length: number, characters : string) {
        let result = '';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }
}