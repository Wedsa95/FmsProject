import { BaseEntity, User } from './../../shared';

export class Employeer implements BaseEntity {
    constructor(
        public id?: number,
        public employeerName?: string,
        public lastActive?: any,
        public companyRegistrationNumber?: string,
        public user?: User,
        public employeerCompliances?: BaseEntity[],
        public images?: BaseEntity[],
        public vacancies?: BaseEntity[],
    ) {
    }
}
