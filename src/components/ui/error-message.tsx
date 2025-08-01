import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './alert';

interface ErrorMessageProps {
  errors?: string[];
  className?: string;
}

export function ErrorMessage({ errors, className = '' }: ErrorMessageProps) {
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <Alert variant='destructive' className={className}>
      <AlertCircle className='h-4 w-4' />
      <AlertDescription>
        <ul className='list-inside list-disc space-y-1'>
          {errors.map((error, index) => (
            <li key={index} className='text-sm'>
              {error}
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}

export function FieldError({ error }: { error?: string }) {
  if (!error) {
    return null;
  }

  return (
    <div className='mt-1 flex items-center gap-1 text-sm text-destructive'>
      <AlertCircle className='h-3 w-3' />
      <span>{error}</span>
    </div>
  );
}
