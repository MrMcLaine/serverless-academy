import { Pool } from 'pg';
import { config } from '../configs/config';

const pool: Pool = new Pool({
  ...config.db,
  max: 5,
});

export default pool;