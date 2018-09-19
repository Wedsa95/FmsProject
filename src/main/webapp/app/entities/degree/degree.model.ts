import { BaseEntity } from './../../shared';

export class Degree implements BaseEntity {
    constructor(
        public id?: number,
        public degreeType?: string,
    ) {
    }
}
