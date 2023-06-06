export const FilterPackages = (allPacks, packToDelete) => {
  return allPacks.filter((pack) => pack.packageId !== packToDelete.packageId);
};
