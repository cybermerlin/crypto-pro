export const _isSupportedCadesVersion = (version: string): boolean => {
  const match = version.match(/(\d+)\.(\d+)\.(\d+)/);

  if (!match) {
    return false;
  }

  const [, major, minor, patch] = match;

  if (Number(major) < 2) {
    return false;
  }

  if (Number(major) === 2 && Number(minor) === 0 && Number(patch) < 13292) {
    return false;
  }

  return true;
};
