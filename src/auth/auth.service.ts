import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Change the validateUser method
async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) return null;
    
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) return null;
  
    // Remove toObject() call
    const { password, ...result } = user;
    return result;
  }
  
  // Update the login method payload
  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id, // Use 'id' instead of '_id'
      role: user.role 
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }
}