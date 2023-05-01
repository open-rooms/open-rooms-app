export const getRemainingTime = (start_date: number, duration: number) => {
  const now = Date.now();
  const end_date = start_date * 1000 + duration * 24 * 60 * 60 * 1000;
  const remaining = end_date - now;
  const hours = Math.floor(remaining / (60 * 60 * 1000));
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
  return {hours, minutes};
};

export const getTimePassed = (start_date: number) => {
  const now = Date.now();
  const elapsed = Math.abs(now - start_date * 1000);
  const minutes = Math.floor(elapsed / (60 * 1000));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (minutes < 60) {
    return `${minutes}m`;
  } else if (hours < 24) {
    return `${hours}h`;
  } else if (days < 7) {
    return `${days}d`;
  } else if (weeks < 4) {
    return `${weeks}w`;
  } else if (months < 12) {
    return `${months}mo`;
  } else {
    return `${years}y`;
  }
};
