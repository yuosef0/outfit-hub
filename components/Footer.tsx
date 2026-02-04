import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-50 dark:bg-black border-t border-slate-200 dark:border-slate-800 pt-12 pb-32">
            <div className="mx-auto max-w-md px-6">
                {/* Brand & Socials */}
                <div className="flex flex-col gap-4 mb-8">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Modern Mall</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Your premium destination for fashion and lifestyle.
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4 mt-2">
                        {/* Facebook */}
                        <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-colors">
                            <span className="text-lg font-bold">f</span>
                        </a>
                        {/* Twitter/X */}
                        <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-black hover:text-white transition-colors">
                            <span className="text-sm font-bold">X</span>
                        </a>
                        {/* Instagram */}
                        <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-pink-600 hover:text-white transition-colors">
                            <span className="text-lg font-bold">Ig</span>
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/stores" className="hover:text-primary transition-colors">Stores</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Legal</h3>
                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Return Policy</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-6 text-center">
                    <p className="text-xs text-slate-400">
                        © 2024 Modern Mall. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
