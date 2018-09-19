import { BaseEntity } from './../../shared';

export class JobseekerVideo implements BaseEntity {
    constructor(
        public id?: number,
        public videoLink?: string,
    ) {
    }
}
