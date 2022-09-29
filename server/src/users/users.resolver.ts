import { Args, Info, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateOneUserArgs,
  DeleteOneUserArgs,
  FindManyUserArgs,
  FindUniqueUserArgs,
  UpdateOneUserArgs,
  User,
} from 'src/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [User])
  async users(
    @Args() params: FindManyUserArgs,
    @Info() info: GraphQLResolveInfo,
  ) {
    const select = new PrismaSelect(info).value;
    const args = { ...params, ...select };
    return this.prismaService.user.findMany(args);
  }

  @Query(() => Int)
  async usersCount(@Args() params: FindManyUserArgs) {
    const { distinct, ...args } = params;
    return this.prismaService.user.count(args);
  }

  @Query(() => User)
  async user(
    @Args() params: FindUniqueUserArgs,
    @Info() info: GraphQLResolveInfo,
  ) {
    const select = new PrismaSelect(info).value;
    const args = { ...params, ...select };
    return this.prismaService.user.findUnique(args);
  }

  @Mutation(() => User)
  async createUser(
    @Args() params: CreateOneUserArgs,
    @Info() info: GraphQLResolveInfo,
  ) {
    const select = new PrismaSelect(info).value;
    const args = { ...params, ...select };
    return this.prismaService.user.create(args);
  }

  @Mutation(() => User)
  async updateUser(
    @Args() params: UpdateOneUserArgs,
    @Info() info: GraphQLResolveInfo,
  ) {
    const select = new PrismaSelect(info).value;
    const args = { ...params, ...select };
    return this.prismaService.user.update(args);
  }

  @Mutation(() => User)
  async deleteUser(
    @Args() params: DeleteOneUserArgs,
    @Info() info: GraphQLResolveInfo,
  ) {
    const select = new PrismaSelect(info).value;
    const args = { ...params, ...select };
    return this.prismaService.user.delete(args);
  }
}
