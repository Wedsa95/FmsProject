import { BaseEntity } from './../../shared';

export class WorkExperience implements BaseEntity {
    constructor(
        public id?: number,
        public companyName?: string,
        public position?: string,
        public description?: any,
        public startDate?: any,
        public endDate?: any,
        public jobseeker?: BaseEntity,
    ) {
    }
}
