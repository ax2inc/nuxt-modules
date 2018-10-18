import dayjs from 'dayjs';

export default async function (ctx, inject) {
  ctx.$dayjs = dayjs;
  inject('dayjs', dayjs);
}
