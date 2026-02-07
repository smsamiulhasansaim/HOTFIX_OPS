
import { BugCategory, BugStatus, BugTask } from './types';

export const INITIAL_TASKS: BugTask[] = [
  {
    id: 'bug-1',
    title: 'Hero Section Overflow',
    category: BugCategory.RESPONSIVENESS,
    description: 'The landing page hero section is breaking the viewport on mobile devices (iPhone 13-15). Images are not scaling properly.',
    status: BugStatus.CRITICAL,
    technicalDetails: 'CSS `flex-nowrap` is forced on a container with fixed width images. `overflow-x` is hidden but layout remains broken.',
    fixCode: 'flex-wrap w-full object-cover max-w-full'
  },
  {
    id: 'bug-2',
    title: 'Broken Pricing Toggle',
    category: BugCategory.JAVASCRIPT,
    description: 'The Monthly/Yearly toggle is stuck. Users cannot switch plans, preventing subscription conversions.',
    status: BugStatus.CRITICAL,
    technicalDetails: 'ReferenceError: `updatePricing` is not defined in the global scope. Closure issue in the main.js bundle.',
    fixCode: 'window.updatePricing = function() { ... }'
  },
  {
    id: 'bug-3',
    title: 'Form Submission Silent Fail',
    category: BugCategory.FORM,
    description: 'Contact form shows success message even when the server returns a 500 error. No validation is occurring.',
    status: BugStatus.CRITICAL,
    technicalDetails: 'The `fetch` catch block incorrectly triggers the `showSuccess()` function instead of error handling.',
    fixCode: 'if (!response.ok) throw new Error();'
  },
  {
    id: 'bug-4',
    title: 'PHP Warning: Undefined Array Key',
    category: BugCategory.BACKEND,
    description: 'Header profile shows a PHP warning "Undefined array key user_id" when accessed as a guest.',
    status: BugStatus.CRITICAL,
    technicalDetails: 'The session check is missing `isset()` before accessing the `$_SESSION` superglobal.',
    fixCode: 'if (isset($_SESSION[\'user_id\'])) { ... }'
  }
];
