import { Request } from './request.entity';
import { REQUEST_REPOSITORY } from '../../core/constants';

export const requestsProviders = [{
    provide: REQUEST_REPOSITORY,
    useValue: Request,
}];