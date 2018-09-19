import { BaseEntity } from './../../shared';

export class JobseekerCompliance implements BaseEntity {
    constructor(
        public id?: number,
        public dateCompliance?: any,
        public answerCompliance?: boolean,
        public jobseeker?: BaseEntity,
    ) {
        this.answerCompliance = false;
    }
}
