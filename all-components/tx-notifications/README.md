# Transaction Notifications

Toast notifications for Web3 transactions.

## Usage

```bash
cd frontend/
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Integration

Copy `hooks/useTxToast.ts` to your project:

```tsx
import { useTxToast } from '@/hooks/useTxToast'

function MyComponent() {
  const { showTxToast } = useTxToast()

  const handleTransaction = async () => {
    const hash = await writeContract(...)
    showTxToast(hash)
  }

  return <button onClick={handleTransaction}>Send</button>
}
```

## Features

- Loading state while pending
- Success/error notifications
- Auto-dismiss after confirmation
- Uses react-hot-toast
