import { Container } from '@/components/container/container';

export const Footer = () => (
  <Container
    htmlTag="footer"
    className="relative after:absolute after:h-[1px] after:top-0 after:left-[15%] after:w-[70%] after:bg-pokemon-bg-600 mt-10"
  >
    <div className="flex items-center justify-center p-4">
      <p className="text-xs font-light text-pokemon-bg-600">
        Fait par{' '}
        <a
          href="https://github.com/tizano"
          target="_blank"
          rel="noreferrer noopener"
          className="underline font-semibold"
        >
          Tizano
        </a>{' '}
        à Montréal - &copy;2024
      </p>
    </div>
  </Container>
);
