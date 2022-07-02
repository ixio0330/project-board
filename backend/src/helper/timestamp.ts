function getTodayTimestamp(): string {
  const today = new Date();
  today.setHours(today.getHours() + 9);
  return today.toISOString().replace('T', ' ').substring(0, 19);
}

module.exports = getTodayTimestamp;
