import { Test, TestingModule } from "@nestjs/testing";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { RolesGuardClass } from "./role.strategy";

describe('Role Guard Class', () => {
    let rolesGuardClass: RolesGuardClass;

    beforeEach(async () => {
        class Mock {}

        const services = [
            Reflector,
            JwtService,
        ]

        const servicesWithMock = services.map(serv => ({provide: serv, useClass: Mock}))

        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [
                RolesGuardClass,
                ...servicesWithMock
            ]
        }).compile();

        rolesGuardClass = moduleRef.get<RolesGuardClass>(RolesGuardClass);
    });

    test('should return true', async () => {
        const roles: string[] = ['cashier'] 
        const roleList: string[] = ['cashier']
        const result = true
           
        expect(await rolesGuardClass.validateUserRole(roles, roleList)).toEqual(result)
    })

    test('should return false', async () => {
        const roles: string[] = ['cashier'] 
        const roleList: string[] = ['seller']
        const result = false
        
        expect(await rolesGuardClass.validateUserRole(roles, roleList)).toEqual(result)
    })
});