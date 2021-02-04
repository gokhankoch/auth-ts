import { scrypt, randomBytes }  from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

class Password {
    static async encrypt(password: string){

        const salt = randomBytes(8).toString('hex');
        const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

        return `${buffer.toString('hex')}.${salt}`
    }

    static async IsEqual(currentPassword: string, candidatePassword:string){
        const [encrptPassword, salt] = currentPassword.split('.');
        const buffer = (await scryptAsync(candidatePassword, salt, 64)) as Buffer;
        
        return buffer.toString('hex') === encrptPassword;
    }
}

export {Password};