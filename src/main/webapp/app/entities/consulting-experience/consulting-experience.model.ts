import { BaseEntity } from './../../shared';

export class ConsultingExperience implements BaseEntity {
    constructor(
        public id?: number,
        public yearsConsulting?: number,
        public jobseeker?: BaseEntity,
    ) {
    }
}
