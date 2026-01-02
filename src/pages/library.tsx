import AppLayout from '../components/shared/layout';
import { LibraryListing } from '../components/library/libraryListing';

export const LibraryScreen = () => (
  <AppLayout title="Library" scrollable={false}>
    <LibraryListing />
  </AppLayout>
);
