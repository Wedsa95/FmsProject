import { BaseEntity } from './../../shared';

export class Branch implements BaseEntity {
    constructor(
        public id?: number,
        public branchName?: string,
        public jobseeker?: BaseEntity,
        public vacancy?: BaseEntity,
    ) {
    }
}
