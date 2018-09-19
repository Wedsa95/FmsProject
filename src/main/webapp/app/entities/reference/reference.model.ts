import { BaseEntity } from './../../shared';

export class Reference implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public letter?: any,
        public jobseeker?: BaseEntity,
    ) {
    }
}
