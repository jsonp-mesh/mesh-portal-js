// utils/loadPortal.js
const loadPortal = () => {
  if (typeof window !== 'undefined') {
    return import('@portal-hq/web');
  }
  return Promise.resolve({ default: null });
};

export default loadPortal;
