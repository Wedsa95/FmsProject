import { BaseEntity } from './../../shared';

export class Extent implements BaseEntity {
    constructor(
        public id?: number,
        public extentDescription?: string,
        public jobseeker?: BaseEntity,
        public vacancy?: BaseEntity,
    ) {
    }
}
