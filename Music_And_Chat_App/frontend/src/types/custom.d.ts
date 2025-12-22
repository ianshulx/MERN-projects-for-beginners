// Allow importing .jsx modules without type declarations
// Allow importing .jsx/.js modules without type declarations
declare module '*.jsx';
declare module '*.js';

// Fallback for any unresolved module imports (permissive)
declare module '*';

export {};
