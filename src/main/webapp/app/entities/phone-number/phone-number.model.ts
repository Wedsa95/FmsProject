import { BaseEntity } from './../../shared';

export class PhoneNumber implements BaseEntity {
    constructor(
        public id?: number,
        public phoneNumber?: string,
        public phoneType?: string,
        public jobseeker?: BaseEntity,
    ) {
    }
}
