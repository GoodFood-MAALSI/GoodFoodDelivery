import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
  Query,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtPayloadType } from '../auth/strategies/types/jwt-payload.type';
import { User as UserDecorator } from './decorators/user.decorator';
import { User, UserStatus } from './entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import { FilterUsersDto } from './dto/filter-users.dto';
import { Pagination } from '../utils/pagination';
import { BypassResponseWrapper } from '../utils/decorators/bypass-response-wrapper.decorator';
import { InterserviceAuthGuardFactory } from '../interservice/guards/interservice-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(InterserviceAuthGuardFactory(['super-admin', 'admin']))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs' })
  @ApiResponse({ status: 403, description: 'Accès interdit' })
  async findAll(
    @Query() filterUsersDto: FilterUsersDto,
    @Req() req: Request,
  ): Promise<{ users: User[]; links: any; meta: any }> {

    try {
      const { users, total } = await this.usersService.findAllUsers(filterUsersDto);
      const { links, meta } = Pagination.generatePaginationMetadata(
        req,
        filterUsersDto.page || 1,
        total,
        filterUsersDto.limit || 10,
      );

      return { users, links, meta };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Échec de la récupération des utilisateurs',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @UseGuards(InterserviceAuthGuardFactory(['deliverer', 'super-admin', 'admin']))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer un utilisateur par ID' })
  @ApiResponse({ status: 200, description: 'Utilisateur trouvé' })
  @ApiResponse({ status: 403, description: 'Accès interdit' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async findOne(
    @Param('id') id: string,
    @UserDecorator() currentUser: JwtPayloadType,
  ): Promise<User> {
    const userId = +id;

    if (!currentUser?.id) {
      throw new HttpException(
        'Utilisateur non authentifié',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (currentUser.id !== userId) {
      throw new HttpException(
        'Vous ne pouvez accéder qu’à votre propre compte',
        HttpStatus.FORBIDDEN,
      );
    }

    const user = await this.usersService.findOneUser({ id: userId });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Patch(':id')
  @UseGuards(InterserviceAuthGuardFactory(['deliverer', 'super-admin', 'admin']))
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Mettre à jour le prénom et/ou nom d'un utilisateur",
  })
  @ApiResponse({ status: 200, description: 'Utilisateur mis à jour' })
  @ApiResponse({ status: 403, description: 'Accès interdit' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UserDecorator() currentUser: JwtPayloadType,
  ): Promise<Partial<User>> {
    const userId = +id;

    if (!currentUser?.id) {
      throw new HttpException(
        'Utilisateur non authentifié',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (currentUser.id !== userId) {
      throw new HttpException(
        'Vous ne pouvez modifier que votre propre compte',
        HttpStatus.FORBIDDEN,
      );
    }

    const user = await this.usersService.findOneUser({ id: userId });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updatedUser = await this.usersService.updateUser(
      userId,
      updateUserDto,
    );
    return updatedUser;
  }

  @Delete(':id')
  @UseGuards(InterserviceAuthGuardFactory(['deliverer', 'super-admin', 'admin']))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer définitivement un utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur supprimé définitivement',
  })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  @ApiResponse({
    status: 403,
    description: 'Vous ne pouvez supprimer que votre propre compte',
  })
  async remove(
    @Param('id') id: string,
    @UserDecorator() currentUser: JwtPayloadType,
  ): Promise<{ message: string }> {
    const userId = +id;

    if (!currentUser?.id) {
      throw new HttpException(
        'Utilisateur non authentifié',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (currentUser.id !== userId) {
      throw new HttpException(
        'Vous ne pouvez supprimer que votre propre compte',
        HttpStatus.FORBIDDEN,
      );
    }

    const user = await this.usersService.findOneUser({ id: userId });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return this.usersService.deleteUser(userId);
  }

  @Patch(':id/suspend')
  @UseGuards(InterserviceAuthGuardFactory(['super-admin', 'admin']))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Suspendre un utilisateur' })
  @ApiResponse({ status: 200, description: 'Utilisateur suspendus avec succès' })
  @ApiResponse({ status: 403, description: 'Accès interdit' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  @ApiResponse({ status: 400, description: 'Utilisateur déjà suspendu' })
  async suspend(
    @Param('id') id: string
  ): Promise<{ message: string }> {
    const userId = +id;

    const user = await this.usersService.findOneUser({ id: userId });
    if (!user) {
      throw new HttpException('Utilisateur non trouvé', HttpStatus.NOT_FOUND);
    }

    if (user.status === UserStatus.Suspended) {
      throw new HttpException(
        'L\'utilisateur est déjà suspendu',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.usersService.suspendUser(userId);
    return { message: 'Utilisateur suspendus avec succès' };
  }

  @Patch(':id/restore')
  @UseGuards(InterserviceAuthGuardFactory(['super-admin', 'admin']))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Réactiver un utilisateur' })
  @ApiResponse({ status: 200, description: 'Utilisateur réactivés avec succès' })
  @ApiResponse({ status: 403, description: 'Accès interdit' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  @ApiResponse({ status: 400, description: 'Utilisateur non suspendu' })
  async restore(
    @Param('id') id: string
  ): Promise<{ message: string }> {
    const userId = +id;

    const user = await this.usersService.findOneUser({ id: userId });
    if (!user) {
      throw new HttpException('Utilisateur non trouvé', HttpStatus.NOT_FOUND);
    }

    if (user.status !== UserStatus.Suspended) {
      throw new HttpException(
        'L\'utilisateur n\'est pas suspendu',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.usersService.restoreUser(userId);
    return { message: 'Utilisateur réactivés avec succès' };
  }

  @Get('/verify/:userId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Vérifier un utilisateur pour les appels inter-services' })
  @ApiResponse({ status: 200, description: 'Utilisateur vérifié' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Rôle invalide' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async verifyDeliverer(@Param('userId') userId: string, @Req() req) {

    // Récupérer le token depuis l'en-tête Authorization
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new HttpException('Token manquant', HttpStatus.UNAUTHORIZED);
    }

    try {
      // Valider le token avec la clé secrète
      let decoded: any = null;
      const secret = process.env.AUTH_JWT_SECRET;
      decoded = jwt.verify(token, secret);
      const authUserId = decoded.id?.toString();
      const authRole = decoded.role;

      if (!authUserId || !authRole) {
        throw new HttpException('ID ou rôle manquant dans le token', HttpStatus.UNAUTHORIZED);
      }

      if (authRole !== 'deliverer') {
        throw new HttpException('Rôle invalide', HttpStatus.FORBIDDEN);
      }

      if (userId !== authUserId) {
        throw new HttpException('Utilisateur non autorisé', HttpStatus.FORBIDDEN);
      }

      const user = await this.usersService.findOneUser({ id: +userId });
      if (!user) {
        throw new HttpException('Utilisateur non trouvé', HttpStatus.NOT_FOUND);
      }

      return { message: 'Livreur vérifié' };
    } catch (err) {
      throw new HttpException('Erreur de validation du token', HttpStatus.UNAUTHORIZED);
    }
  }

  @Get('interservice/:id')
  @ApiExcludeEndpoint()
  @BypassResponseWrapper()
  @ApiOperation({ summary: 'Récupérer les informations d’un livreur pour appels interservices' })
  @ApiParam({ name: 'id', description: 'ID du livreur', type: Number })
  @ApiResponse({ status: 200, description: 'Livreur récupéré avec succès', type: User })
  @ApiResponse({ status: 400, description: 'ID invalide' })
  @ApiResponse({ status: 404, description: 'Livreur non trouvé' })
  async getDeliverer(@Param('id') id: string): Promise<Partial<User>> {
    const userId = parseInt(id);
    if (isNaN(userId)) {
      throw new HttpException('ID doit être un nombre', HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersService.findOneUser({ id: userId });
    if (!user) {
      throw new HttpException('Livreur non trouvé', HttpStatus.NOT_FOUND);
    }

    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
    };
  }
}