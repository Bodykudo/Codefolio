import { footerLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';

type ColumnProps = {
  title: string;
  links: string[];
};

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className="flex min-w-max flex-1 flex-col gap-3 text-sm">
    <h4 className="font-semibold">{title}</h4>
    <ul className="flex flex-col gap-2 font-normal">
      {links.map((link) => (
        <Link href="/" key={link}>
          {link}
        </Link>
      ))}
    </ul>
  </div>
);

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-start gap-20 bg-light-white px-5 py-6 lg:px-20">
      <div className="flex w-full flex-col gap-12">
        <div className="flex flex-col items-start">
          <Image
            src="/logo-purple.svg"
            width={115}
            height={38}
            alt="Codefolio"
          />

          <p className="mt-5 max-w-xs text-start text-sm font-normal">
            Codefolio is the world's leading company for creatives to share,
            grow, and get hired.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-12">
          {footerLinks.map((links) => (
            <FooterColumn title={links.title} links={links.links} />
          ))}
        </div>
      </div>

      <div className="flex w-full items-center justify-between text-sm font-normal max-sm:flex-col">
        <p>@2023 Codefolio. All rights reserved.</p>
        <p className="text-gray">
          <span className="font-semibold text-black">10,214</span> projects
          submitted
        </p>
      </div>
    </footer>
  );
}
