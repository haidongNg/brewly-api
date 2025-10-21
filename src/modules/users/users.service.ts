import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    /**
     * Find all users in the database.
     * @return Promise<User[]> - A promise that resolves to an array of User entities.
     */
    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    /**
     * Find a user by their ID.
     * @param id - The ID of the user to find.
     * @returns A promise that resolves to the found User entity, or null if not found.
     */
    async findOne(id: string): Promise<User | null> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async create(request: CreateUserDto): Promise<User> {
        const found = await this.usersRepository.findOne({ where: { email: request.email } });
        if (found) {
            throw new NotFoundException(`User with email ${request.email} already exists`);
        }
        
        const user = this.usersRepository.create(request);
        return this.usersRepository.save(user);
    }

    /**
     * Delete a user by their ID.
     * @param id - The ID of the user to delete.
     * @returns A promise that resolves when the user is deleted.
     */
    async delete(id: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return this.usersRepository.remove(user);
    }
}
