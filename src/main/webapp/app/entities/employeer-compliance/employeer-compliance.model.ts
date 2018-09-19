import { BaseEntity } from './../../shared';

export class EmployeerCompliance implements BaseEntity {
    constructor(
        public id?: number,
        public dateCompliance?: any,
        public answerCompliance?: boolean,
        public employeer?: BaseEntity,
    ) {
        this.answerCompliance = false;
    }
}
