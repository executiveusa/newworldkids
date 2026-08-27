import { redirect } from 'next/navigation';

const FUNDRAZR_URL = 'https://fundrazr.com/nwkids.org';

export default function DonatePage() {
  redirect(FUNDRAZR_URL);
}
