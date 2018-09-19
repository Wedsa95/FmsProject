import { BaseEntity } from './../../shared';

export class EmployeerImage implements BaseEntity {
    constructor(
        public id?: number,
        public imageLink?: string,
        public employeer?: BaseEntity,
    ) {
    }
}
