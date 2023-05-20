import { Admin } from './admin.entity';
import { ADMIN_REPOSITORY } from '../../core/constants';

export const adminsProviders = [{
    provide: ADMIN_REPOSITORY,
    useValue: Admin,
}];