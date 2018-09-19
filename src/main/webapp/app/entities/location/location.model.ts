import { BaseEntity } from './../../shared';

export class Location implements BaseEntity {
    constructor(
        public id?: number,
        public county?: string,
        public jobseeker?: BaseEntity,
        public vacancy?: BaseEntity,
    ) {
    }
}
