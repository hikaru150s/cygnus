export { AnalyticsService } from './analytics.service';

export function stringIdComparer(dir: 1 | -1, a: string, b: string): number {
  return parseInt(a, 10) < parseInt(b, 10) ? (-1 * dir) : (parseInt(a, 10) > parseInt(b, 10) ? dir : 0);
}
