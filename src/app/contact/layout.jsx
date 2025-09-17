"use client";
import Link from "next/link";

export default function ContactLayout({ children }) {
    return (
        <div>
            {/* <nav className="flex items-center justify-center gap-10">
                <Link href="/contact/login" className="bg-[var(--active-bg)] px-4 py-2 rounded-md text-white"
                >Login</Link>
                <Link href="/contact/signup" className="bg-[var(--active-bg)] px-4 py-2 rounded-md text-white"
                >Sign Up</Link>
            </nav> */}
            <div>{children}</div>
        </div>
    );
}
