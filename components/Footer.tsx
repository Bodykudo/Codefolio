import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-start gap-10 bg-light-white px-5 py-6 lg:px-20">
      <div className="flex w-full flex-col gap-12">
        <div className="flex flex-col items-start">
          <Image
            src="/logo-colored.png"
            width={400}
            height={2000}
            alt="Codefolio"
          />

          <p className="mt-5 max-w-xs text-start text-sm font-normal">
            Codefolio empowers developers to elegantly showcase their coding
            expertise, fostering collaboration and recognition within the coding
            community.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-between text-sm font-normal max-sm:flex-col">
        <p>@{new Date().getFullYear()} Codefolio. All rights reserved.</p>
      </div>
    </footer>
  );
}
