import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ScrollArea } from './ui/scroll-area'
import { Badge } from './ui/badge'

interface Props { title: string; items: string[]; }

export function StackCard({ title, items }: Props) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          {title} <Badge variant="secondary">{items.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">Empty</p>
          ) : (
            <ul className="space-y-1">
              {[...items].reverse().map((item, idx) => (
                <li key={idx} className="text-sm font-mono break-all p-1 rounded bg-muted">{item}</li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
