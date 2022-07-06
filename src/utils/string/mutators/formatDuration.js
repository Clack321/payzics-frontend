export default function formatDuration(duration) {
  const totalVal = Math.abs(duration) || 0;
  const totalHours = Math.floor(totalVal / 60);
  const totalMinutes = Math.round(totalVal % 60);

  return {
      total: totalVal,
      hours: totalHours,
      mins: totalMinutes,
      label: `${totalHours > 0 ? `${totalHours} hr${totalHours > 1 ? 's' : ''}` : ''}` +
          `${totalVal > 60.0 ? ' ' : ''}` +
          `${totalMinutes > 0 ? `${totalMinutes} min${totalMinutes > 1 ? 's' : ''}` : totalHours > 0 ? '' : '0 mins'}`
  };
}
