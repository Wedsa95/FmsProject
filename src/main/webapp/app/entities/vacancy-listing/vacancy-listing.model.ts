import { BaseEntity } from './../../shared';

export class VacancyListing implements BaseEntity {
    constructor(
        public id?: number,
        public uploadDate?: any,
        public vacancieRole?: string,
        public jobDescription?: any,
        public aspirantDescription?: any,
        public aboutDescription?: any,
        public contactPerson?: string,
        public employeer?: BaseEntity,
        public degree?: BaseEntity,
        public consultingExperience?: BaseEntity,
        public extents?: BaseEntity[],
        public roles?: BaseEntity[],
        public locations?: BaseEntity[],
        public languages?: BaseEntity[],
        public branches?: BaseEntity[],
        public skills?: BaseEntity[],
    ) {
    }
}
