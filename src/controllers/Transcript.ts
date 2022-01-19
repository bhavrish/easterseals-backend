import { Request, Response } from 'express'
import { pool } from '../database'
import { QueryResult } from 'pg';

// TODO: Endpoint to generate PDF of user's completed courses