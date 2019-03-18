import { get, post } from './request';

export const createChirp = chirp => post('/chirps');
export const getChirps = () => get('./chirps');
