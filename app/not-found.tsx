import Error from '@/components/Error';

export default function notFound() {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 mx-auto flex items-center justify-center bg-white">
      <Error text="Oops! The page you're looking for doesn't exist." />
    </div>
  );
}
