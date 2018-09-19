import { BaseEntity } from './../../shared';

export class JobseekerImage implements BaseEntity {
    constructor(
        public id?: number,
        public imageLink?: string,
    ) {
    }
}
