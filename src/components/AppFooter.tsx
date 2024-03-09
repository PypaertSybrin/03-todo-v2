export const AppFooter = () => {
  return (
    <footer className="py-6">
      <p className="text-neutral-400 text-sm">
        Made with love by{' '}
        <a className="hover:underline text-neutral-600" href="#">
          Sybrin
        </a>{' '}
        - {new Date().getFullYear()} &copy;
      </p>
    </footer>
  )
}
