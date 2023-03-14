import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <div className="links">
                <Link href="/">Home</Link>
                <Link href="/policy/privacy-policy">Privacy Policy</Link>
                <Link href="/policy/terms-conditions">Terms & Conditions</Link>
            </div>
            <Link href="https://dirtroad.dev">Copyright &copy; 2022-Present Dirt Road Development.</Link>
        </footer>
    );
}