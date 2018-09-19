import { BaseEntity } from './../../shared';

export class Email implements BaseEntity {
    constructor(
        public id?: number,
        public emailAddress?: string,
        public emailType?: string,
        public jobseeker?: BaseEntity,
    ) {
    }
}
