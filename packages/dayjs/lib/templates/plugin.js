import dayjs from 'dayjs';

export default async function (ctx, inject) {
  inject('dayjs', dayjs);
}
