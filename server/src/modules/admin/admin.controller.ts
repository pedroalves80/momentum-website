import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { AdminUpdateUserDto, CreateUserDto, MergeUserDto, UserDto } from '../../@common/dto/user/user.dto';
import { ApiOkPaginatedResponse, PaginatedResponseDto } from '../../@common/dto/paginated-response.dto';
import { MapDto, MapUpdateDto } from '../../@common/dto/map/map.dto';
import { MapsGetAllQuery } from '../../@common/dto/query/map-queries.dto';
import { ReportDto, UpdateReportDto } from '../../@common/dto/report/report.dto';
import { Roles } from '../../@common/decorators/roles.decorator';
import { ERole } from '../../@common/enums/user.enum';

@ApiBearerAuth()
@Controller('api/v1/admin')
@ApiTags('Admin')
@UseGuards(JwtAuthGuard)
@Roles(ERole.ADMIN)
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post('/users')
    @ApiOperation({ summary: 'Create a placeholder user' })
    @ApiOkResponse({ type: UserDto, description: 'The newly created user' })
    public CreatePlaceholderUser(@Query() query: CreateUserDto): Promise<UserDto> {
        return void 0;
    }

    @Post('/users/merge')
    @ApiOperation({
        summary:
            'Create a placeholder user, used when a placeholder should be merged with a real user, generally mappers.'
    })
    @ApiOkResponse({ type: UserDto, description: 'The merged user' })
    @ApiNotFoundResponse({ description: 'If either ID does not correspond to a user' })
    @ApiBadRequestResponse({ description: 'If the placeholder ID is not a placeholder' })
    public MergeUsers(@Query() query: MergeUserDto): Promise<UserDto> {
        return void 0;
    }

    @Patch('/users/:userID')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: "Update the target user's data" })
    @ApiParam({
        name: 'userID',
        type: Number,
        description: 'ID of the user to update',
        required: true
    })
    @ApiBody({
        type: AdminUpdateUserDto,
        description: 'The data to update on the user',
        required: true
    })
    @ApiNoContentResponse({ description: 'The user was updated successfully' })
    @ApiBadRequestResponse({ description: 'Invalid user update data' })
    public async UpdateUser(@Param('userID', ParseIntPipe) userID: number, @Body() body: AdminUpdateUserDto) {
        return void 0;
    }

    @Delete('/users/:userID')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete the target user' })
    @ApiParam({
        name: 'userID',
        type: Number,
        description: 'ID of the user to delete',
        required: true
    })
    @ApiNoContentResponse({ description: 'The user was deleted successfully' })
    public async DeleteUser(@Param('userID', ParseIntPipe) userID: number) {
        return void 0;
    }

    // This seems to only be used to reset all cosmetic or ranked XP.
    // Such a thing terrifies me, so lets leave it for now.
    @Patch('/user-stats')
    @ApiOperation({ summary: "Update every user's stats" })
    public async UpdateUserStats() {
        return void 0;
    }

    @Get('/maps')
    @ApiOperation({ description: 'Retrieve a list of maps' })
    @ApiOkPaginatedResponse(MapDto, { description: 'Paginated list of maps' })
    @ApiBadRequestResponse({ description: 'Invalid query data' })
    public async GetMaps(@Query() query: MapsGetAllQuery): Promise<PaginatedResponseDto<MapDto>> {
        return void 0;
    }

    @Patch('/maps/:mapID')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: "Update the target map's status flags" })
    @ApiParam({
        name: 'mapID',
        type: Number,
        description: 'ID of the map to update',
        required: true
    })
    @ApiBody({
        type: MapDto,
        description: 'The new status flags to update on the map',
        required: true
    })
    @ApiNoContentResponse({ description: 'The map was updated successfully' })
    @ApiBadRequestResponse({ description: 'Invalid map update data' })
    public async UpdateMap(@Param('mapID', ParseIntPipe) mapID: number, @Body() body: MapUpdateDto) {
        return void 0;
    }

    @Delete('/maps/:mapID')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete the target map' })
    @ApiParam({
        name: 'mapID',
        type: Number,
        description: 'ID of the map to delete',
        required: true
    })
    @ApiNoContentResponse({ description: 'The map was deleted successfully' })
    public async DeleteMap(@Param('mapID', ParseIntPipe) mapID: number) {
        return void 0;
    }

    @Get('/reports')
    @ApiOperation({ description: 'Retrieve a list of reports' })
    @ApiOkPaginatedResponse(ReportDto, { description: 'Paginated list of reports' })
    @ApiBadRequestResponse({ description: 'Invalid query data' })
    public async GetReports(@Query() query: MapsGetAllQuery): Promise<PaginatedResponseDto<ReportDto>> {
        return void 0;
    }

    @Patch('/reports/:reportID')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Update the target report' })
    @ApiParam({
        name: 'reportID',
        type: Number,
        description: 'ID of the report to update',
        required: true
    })
    @ApiBody({
        type: UpdateReportDto,
        description: 'The updated resolution message and status',
        required: true
    })
    @ApiNoContentResponse({ description: 'The report was updated successfully' })
    public UpdateReport(@Param('reportID', ParseIntPipe) reportID: number, @Body() body: ReportDto) {
        return void 0;
    }

    // TODO: XPSystem GET/PUT
    // I have no idea how these work, lets do them last.
}
