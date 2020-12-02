import createManager from './manager';

export default createManager;

export type Manager = ReturnType<typeof createManager>;
export * from './models';
