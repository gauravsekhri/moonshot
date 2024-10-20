import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';
import { JwtService } from '@nestjs/jwt';
import ApiResponse from 'src/utils/ApiResponse';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async insertUser(userDto: any): Promise<ApiResponse> {
    try {
      const existingUser = await this.userModel
        .findOne({ email: userDto.email })
        .exec();

      if (existingUser) {
        return new ApiResponse(false, 200, 'User already exist', null);
      }

      const user = await new this.userModel(userDto).save();

      const token = this.jwtService.sign({
        email: user.email,
      });

      return new ApiResponse(true, 200, 'Signup success', {
        fullName: user.fullName,
        email: user.email,
        token,
      });
    } catch (err: any) {
      return new ApiResponse(false, 200, err?.message, null);
    }
  }

  async validateUser(payload: any) {
    try {
      const user: User = await this.userModel
        .findOne({ email: payload?.email })
        .exec();

      if (!user)
        return new ApiResponse(false, 200, 'User does not exist!', null);

      if (user?.password == payload.password) {
        const token = this.jwtService.sign({
          email: user.email,
        });

        return new ApiResponse(true, 200, 'Login success', {
          fullName: user.fullName,
          email: user.email,
          token,
        });
      } else {
        return new ApiResponse(false, 200, 'Invalid credentails', null);
      }
    } catch (err: any) {
      return new ApiResponse(false, 200, err?.message, null);
    }
  }
}
