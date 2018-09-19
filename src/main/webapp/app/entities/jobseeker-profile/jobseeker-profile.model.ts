import { BaseEntity, User } from './../../shared';

export class Jobseeker implements BaseEntity {
    constructor(
        public id?: number,
        public regestrationDate?: any,
        public birthYear?: any,
        public firstName?: string,
        public lastName?: string,
        public unemployed?: boolean,
        public lastActive?: any,
        public user?: User,
        public image?: BaseEntity,
        public video?: BaseEntity,
        public presentation?: BaseEntity,
        public skills?: BaseEntity[],
        public branches?: BaseEntity[],
        public languages?: BaseEntity[],
        public locations?: BaseEntity[],
        public consultingExperiences?: BaseEntity[],
        public roles?: BaseEntity[],
        public emails?: BaseEntity[],
        public phonenumbers?: BaseEntity[],
        public experiences?: BaseEntity[],
        public jobseekerCompliances?: BaseEntity[],
        public educations?: BaseEntity[],
        public workExperiences?: BaseEntity[],
        public references?: BaseEntity[],
    ) {
        this.unemployed = false;
    }
}
