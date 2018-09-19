import { BaseEntity } from './../../shared';

export class Education implements BaseEntity {
    constructor(
        public id?: number,
        public institution?: string,
        public program?: string,
        public startDate?: any,
        public endDate?: any,
        public jobseeker?: BaseEntity,
        public degree?: BaseEntity,
    ) {
    }
}
