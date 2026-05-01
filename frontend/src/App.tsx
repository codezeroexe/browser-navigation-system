import { useReducer, useEffect } from 'react'
import { UrlInput } from './components/UrlInput'
import { StackCard } from './components/StackCard'
import { StatusAlert } from './components/StatusAlert'
import { getState, goBack, goForward, resetState } from './lib/api'
import { Button } from './components/ui/button'

type State = { curr: string | null; back: string[]; fwd: string[]; error: string | null }

type Action =
  | { type: 'SET_STATE'; payload: Omit<State, 'error'> }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'CLEAR' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_STATE': return { ...state, ...action.payload, error: null }
    case 'SET_ERROR': return { ...state, error: action.error }
    case 'CLEAR': return { curr: null, back: [], fwd: [], error: null }
    default: return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, { curr: null, back: [], fwd: [], error: null });

  const refresh = async () => {
    const data = await getState();
    if (data.error) dispatch({ type: 'SET_ERROR', error: data.error });
    else dispatch({ type: 'SET_STATE', payload: data });
  };

  useEffect(() => { refresh(); }, []);

  const handleVisit = async (newState: any) => {
    if (newState.error) dispatch({ type: 'SET_ERROR', error: newState.error });
    else dispatch({ type: 'SET_STATE', payload: newState });
  };

  const handleBack = async () => { const data = await goBack(); handleVisit(data); };
  const handleForward = async () => { const data = await goForward(); handleVisit(data); };
  const handleReset = async () => { await resetState(); dispatch({ type: 'CLEAR' }); };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Browser Nav</h1>
        <StatusAlert error={state.error} />
        <UrlInput onStateUpdate={handleVisit} />
        {state.curr && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Current Page</p>
            <p className="font-mono text-lg break-all">{state.curr}</p>
          </div>
        )}
        <div className="flex gap-2">
          <Button onClick={handleBack} variant="outline" disabled={state.back.length === 0}>Back</Button>
          <Button onClick={handleForward} variant="outline" disabled={state.fwd.length === 0}>Forward</Button>
          <Button onClick={handleReset} variant="destructive">Reset</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StackCard title="Back Stack" items={state.back} />
          <StackCard title="Forward Stack" items={state.fwd} />
        </div>
      </div>
    </div>
  );
}
