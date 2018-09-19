import { BaseEntity } from './../../shared';

export class Presentation implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public presentation?: any,
    ) {
    }
}
