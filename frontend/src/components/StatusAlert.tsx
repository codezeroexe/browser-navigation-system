import { Alert, AlertDescription } from './ui/alert'

interface Props { error: string | null; }

export function StatusAlert({ error }: Props) {
  if (!error) return null;
  return <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>;
}
