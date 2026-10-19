import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import zod from 'zod';

extendZodWithOpenApi(zod);

export default zod;
