import { BaseEntity } from './../../shared';

export class Skill implements BaseEntity {
    constructor(
        public id?: number,
        public skillName?: string,
        public skillLevel?: number,
        public jobseeker?: BaseEntity,
        public vacancy?: BaseEntity,
    ) {
    }
}
