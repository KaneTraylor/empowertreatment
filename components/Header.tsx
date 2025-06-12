import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Empower Treatment"
              width={150}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </Link>
          <nav className="hidden md:flex items-center space-x-4 text-sm">
            <Link href="#" className="text-gray-700 hover:text-primary">
              Need help?
            </Link>
            <Link href="tel:740-200-0016" className="text-gray-700 hover:text-primary">
              (740) 200-0016
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="mailto:support@empowertreatment.com" className="text-gray-700 hover:text-primary">
              support@empowertreatment.com
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}