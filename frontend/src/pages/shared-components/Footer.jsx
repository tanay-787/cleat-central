import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram } from 'lucide-react'
import { useTheme } from "@/components/themeProvider"


export default function Footer() {
    const { theme } = useTheme();
    const [uiTheme, setUITheme] = useState(theme);

    useEffect(() => {
        if(theme === "system") {
         const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
         ? "dark"
         : "light";
         setUITheme(systemTheme);
        } else {
         setUITheme(theme);
        }
     },[theme]);


    return (
        <footer id="#contactUs" className="bg-muted border-t py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className='space-y-4'>
                    <img src={`/cleatcentral-logo-${uiTheme}.svg`} width={180} height={24} className="w-25 h-auto" />
                    <p className="text-muted-foreground">Bringing you the best in class football cleats</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="#" className="hover:underline">Products</Link></li>
                            <li><Link to="#" className="hover:underline">About Us</Link></li>
                            <li><Link to="#" className="hover:underline">Contact</Link></li>
                            <li><Link to="#" className="hover:underline">Terms of Service</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Connect With Us</h3>
                        <div className="flex flex-col space-y-3">
                            <Link to="#" className="text-muted-foreground hover:text-foreground flex items-center">
                                <Facebook className="h-5 w-5 mr-1" />
                                CleatsCentral
                            </Link>
                            <Link to="#" className="text-muted-foreground hover:text-foreground flex items-center">
                                <Twitter className="h-5 w-5 mr-1" />
                                CleatsCentral
                            </Link>
                            <Link to="#" className="text-muted-foreground hover:text-foreground flex items-center">
                                <Instagram className="h-5 w-5 mr-1" />
                                CleatsCentral
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center text-muted-foreground">
                    <p>&copy; 2024 CleatsCentral. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}