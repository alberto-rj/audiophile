export function isNewProduct(createdAt: Date) {
  const distance = new Date().getTime() - createdAt.getTime();
  const distanceInSeconds = Math.floor(distance / 1000);
  const distanceInHours = Math.floor(distanceInSeconds / 3600);
  const distanceInDays = Math.floor(distanceInHours / 24);
  const isNew = distanceInDays < 8;

  return isNew;
}
