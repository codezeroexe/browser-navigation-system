import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { visitUrl } from '../lib/api'

interface Props {
  onStateUpdate: (state: any) => void;
}

export function UrlInput({ onStateUpdate }: Props) {
  const [url, setUrl] = useState('');

  const handleVisit = async () => {
    if (!url.trim()) return;
    const state = await visitUrl(url);
    onStateUpdate(state);
    setUrl('');
  };

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Enter URL (e.g. google.com)"
        value={url}
        onChange={e => setUrl(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleVisit()}
        className="flex-1"
      />
      <Button onClick={handleVisit}>Visit</Button>
    </div>
  );
}
