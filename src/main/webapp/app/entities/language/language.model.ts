import { BaseEntity } from './../../shared';

export class Language implements BaseEntity {
    constructor(
        public id?: number,
        public languageName?: string,
        public jobseeker?: BaseEntity,
        public vacancy?: BaseEntity,
    ) {
    }
}
